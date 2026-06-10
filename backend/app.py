from pathlib import Path

import click
from datetime import datetime
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

    def serialize_user(user: User):
        return {
            "id": str(user.id),
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
        }

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

        if len(password) < 8:
            return jsonify({"message": "Password must be at least 8 characters."}), 400

        existing_user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if existing_user:
            return jsonify({"message": "An account with that email already exists. Please log in."}), 409

        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password_hash=generate_password_hash(password),
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
        return jsonify(
            {
                "message": "Password recovery is queued for the email automation phase. Your account data is safe in the meantime."
            }
        )

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
