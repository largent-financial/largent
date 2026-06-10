from pathlib import Path

import click
from datetime import datetime
from email.message import EmailMessage
import secrets
import smtplib
import ssl
import string
from uuid import UUID

from flask import Flask, jsonify, request, send_from_directory, session
from werkzeug.security import check_password_hash, generate_password_hash

from .config import Config
from .extensions import db, migrate


ROOT_DIR = Path(__file__).resolve().parent.parent


def create_app() -> Flask:
    app = Flask(__name__, static_folder=str(ROOT_DIR), static_url_path="")
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from .models import User

    @app.cli.command("init-db")
    def init_db_command():
        schema_path = ROOT_DIR / "backend" / "schema.sql"
        schema_sql = schema_path.read_text()
        raw_connection = db.engine.raw_connection()
        try:
            with raw_connection.cursor() as cursor:
                cursor.execute(schema_sql)
            raw_connection.commit()
        finally:
            raw_connection.close()
        click.echo("Database schema applied.")

    @app.cli.command("sync-auth-recovery")
    def sync_auth_recovery_command():
        raw_connection = db.engine.raw_connection()
        try:
            with raw_connection.cursor() as cursor:
                cursor.execute(
                    """
                    alter table users
                    add column if not exists pw_code_hash text,
                    add column if not exists pw_code_updated_at timestamptz
                    """
                )
            raw_connection.commit()
        finally:
            raw_connection.close()

        users_missing_codes = db.session.execute(db.select(User).filter(User.pw_code_hash.is_(None))).scalars().all()
        for user in users_missing_codes:
            recovery_code = generate_recovery_code()
            user.pw_code_hash = generate_password_hash(recovery_code)
            user.pw_code_updated_at = datetime.utcnow()
        if users_missing_codes:
            db.session.commit()
        click.echo("Auth recovery columns synced.")

    def serialize_user(user: User):
        return {
            "id": str(user.id),
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
        }

    def is_strong_password(password: str) -> bool:
        return len(password) >= 8 and any(character.isdigit() for character in password) and any(
            not character.isalnum() for character in password
        )

    def generate_recovery_code() -> str:
        alphabet = string.ascii_uppercase + string.digits
        return "".join(secrets.choice(alphabet) for _ in range(12))

    def rotate_recovery_code(user: User) -> str:
        recovery_code = generate_recovery_code()
        user.pw_code_hash = generate_password_hash(recovery_code)
        user.pw_code_updated_at = datetime.utcnow()
        return recovery_code

    def send_recovery_email(recipient_email: str, recovery_code: str) -> None:
        if not app.config.get("MAIL_USERNAME") or not app.config.get("MAIL_PASSWORD"):
            raise RuntimeError("Mail credentials are not configured.")

        message = EmailMessage()
        message["Subject"] = "Your Largent password recovery code"
        message["From"] = app.config.get("MAIL_DEFAULT_SENDER") or app.config.get("MAIL_USERNAME")
        message["To"] = recipient_email
        message.set_content(
            (
                "Use this recovery code to reset your Largent password:\n\n"
                f"{recovery_code}\n\n"
                "Copy the code, return to the app, and paste it into the recovery form.\n"
                "If you did not request this, you can ignore this email."
            )
        )

        mail_server = app.config.get("MAIL_SERVER")
        mail_port = app.config.get("MAIL_PORT")

        if app.config.get("MAIL_USE_SSL"):
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(mail_server, mail_port, context=context) as smtp:
                smtp.login(app.config["MAIL_USERNAME"], app.config["MAIL_PASSWORD"])
                smtp.send_message(message)
            return

        with smtplib.SMTP(mail_server, mail_port) as smtp:
            smtp.starttls(context=ssl.create_default_context())
            smtp.login(app.config["MAIL_USERNAME"], app.config["MAIL_PASSWORD"])
            smtp.send_message(message)

    def get_current_user():
        user_id = session.get("user_id")
        if not user_id:
            return None
        try:
            return db.session.get(User, UUID(user_id))
        except (ValueError, TypeError):
            session.clear()
            return None

    @app.post("/api/auth/signup")
    def signup():
        payload = request.get_json(silent=True) or {}
        first_name = (payload.get("firstName") or "").strip()
        last_name = (payload.get("lastName") or "").strip()
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password") or ""
        confirm_password = payload.get("confirmPassword") or ""

        if not first_name or not last_name or not email or not password or not confirm_password:
            return jsonify({"message": "Please complete every field to create your account."}), 400

        if password != confirm_password:
            return jsonify({"message": "Passwords do not match."}), 400

        if not is_strong_password(password):
            return jsonify({"message": "Password must be at least 8 characters and include 1 number and 1 special character."}), 400

        existing_user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if existing_user:
            return jsonify({"message": "An account with that email already exists. Please log in."}), 409

        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password_hash=generate_password_hash(password),
            pw_code_hash=generate_password_hash(generate_recovery_code()),
            pw_code_updated_at=datetime.utcnow(),
            last_login_at=datetime.utcnow(),
        )
        db.session.add(user)
        db.session.commit()

        session["user_id"] = str(user.id)
        session.permanent = True

        return jsonify({"message": "Account created successfully.", "user": serialize_user(user)}), 201

    @app.post("/api/auth/login")
    def login():
        payload = request.get_json(silent=True) or {}
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password") or ""

        if not email or not password:
            return jsonify({"message": "Enter your email and password to continue."}), 400

        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"message": "We could not find a matching email and password."}), 401

        user.last_login_at = datetime.utcnow()
        db.session.commit()

        session["user_id"] = str(user.id)
        session.permanent = True

        return jsonify({"message": "Logged in successfully.", "user": serialize_user(user)})

    @app.get("/api/auth/me")
    def auth_me():
        user = get_current_user()
        if not user:
            return jsonify({"authenticated": False, "user": None}), 200

        return jsonify({"authenticated": True, "user": serialize_user(user)})

    @app.post("/api/auth/logout")
    def logout():
        session.clear()
        return jsonify({"message": "Logged out successfully."})

    @app.post("/api/auth/forgot-password")
    def forgot_password():
        payload = request.get_json(silent=True) or {}
        email = (payload.get("email") or "").strip().lower()

        if not email:
            return jsonify({"message": "Enter your email to request a recovery code."}), 400

        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if not user:
            return jsonify({"message": "If that email exists, we sent a recovery code."})

        recovery_code = rotate_recovery_code(user)
        db.session.commit()

        try:
            send_recovery_email(user.email, recovery_code)
        except Exception:
            return jsonify({"message": "We couldn't send a recovery code right now. Please try again in a moment."}), 503

        return jsonify({"message": "If that email exists, we sent a recovery code."})

    @app.post("/api/auth/reset-password")
    def reset_password():
        payload = request.get_json(silent=True) or {}
        email = (payload.get("email") or "").strip().lower()
        recovery_code = (payload.get("recoveryCode") or "").strip().upper()
        password = payload.get("password") or ""
        confirm_password = payload.get("confirmPassword") or ""

        if not email or not recovery_code or not password or not confirm_password:
            return jsonify({"message": "Complete every field to reset your password."}), 400

        if password != confirm_password:
            return jsonify({"message": "Passwords do not match."}), 400

        if not is_strong_password(password):
            return jsonify({"message": "Password must be at least 8 characters and include 1 number and 1 special character."}), 400

        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if not user or not user.pw_code_hash or not check_password_hash(user.pw_code_hash, recovery_code):
            return jsonify({"message": "That recovery code or email does not match our records."}), 400

        user.password_hash = generate_password_hash(password)
        rotate_recovery_code(user)
        db.session.commit()

        return jsonify({"message": "Password reset successfully. Please log in with your new password."})

    @app.get("/api/health")
    def healthcheck():
        database_ready = False
        if app.config.get("SQLALCHEMY_DATABASE_URI"):
            try:
                with db.engine.connect() as connection:
                    connection.exec_driver_sql("SELECT 1")
                database_ready = True
            except Exception:
                database_ready = False

        return jsonify(
            {
                "status": "ok",
                "databaseConfigured": bool(app.config.get("SQLALCHEMY_DATABASE_URI")),
                "databaseReady": database_ready,
            }
        )

    @app.get("/")
    def serve_index():
        return send_from_directory(app.static_folder, "index.html")

    @app.get("/<path:asset_path>")
    def serve_assets(asset_path: str):
        asset_file = ROOT_DIR / asset_path
        if asset_file.exists() and asset_file.is_file():
            return send_from_directory(app.static_folder, asset_path)
        return send_from_directory(app.static_folder, "index.html")

    return app


app = create_app()
