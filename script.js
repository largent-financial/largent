const screens = [...document.querySelectorAll('.screen')];
const authToggles = [...document.querySelectorAll('[data-auth-mode]')];
const authForms = [...document.querySelectorAll('.auth-form')];
const openAuthButtons = [...document.querySelectorAll('[data-open-auth]')];
const headerAuthButton = document.getElementById('header-auth-button');
const headerAccountMenu = document.getElementById('header-account-menu');
const headerSignoutButton = document.getElementById('header-signout-button');
const profileModal = document.getElementById('profile-modal');
const profileModalCloseButton = document.getElementById('profile-modal-close');
const profileNavButtons = [...document.querySelectorAll('[data-profile-nav]')];
const profilePanels = [...document.querySelectorAll('[data-profile-panel]')];
const profileAccountForm = document.getElementById('profile-account-form');
const profileAccountFeedback = document.getElementById('profile-account-feedback');
const profileAccountSaveButton = document.getElementById('profile-account-save-button');
const transactionPushToggle = document.getElementById('transaction-push-toggle');
const transactionAlertsDetail = document.getElementById('transaction-alerts-detail');
const instantAlertsRow = document.getElementById('instant-alerts-row');
const instantAlertsToggle = document.getElementById('instant-alerts-toggle');
const instantAlertsDetail = document.getElementById('instant-alerts-detail');
const transactionPushTestButton = document.getElementById('transaction-push-test-button');
const instantAlertPreviewButton = document.getElementById('instant-alert-preview-button');
const profileDeleteAccountButton = document.getElementById('profile-delete-account-button');
const profileResetPasswordButton = document.getElementById('profile-reset-password-button');
const profileBillingSummary = document.getElementById('profile-billing-summary');
const profileBillingFeedback = document.getElementById('profile-billing-feedback');
const profilePromoCodeInput = document.getElementById('profile-promo-code-input');
const profilePromoCodeButton = document.getElementById('profile-promo-code-button');
const profilePromoCodeFeedback = document.getElementById('profile-promo-code-feedback');
const profileUpgradeButton = document.getElementById('profile-upgrade-button');
const profileManagePremiumButton = document.getElementById('profile-manage-premium-button');
const profileBankSummary = document.getElementById('profile-bank-summary');
const profileBankList = document.getElementById('profile-bank-list');
const profileBankingFeedback = document.getElementById('profile-banking-feedback');
const profileOpenDashboardButton = document.getElementById('profile-open-dashboard-button');
const profileConnectBankButton = document.getElementById('profile-connect-bank-button');
const profileAccountConfirmModal = document.getElementById('profile-account-confirm-modal');
const profileAccountConfirmFeedback = document.getElementById('profile-account-confirm-feedback');
const profileAccountConfirmCancelButton = document.getElementById('profile-account-confirm-cancel');
const profileAccountConfirmSaveButton = document.getElementById('profile-account-confirm-save');
const flowSteps = [...document.querySelectorAll('.flow-step')];
const stepIndicators = [...document.querySelectorAll('.step-item')];
const methodButtons = [...document.querySelectorAll('[data-method]')];
const taxSwitches = [...document.querySelectorAll('[data-tax-switch]')];
const deductionInputs = [...document.querySelectorAll('[data-deduction-input]')];
const nextStepButton = document.getElementById('next-step');
const backStepButton = document.getElementById('back-step');
const stepNumber = document.getElementById('step-number');
const annualSalaryInput = document.getElementById('annual-salary');
const incomeInputLabel = document.getElementById('income-input-label');
const stepTwoHelper = document.getElementById('step-two-helper');
const stepThreeHelper = document.getElementById('step-three-helper');
const stepThreeManualNote = document.getElementById('step-three-manual-note');
const stepFourHelper = document.getElementById('step-four-helper');
const stepFourManualNote = document.getElementById('step-four-manual-note');
const summaryGrid = document.getElementById('summary-grid');
const breakdownCard = document.getElementById('breakdown-card');
const payFrequencySelect = document.getElementById('pay-frequency');
const stateSelect = document.getElementById('state-select');
const filingStatusSelect = document.getElementById('filing-status');
const extraWithholdingInput = document.getElementById('extra-withholding');

const summaryNetMonthly = document.getElementById('summary-net-monthly');
const summaryGrossMonthly = document.getElementById('summary-gross-monthly');
const summaryFederalMonthly = document.getElementById('summary-federal-monthly');
const summaryStateMonthly = document.getElementById('summary-state-monthly');
const summaryFicaMonthly = document.getElementById('summary-fica-monthly');
const stateTaxNote = document.getElementById('state-tax-note');
const allocationMonth = document.getElementById('allocation-month');
const allocationIncome = document.getElementById('allocation-income');
const allocationRemaining = document.getElementById('allocation-remaining');
const allocationSections = document.getElementById('allocation-sections');
const allocationBackButton = document.getElementById('allocation-back');
const allocationProceedButton = document.getElementById('allocation-proceed');
const allocationConfirmationModal = document.getElementById('allocation-confirmation-modal');
const allocationConfirmCancelButton = document.getElementById('allocation-confirm-cancel');
const allocationConfirmProceedButton = document.getElementById('allocation-confirm-proceed');
const ledgerAssistantTrigger = document.getElementById('ledger-assistant-trigger');
const ledgerAssistantModal = document.getElementById('ledger-assistant-modal');
const ledgerAssistantClose = document.getElementById('ledger-assistant-close');
const ledgerAssistantProgressCopy = document.getElementById('ledger-assistant-progress-copy');
const ledgerAssistantProgressFill = document.getElementById('ledger-assistant-progress-fill');
const ledgerAssistantCopy = document.getElementById('ledger-assistant-copy');
const ledgerAssistantQuestions = [...document.querySelectorAll('[data-assistant-step]')];
const assistantPriorityOptions = document.getElementById('assistant-priority-options');
const assistantExpenseOptions = document.getElementById('assistant-expense-options');
const assistantLeftoverOptions = document.getElementById('assistant-leftover-options');
const ledgerAssistantFeedback = document.getElementById('ledger-assistant-feedback');
const ledgerAssistantBack = document.getElementById('ledger-assistant-back');
const ledgerAssistantNext = document.getElementById('ledger-assistant-next');
const authModal = document.getElementById('auth-modal');
const authModalCloseButton = document.getElementById('auth-modal-close');
const authSignupFeedback = document.getElementById('auth-signup-feedback');
const authLoginFeedback = document.getElementById('auth-login-feedback');
const authRecoveryFeedback = document.getElementById('auth-recovery-feedback');
const authForgotPasswordButton = document.getElementById('auth-forgot-password');
const passwordToggleButtons = [...document.querySelectorAll('[data-password-toggle]')];
const quickNextButtons = [...document.querySelectorAll('[data-quick-next]')];
const authRecoveryForm = document.getElementById('auth-recovery-form');
const authRecoverySubmit = document.getElementById('auth-recovery-submit');
const authRecoveryBackButton = document.getElementById('auth-recovery-back');
const authRecoveryResetFields = document.getElementById('auth-recovery-reset-fields');
const authRecoveryCopy = document.getElementById('auth-recovery-copy');
const dashboardMonthTitle = document.getElementById('dashboard-month-title');
const dashboardTotalAllocated = document.getElementById('dashboard-total-allocated');
const dashboardTotalSpent = document.getElementById('dashboard-total-spent');
const dashboardLeftToSpend = document.getElementById('dashboard-left-to-spend');
const dashboardStatusPill = document.getElementById('dashboard-status-pill');
const dashboardBackButton = document.getElementById('dashboard-back');
const plaidCard = document.getElementById('plaid-card');
const plaidCollapseButton = document.getElementById('plaid-collapse-button');
const plaidCardBody = document.getElementById('plaid-card-body');
const plaidConnectButton = document.getElementById('plaid-connect-button');
const plaidSummaryRow = document.getElementById('plaid-summary-row');
const plaidConnectedList = document.getElementById('plaid-connected-list');
const plaidFeedback = document.getElementById('plaid-feedback');
const reviewCard = document.getElementById('review-card');
const reviewRefreshButton = document.getElementById('review-refresh-button');
const reviewLivePill = document.getElementById('review-live-pill');
const reviewSummaryRow = document.getElementById('review-summary-row');
const reviewQueueList = document.getElementById('review-queue-list');
const reviewFeedback = document.getElementById('review-feedback');
const reviewSheetModal = document.getElementById('review-sheet-modal');
const reviewSheetClose = document.getElementById('review-sheet-close');
const reviewSheetCopy = document.getElementById('review-sheet-copy');
const reviewSheetTransaction = document.getElementById('review-sheet-transaction');
const reviewSheetMemo = document.getElementById('review-sheet-memo');
const reviewSheetCategoryList = document.getElementById('review-sheet-category-list');
const reviewSheetSuggestionsCopy = document.getElementById('review-sheet-suggestions-copy');
const reviewSheetCategoryToggle = document.getElementById('review-sheet-category-toggle');
const reviewSheetCategoryPanel = document.getElementById('review-sheet-category-panel');
const reviewSheetCard = reviewSheetModal?.querySelector('.bottom-sheet-card');
const reviewSheetFeedback = document.getElementById('review-sheet-feedback');
const reviewSheetDismiss = document.getElementById('review-sheet-dismiss');
const reviewSheetCancel = document.getElementById('review-sheet-cancel');
const reviewSheetSave = document.getElementById('review-sheet-save');
const plaidDisconnectModal = document.getElementById('plaid-disconnect-modal');
const plaidDisconnectClose = document.getElementById('plaid-disconnect-close');
const plaidDisconnectCopy = document.getElementById('plaid-disconnect-copy');
const plaidDisconnectFeedback = document.getElementById('plaid-disconnect-feedback');
const plaidDisconnectCancel = document.getElementById('plaid-disconnect-cancel');
const plaidDisconnectConfirm = document.getElementById('plaid-disconnect-confirm');
const premiumBankModal = document.getElementById('premium-bank-modal');
const premiumBankClose = document.getElementById('premium-bank-close');
const premiumBankCancel = document.getElementById('premium-bank-cancel');
const premiumBankConfirm = document.getElementById('premium-bank-confirm');
const addSpendingToggle = document.getElementById('add-spending-toggle');
const addSpendingPanel = document.getElementById('add-spending-panel');
const trackingSections = document.getElementById('tracking-sections');
const transactionForm = document.getElementById('transaction-form');
const transactionAmountInput = document.getElementById('transaction-amount');
const transactionDateInput = document.getElementById('transaction-date');
const transactionCategorySelect = document.getElementById('transaction-category');
const transactionMemoInput = document.getElementById('transaction-memo');
const transactionFeedback = document.getElementById('transaction-feedback');
const transactionHistory = document.getElementById('transaction-history');
const transactionEditModal = document.getElementById('transaction-edit-modal');
const transactionEditClose = document.getElementById('transaction-edit-close');
const transactionEditForm = document.getElementById('transaction-edit-form');
const transactionEditAmount = document.getElementById('transaction-edit-amount');
const transactionEditDate = document.getElementById('transaction-edit-date');
const transactionEditCategory = document.getElementById('transaction-edit-category');
const transactionEditMemo = document.getElementById('transaction-edit-memo');
const transactionEditFeedback = document.getElementById('transaction-edit-feedback');
const transactionEditRemove = document.getElementById('transaction-edit-remove');
const transactionEditCancel = document.getElementById('transaction-edit-cancel');
const transactionEditSave = document.getElementById('transaction-edit-save');
const actionConfirmModal = document.getElementById('action-confirm-modal');
const actionConfirmEyebrow = document.getElementById('action-confirm-eyebrow');
const actionConfirmTitle = document.getElementById('action-confirm-title');
const actionConfirmCopy = document.getElementById('action-confirm-copy');
const actionConfirmFeedback = document.getElementById('action-confirm-feedback');
const actionConfirmCancel = document.getElementById('action-confirm-cancel');
const actionConfirmProceed = document.getElementById('action-confirm-proceed');

const breakdownTargets = {
  grossAnnual: document.getElementById('detail-gross-annual'),
  pretaxAnnual: document.getElementById('detail-pretax-annual'),
  pretaxList: document.getElementById('detail-pretax-list'),
  taxableWages: document.getElementById('detail-taxable-wages'),
  federalStandard: document.getElementById('detail-federal-standard'),
  federalTaxable: document.getElementById('detail-federal-taxable'),
  federalAnnual: document.getElementById('detail-federal-annual'),
  ssAnnual: document.getElementById('detail-ss-annual'),
  medicareAnnual: document.getElementById('detail-medicare-annual'),
  stateTaxable: document.getElementById('detail-state-taxable'),
  stateAnnual: document.getElementById('detail-state-annual'),
  posttaxAnnual: document.getElementById('detail-posttax-annual'),
  posttaxList: document.getElementById('detail-posttax-list'),
  netAnnual: document.getElementById('detail-net-annual'),
  netMonthly: document.getElementById('detail-net-monthly')
};

const CLICK_MOTION_SELECTOR = [
  'button',
  '[role="button"]',
  'a[href]',
  '.tax-switch',
  '.settings-row'
].join(', ');

let currentStep = 1;
let previousStep = 1;
let currentMethod = 'salary';
const activeDeductionModes = {
  '401k': 'yearly',
  roth: 'yearly',
  hsa: 'yearly'
};
let allocationState = null;
let dashboardState = null;
let selectedDashboardCategoryId = null;
let currentUser = null;
let authRequestInFlight = false;
let authRecoveryStage = 'request';
let plaidLinkHandler = null;
let plaidState = {
  loading: false,
  connecting: false,
  entitlement: null,
  summary: null,
  items: [],
  error: '',
  success: ''
};
let reviewState = {
  loading: false,
  hasLoaded: false,
  syncing: false,
  saving: false,
  items: [],
  summary: { queueCount: 0, monthLabel: null },
  error: '',
  success: '',
  activeReviewId: null,
  selectedCategoryId: null
};
let transactionEditState = {
  transactionId: null,
  saving: false
};
let reviewSheetCategoriesExpanded = true;
let actionConfirmState = {
  onConfirm: null,
  saving: false
};
let plaidDisconnectState = {
  accountId: null,
  accountName: '',
  saving: false
};
let profileView = 'account';
let profileState = {
  loading: false,
  savingAccount: false,
  redeemingPromo: false,
  premium: null,
  pendingAccountPayload: null
};
let pushState = {
  supported: false,
  configured: false,
  permission: 'default',
  subscription: null,
  subscriptionCount: 0,
  loading: false,
  sendingTest: false,
  sendingPreview: false,
  vapidPublicKey: null,
};
let addSpendingExpanded = false;
let plaidCardExpanded = false;
let pendingReviewDeepLink = null;
let instantPreviewDeepLink = false;
let persistedAppState = {
  incomeProfile: null,
  monthlyBudget: null,
  hasCompletedOnboarding: false
};
let ledgerAssistantState = {
  currentStep: 1,
  answers: {
    priority: '',
    expenses: [],
    leftover: ''
  },
  hasAutoOpened: false,
  isSubmitting: false,
  hasBuiltDraft: false,
  dismissed: false
};

const CURRENT_USER_STORAGE_KEY = 'largent-current-user';
const clickMotionAnimations = new WeakMap();

const defaultAllocationSections = [
  {
    id: 'assets',
    title: 'Assets',
    categories: ['Investments', 'Emergency Savings', 'Short Term Savings', 'Longterm Savings']
  },
  {
    id: 'fixed-expenses',
    title: 'Fixed Expenses',
    categories: ['Rent', 'Car Payment', 'Car Insurance', 'Charitable Donations', 'Subscriptions', 'Student Loans']
  },
  {
    id: 'variable-expenses',
    title: 'Variable Expenses',
    categories: ['Groceries', 'Gas', 'Fun']
  }
];

const assistantPriorityChoices = [
  { id: 'stability', label: 'Cover essentials', hint: 'Keep the month steady and realistic.' },
  { id: 'save', label: 'Build savings', hint: 'Lean more toward emergency and short-term reserves.' },
  { id: 'debt', label: 'Pay down debt', hint: 'Leave tighter room so fixed obligations stay front and center.' },
  { id: 'invest', label: 'Invest consistently', hint: 'Keep long-term buckets funded from the start.' },
  { id: 'simple', label: 'Keep it simple', hint: 'Fewer moving parts and a clean first draft.' }
];

const assistantExpenseChoices = [
  { id: 'rent', label: 'Rent', bucket: 'fixed-expenses', title: 'Rent' },
  { id: 'carPayment', label: 'Car payment', bucket: 'fixed-expenses', title: 'Car Payment' },
  { id: 'carInsurance', label: 'Car insurance', bucket: 'fixed-expenses', title: 'Car Insurance' },
  { id: 'studentLoans', label: 'Student loans', bucket: 'fixed-expenses', title: 'Student Loans' },
  { id: 'subscriptions', label: 'Subscriptions', bucket: 'fixed-expenses', title: 'Subscriptions' },
  { id: 'donations', label: 'Charitable giving', bucket: 'fixed-expenses', title: 'Charitable Donations' },
  { id: 'groceries', label: 'Groceries', bucket: 'variable-expenses', title: 'Groceries' },
  { id: 'gas', label: 'Gas / transport', bucket: 'variable-expenses', title: 'Gas' },
  { id: 'fun', label: 'Fun spending', bucket: 'variable-expenses', title: 'Fun' }
];

const assistantLeftoverChoices = [
  { id: 'savings', label: 'Put extra into savings', hint: 'Favor emergency and near-term goals.' },
  { id: 'debt', label: 'Put extra into debt payoff', hint: 'Keep more room around required payments.' },
  { id: 'split', label: 'Split between savings and fun', hint: 'Balanced but still flexible.' },
  { id: 'flex', label: 'Keep more flexible spending', hint: 'Leave more breathing room in the month.' },
  { id: 'invest', label: 'Invest the extra', hint: 'Favor long-term growth buckets.' },
  { id: 'balanced', label: 'Show me balanced', hint: 'A clean middle ground.' }
];

function shouldReduceMotion() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.reduceMotion === 'true'
  );
}

function getClickMotionTarget(element) {
  if (!element || !(element instanceof Element)) {
    return null;
  }

  return element.closest(CLICK_MOTION_SELECTOR);
}

function isMotionTargetDisabled(target) {
  if (!target) {
    return true;
  }

  if (target.matches('[aria-disabled="true"]')) {
    return true;
  }

  if ('disabled' in target && target.disabled) {
    return true;
  }

  if (target.closest('[hidden]')) {
    return true;
  }

  return false;
}

function getClickMotionDirection(target) {
  if (!target) {
    return 'forward';
  }

  if (
    target.dataset.clickSlide === 'backward' ||
    target.matches(
      '#back-step, #allocation-back, #dashboard-back, #allocation-confirm-cancel, #profile-account-confirm-cancel, #plaid-disconnect-cancel, #premium-bank-cancel, #review-sheet-dismiss, #review-sheet-cancel, [data-close-modal]'
    )
  ) {
    return 'backward';
  }

  return 'forward';
}

function playClickMotion(target) {
  if (!target || shouldReduceMotion() || isMotionTargetDisabled(target)) {
    return;
  }

  const direction = getClickMotionDirection(target);
  const slideDistance = direction === 'backward' ? -4 : 4;
  const previousAnimation = clickMotionAnimations.get(target);
  previousAnimation?.cancel();

  const animation = target.animate(
    [
      { transform: 'translate3d(0, 0, 0) scale(1)' },
      { transform: `translate3d(${slideDistance}px, 0, 0) scale(0.992)`, offset: 0.52 },
      { transform: 'translate3d(0, 0, 0) scale(1)' }
    ],
    {
      duration: 280,
      easing: 'cubic-bezier(0.25, 0.9, 0.3, 1)',
      fill: 'none'
    }
  );

  clickMotionAnimations.set(target, animation);
  animation.addEventListener('finish', () => {
    if (clickMotionAnimations.get(target) === animation) {
      clickMotionAnimations.delete(target);
    }
  });
  animation.addEventListener('cancel', () => {
    if (clickMotionAnimations.get(target) === animation) {
      clickMotionAnimations.delete(target);
    }
  });
}

function pushSupportedInBrowser() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const normalized = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(normalized);
  return Uint8Array.from([...rawData].map(character => character.charCodeAt(0)));
}

function getDeviceLabel() {
  const platform = navigator.platform || 'Device';
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  return `${platform}${standalone ? ' · Home Screen' : ' · Browser'}`;
}

async function registerPushServiceWorker() {
  if (!pushSupportedInBrowser()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    return registration;
  } catch (error) {
    return null;
  }
}

async function getExistingPushSubscription() {
  if (!pushSupportedInBrowser()) {
    return null;
  }

  const registration = await registerPushServiceWorker();
  if (!registration) {
    return null;
  }

  return registration.pushManager.getSubscription();
}

function renderPushAlertsUI() {
  if (!transactionPushToggle || !transactionAlertsDetail) {
    return;
  }

  const supported = pushState.supported;
  const configured = pushState.configured;
  const subscribed = Boolean(pushState.subscription);
  const enabled = Boolean(currentUser?.transactionPushAlertsEnabled && subscribed);
  const premiumWithBankSync = Boolean(
    profileState.premium?.entitlement?.premiumAccess &&
    profileState.premium?.entitlement?.bankSyncEnabled
  );
  const instantEnabled = Boolean(currentUser?.instantTransactionAlertsEnabled);

  transactionPushToggle.checked = enabled;
  transactionPushToggle.disabled = !currentUser || pushState.loading || !supported || !configured;
  if (transactionPushTestButton) {
    transactionPushTestButton.hidden = !supported || !configured;
    transactionPushTestButton.disabled = !enabled || pushState.sendingTest;
    transactionPushTestButton.textContent = pushState.sendingTest ? 'Sending…' : 'Send test alert';
  }
  if (instantAlertPreviewButton) {
    instantAlertPreviewButton.hidden = !supported || !configured || !premiumWithBankSync || !instantEnabled;
    instantAlertPreviewButton.disabled = !enabled || pushState.sendingPreview;
    instantAlertPreviewButton.textContent = pushState.sendingPreview ? 'Sending…' : 'Preview instant alert';
  }

  if (!supported) {
    transactionAlertsDetail.textContent = 'This browser does not support push alerts here yet. On iPhone, add Largent to your Home Screen first.';
    return;
  }

  if (!configured) {
    transactionAlertsDetail.textContent = 'Push alerts are not configured on the server yet.';
    return;
  }

  if (pushState.permission === 'denied') {
    transactionAlertsDetail.textContent = 'Notifications are blocked for Largent on this device. Re-enable them in browser settings to use alerts.';
    return;
  }

  if (enabled) {
    transactionAlertsDetail.textContent = `This device is ready for transaction alerts. ${pushState.subscriptionCount || 1} active device${pushState.subscriptionCount === 1 ? '' : 's'} on your account.`;
    return;
  }

  transactionAlertsDetail.textContent = 'Get a push when new synced spending is ready to categorize on this device.';
}

async function loadPushStatus({ silent = false } = {}) {
  pushState.supported = pushSupportedInBrowser();
  pushState.permission = pushSupportedInBrowser() ? Notification.permission : 'default';

  if (!currentUser) {
    pushState = {
      ...pushState,
      configured: false,
      vapidPublicKey: null,
      subscription: null,
      subscriptionCount: 0,
      loading: false,
      sendingTest: false,
    };
    renderPushAlertsUI();
    return null;
  }

  if (!pushState.supported) {
    renderPushAlertsUI();
    return null;
  }

  pushState.loading = true;
  if (!silent) {
    setProfileFeedback(profileAccountFeedback, '');
  }
  renderPushAlertsUI();

  try {
    const [statusPayload, existingSubscription] = await Promise.all([
      apiRequest('/api/push/status'),
      getExistingPushSubscription(),
    ]);
    pushState = {
      ...pushState,
      configured: Boolean(statusPayload.configured),
      vapidPublicKey: statusPayload.vapidPublicKey || null,
      subscription: existingSubscription,
      subscriptionCount: statusPayload.subscriptionCount || 0,
      permission: Notification.permission,
      loading: false,
    };
    renderPushAlertsUI();
    return statusPayload;
  } catch (error) {
    pushState.loading = false;
    renderPushAlertsUI();
    if (!silent) {
      setProfileFeedback(profileAccountFeedback, error.message || 'We could not load transaction alert settings.', 'error');
    }
    return null;
  }
}

async function enableTransactionPushAlerts() {
  if (!currentUser) {
    openModal(authModal);
    return;
  }
  if (!pushState.supported) {
    setProfileFeedback(profileAccountFeedback, 'This device cannot receive Largent push alerts here yet.', 'error');
    renderPushAlertsUI();
    return;
  }
  if (!pushState.configured || !pushState.vapidPublicKey) {
    setProfileFeedback(profileAccountFeedback, 'Push alerts are not configured on the server yet.', 'error');
    renderPushAlertsUI();
    return;
  }

  pushState.loading = true;
  renderPushAlertsUI();

  try {
    const permission = await Notification.requestPermission();
    pushState.permission = permission;
    if (permission !== 'granted') {
      throw new Error('Notification permission was not granted.');
    }

    const registration = await registerPushServiceWorker();
    if (!registration) {
      throw new Error('Largent could not register push support on this device.');
    }

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(pushState.vapidPublicKey),
      });
    }

    const payload = await apiRequest('/api/push/subscribe', {
      method: 'POST',
      body: {
        subscription: subscription.toJSON(),
        userAgent: navigator.userAgent,
        deviceLabel: getDeviceLabel(),
      },
    });

    saveCurrentUser(payload.user || currentUser);
    pushState.subscription = subscription;
    pushState.subscriptionCount = payload.subscriptionCount || 1;
    setProfileFeedback(profileAccountFeedback, payload.message || 'Transaction alerts enabled for this device.', 'success');
  } catch (error) {
    if (transactionPushToggle) {
      transactionPushToggle.checked = false;
    }
    setProfileFeedback(profileAccountFeedback, error.message || 'We could not enable transaction alerts on this device.', 'error');
  } finally {
    pushState.loading = false;
    renderPushAlertsUI();
  }
}

async function disableTransactionPushAlerts() {
  pushState.loading = true;
  renderPushAlertsUI();

  try {
    const subscription = pushState.subscription || await getExistingPushSubscription();
    if (subscription) {
      await apiRequest('/api/push/unsubscribe', {
        method: 'POST',
        body: { endpoint: subscription.endpoint },
      });
      await subscription.unsubscribe().catch(() => {});
    } else {
      await apiRequest('/api/push/unsubscribe', { method: 'POST', body: {} });
    }

    if (currentUser) {
      saveCurrentUser({
        ...currentUser,
        transactionPushAlertsEnabled: false,
      });
    }
    pushState.subscription = null;
    pushState.subscriptionCount = 0;
    setProfileFeedback(profileAccountFeedback, 'Transaction alerts disabled on this device.', 'success');
  } catch (error) {
    setProfileFeedback(profileAccountFeedback, error.message || 'We could not disable transaction alerts.', 'error');
  } finally {
    pushState.loading = false;
    renderPushAlertsUI();
  }
}

async function handleTransactionPushToggleChange() {
  if (!transactionPushToggle) {
    return;
  }

  if (transactionPushToggle.checked) {
    await enableTransactionPushAlerts();
    return;
  }

  await disableTransactionPushAlerts();
}

async function sendTransactionPushTest() {
  if (!currentUser || pushState.sendingTest) {
    return;
  }

  pushState.sendingTest = true;
  renderPushAlertsUI();

  try {
    const payload = await apiRequest('/api/push/test', { method: 'POST' });
    setProfileFeedback(profileAccountFeedback, payload.message || 'Test alert sent.', 'success');
  } catch (error) {
    setProfileFeedback(profileAccountFeedback, error.message || 'We could not send a test alert.', 'error');
  } finally {
    pushState.sendingTest = false;
    renderPushAlertsUI();
  }
}

async function sendInstantAlertPreview() {
  if (!currentUser || pushState.sendingPreview) {
    return;
  }

  pushState.sendingPreview = true;
  renderPushAlertsUI();
  setProfileFeedback(profileAccountFeedback, '');

  try {
    const payload = await apiRequest('/api/push/instant-preview', { method: 'POST' });
    setProfileFeedback(profileAccountFeedback, payload.message || 'Preview alert sent.', 'success');
  } catch (error) {
    setProfileFeedback(profileAccountFeedback, error.message || 'We could not send the instant alert preview.', 'error');
  } finally {
    pushState.sendingPreview = false;
    renderPushAlertsUI();
  }
}

const stateOptions = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
  'Washington, DC'
];
const stateNameToCode = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
  'Washington, DC': 'DC'
};
const stateCodeToName = Object.fromEntries(Object.entries(stateNameToCode).map(([name, code]) => [code, name]));

const payPeriods = {
  Weekly: 52,
  Biweekly: 26,
  'Semi-monthly': 24,
  Monthly: 12
};

const federalStandardDeductions = {
  Single: 16100,
  'Married Filing Jointly': 32200,
  'Married Filing Separately': 16100,
  'Head of Household': 24150
};

const federalBrackets = {
  Single: [
    { floor: 0, rate: 0.1 },
    { floor: 12400, rate: 0.12 },
    { floor: 50400, rate: 0.22 },
    { floor: 105700, rate: 0.24 },
    { floor: 201775, rate: 0.32 },
    { floor: 256225, rate: 0.35 },
    { floor: 640600, rate: 0.37 }
  ],
  'Married Filing Jointly': [
    { floor: 0, rate: 0.1 },
    { floor: 24800, rate: 0.12 },
    { floor: 100800, rate: 0.22 },
    { floor: 211400, rate: 0.24 },
    { floor: 403550, rate: 0.32 },
    { floor: 512450, rate: 0.35 },
    { floor: 768700, rate: 0.37 }
  ],
  'Married Filing Separately': [
    { floor: 0, rate: 0.1 },
    { floor: 12400, rate: 0.12 },
    { floor: 50400, rate: 0.22 },
    { floor: 105700, rate: 0.24 },
    { floor: 201775, rate: 0.32 },
    { floor: 256225, rate: 0.35 },
    { floor: 384350, rate: 0.37 }
  ],
  'Head of Household': [
    { floor: 0, rate: 0.1 },
    { floor: 17700, rate: 0.12 },
    { floor: 67450, rate: 0.22 },
    { floor: 105700, rate: 0.24 },
    { floor: 201750, rate: 0.32 },
    { floor: 256200, rate: 0.35 },
    { floor: 640600, rate: 0.37 }
  ]
};

const additionalMedicareThresholds = {
  Single: 200000,
  'Married Filing Jointly': 250000,
  'Married Filing Separately': 125000,
  'Head of Household': 200000
};

const deductionKinds = ['401k', 'roth', 'hsa'];
const filingStatusToApi = {
  Single: 'single',
  'Married Filing Jointly': 'married_filing_jointly',
  'Married Filing Separately': 'married_filing_separately',
  'Head of Household': 'head_of_household'
};
const filingStatusFromApi = Object.fromEntries(Object.entries(filingStatusToApi).map(([label, value]) => [value, label]));
const payFrequencyToApi = {
  Weekly: 'weekly',
  Biweekly: 'biweekly',
  'Semi-monthly': 'semi_monthly',
  Monthly: 'monthly'
};
const payFrequencyFromApi = Object.fromEntries(Object.entries(payFrequencyToApi).map(([label, value]) => [value, label]));

function showScreen(screenName) {
  screens.forEach(screen => {
    const isActive = screen.dataset.screen === screenName;
    screen.classList.toggle('screen-active', isActive);
  });

  if (screenName === 'dashboard' && currentUser) {
    loadPlaidStatus({ silent: true });
    loadPlaidReviewQueue({ silent: true });
    loadPremiumStatus()
      .then(() => renderPlaidSection())
      .catch(() => renderPlaidSection());
  }

  if (screenName === 'allocation') {
    window.setTimeout(() => {
      maybeOpenLedgerAssistant();
    }, 40);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function readReviewDeepLinkFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const reviewQueueRequested = params.get('reviewQueue') === '1';
  const reviewId = params.get('review');
  const previewCategory = params.get('previewCategory');
  instantPreviewDeepLink = params.get('instantPreview') === '1';

  if (!reviewQueueRequested && !reviewId && !instantPreviewDeepLink) {
    return null;
  }

  return {
    reviewQueueRequested,
    reviewId: reviewId || null,
    instantPreview: instantPreviewDeepLink,
    previewCategory: previewCategory || null,
  };
}

function refreshReviewDeepLinkFromUrl({ openDashboardIfNeeded = false } = {}) {
  const latestIntent = readReviewDeepLinkFromUrl();
  if (!latestIntent) {
    return false;
  }

  pendingReviewDeepLink = latestIntent;

  if (openDashboardIfNeeded && currentUser && dashboardState) {
    showScreen('dashboard');
  }

  window.setTimeout(() => {
    tryOpenReviewDeepLink();
  }, 80);

  return true;
}

function clearReviewDeepLinkFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete('reviewQueue');
  url.searchParams.delete('review');
  url.searchParams.delete('instantPreview');
  url.searchParams.delete('previewCategory');
  url.searchParams.delete('source');
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, document.title, nextUrl);
}

function consumeReviewDeepLink() {
  pendingReviewDeepLink = null;
  clearReviewDeepLinkFromUrl();
}

function tryOpenReviewDeepLink() {
  if (!pendingReviewDeepLink || !dashboardState || !currentUser) {
    return false;
  }

  if (pendingReviewDeepLink.instantPreview) {
    openInstantAlertPreviewSheet(pendingReviewDeepLink.previewCategory);
    consumeReviewDeepLink();
    return true;
  }

  if (!isPremiumActive()) {
    return false;
  }

  if (!reviewState.hasLoaded) {
    return false;
  }

  if (!reviewState.items.length) {
    if (reviewState.loading || reviewState.syncing) {
      return false;
    }
    reviewState.success = 'That purchase is no longer waiting for a category.';
    renderReviewQueue();
    consumeReviewDeepLink();
    return true;
  }

  const matchedReview = pendingReviewDeepLink.reviewId
    ? reviewState.items.find(item => item.id === pendingReviewDeepLink.reviewId)
    : reviewState.items[0];

  if (!matchedReview && pendingReviewDeepLink.reviewId) {
    reviewState.success = 'That purchase was already handled, so it is no longer in your review queue.';
    renderReviewQueue();
    consumeReviewDeepLink();
    return true;
  }

  if (!matchedReview) {
    return false;
  }

  showScreen('dashboard');
  openReviewSheet(matchedReview.id);
  consumeReviewDeepLink();
  return true;
}

function setAuthMode(mode) {
  authToggles.forEach(toggle => {
    const isActive = toggle.dataset.authMode === mode;
    toggle.classList.toggle('toggle-active', isActive);
    toggle.setAttribute('aria-selected', String(isActive));
  });

  authForms.forEach(form => {
    form.classList.toggle('auth-form-active', form.dataset.form === mode);
  });

  clearAuthFeedback();
}

function setRecoveryStage(stage) {
  authRecoveryStage = stage;

  if (!authRecoveryResetFields || !authRecoverySubmit || !authRecoveryCopy || !authRecoveryForm) {
    return;
  }

  const isResetStage = stage === 'reset';
  authRecoveryResetFields.hidden = !isResetStage;
  authRecoverySubmit.textContent = isResetStage ? 'Reset Password' : 'Send Recovery Code';
  authRecoveryCopy.textContent = isResetStage
    ? 'Paste the recovery code from your email and choose a new password.'
    : 'Enter your email and we’ll send a recovery code you can paste back into Largent.';

  authRecoveryForm.elements.recoveryCode.required = isResetStage;
  authRecoveryForm.elements.password.required = isResetStage;
  authRecoveryForm.elements.confirmPassword.required = isResetStage;
}

function updateFlowStep() {
  flowSteps.forEach(step => {
    const isActive = Number(step.dataset.step) === currentStep;
    step.classList.toggle('flow-step-active', isActive);
    if (isActive) {
      const direction = currentStep >= previousStep ? 'forward' : 'backward';
      step.dataset.stepDirection = direction;
      step.classList.remove('flow-step-animate');
      requestAnimationFrame(() => step.classList.add('flow-step-animate'));
    } else {
      step.classList.remove('flow-step-animate');
      delete step.dataset.stepDirection;
    }
  });

  stepIndicators.forEach(indicator => {
    const stepIndex = Number(indicator.dataset.stepIndicator);
    const isActive = stepIndex === currentStep;
    const isComplete = stepIndex < currentStep;
    const isClickable = stepIndex === 1 || isComplete || currentStep === 4;
    indicator.classList.toggle('step-item-active', isActive);
    indicator.classList.toggle('step-item-complete', isComplete);
    indicator.classList.toggle('step-item-clickable', isClickable);
    indicator.setAttribute('aria-disabled', String(!isClickable));
    indicator.tabIndex = isClickable ? 0 : -1;
  });

  stepNumber.textContent = String(currentStep);
  backStepButton.disabled = currentStep === 1;
  nextStepButton.textContent = currentStep === 4 ? 'Save & Go to Ledger' : 'Next';

  if (currentStep === 4) {
    updateSummary();
  }
}

function parseMoney(value) {
  const normalized = String(value || '').replace(/[^0-9.]/g, '');
  return Number(normalized || 0);
}

function parsePercent(value) {
  const normalized = String(value || '').replace(/[^0-9.]/g, '');
  return Number(normalized || 0);
}

function roundToCents(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function toCurrencyInputValue(value) {
  return value ? String(roundToCents(value)) : '';
}

function getSalaryValue() {
  const enteredValue = parseMoney(annualSalaryInput.value);
  if (currentMethod === 'manual') {
    return enteredValue * 12;
  }
  return enteredValue;
}

function getManualMonthlyTakeHomeValue() {
  return parseMoney(annualSalaryInput.value);
}

function getPayPeriods() {
  return payPeriods[payFrequencySelect.value] || 26;
}

function getMonthlyDivisor() {
  return 12;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatCurrencyPrecise(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return '0%';
  }

  return `${value.toFixed(value % 1 === 0 ? 0 : 2)}%`;
}

function getDeductionInput(deduction, mode) {
  return document.querySelector(`[data-deduction-input="${deduction}"][data-mode="${mode}"]`);
}

function getActiveDeductionMode(deduction) {
  return activeDeductionModes[deduction] || 'yearly';
}

function getDeductionTaxTreatment(deduction) {
  const active = taxSwitches.find(input => input.dataset.taxSwitch === deduction);
  return active?.checked ? 'pretax' : 'posttax';
}

function setDeductionMode(deduction, mode) {
  activeDeductionModes[deduction] = mode;

  document
    .querySelectorAll(`[data-deduction-field="${deduction}"]`)
    .forEach(field => {
      const isActive = field.dataset.mode === mode;
      field.classList.toggle('deduction-field-active', isActive);
    });

  syncDeductionFields(deduction, mode);
  updateDeductionReflection(deduction);
}

function setDeductionTaxTreatment(deduction, treatment) {
  const active = taxSwitches.find(input => input.dataset.taxSwitch === deduction);
  if (active) {
    active.checked = treatment === 'pretax';
  }
}

function setInputValue(input, value, type) {
  if (!input) {
    return;
  }

  if (!value) {
    input.value = '';
    return;
  }

  input.value = type === 'percent'
    ? String(roundToCents(value))
    : String(roundToCents(value));
}

function syncDeductionFields(deduction, sourceMode) {
  const yearlyInput = getDeductionInput(deduction, 'yearly');
  const percentInput = getDeductionInput(deduction, 'percent');
  const salary = getSalaryValue();

  if (!yearlyInput || !percentInput || !salary) {
    const sourceInput = getDeductionInput(deduction, sourceMode);
    const targetInput = getDeductionInput(deduction, sourceMode === 'yearly' ? 'percent' : 'yearly');
    if (sourceInput && !parseMoney(sourceInput.value) && !parsePercent(sourceInput.value)) {
      targetInput.value = '';
    }
    return;
  }

  if (sourceMode === 'yearly') {
    const yearlyAmount = parseMoney(yearlyInput.value);
    const percent = yearlyAmount > 0 ? (yearlyAmount / salary) * 100 : 0;
    setInputValue(percentInput, percent, 'percent');
    return;
  }

  const percent = parsePercent(percentInput.value);
  const yearlyAmount = percent > 0 ? salary * (percent / 100) : 0;
  setInputValue(yearlyInput, yearlyAmount, 'money');
}

function updateDeductionReflection(deduction) {
  const reflection = document.querySelector(`[data-deduction-reflection="${deduction}"]`);
  const yearlyInput = getDeductionInput(deduction, 'yearly');
  const percentInput = getDeductionInput(deduction, 'percent');
  const salary = getSalaryValue();
  const periods = getPayPeriods();
  const yearlyAmount = parseMoney(yearlyInput?.value);
  const percent = parsePercent(percentInput?.value);

  if (!reflection) {
    return;
  }

  if (!salary || (!yearlyAmount && !percent)) {
    reflection.textContent = 'Start with either field and the matching yearly amount or paycheck percentage will update automatically.';
    return;
  }

  const resolvedYearly = yearlyAmount || salary * (percent / 100);
  const resolvedPercent = percent || ((resolvedYearly / salary) * 100);
  const perPaycheck = resolvedYearly / periods;

  reflection.textContent = `${formatCurrencyPrecise(resolvedYearly)} per year equals about ${formatCurrencyPrecise(perPaycheck)} per paycheck, or ${formatPercent(resolvedPercent)} of gross pay.`;
}

function getDeductionAmount(deduction) {
  const activeMode = getActiveDeductionMode(deduction);
  const activeInput = getDeductionInput(deduction, activeMode);

  if (!activeInput) {
    return 0;
  }

  if (activeMode === 'yearly') {
    return parseMoney(activeInput.value);
  }

  return getSalaryValue() * (parsePercent(activeInput.value) / 100);
}

function computeProgressiveTax(income, brackets) {
  const taxableIncome = Math.max(0, income);
  const cleanBrackets = (brackets || [])
    .filter(bracket => Number.isFinite(bracket.floor) && Number.isFinite(bracket.rate))
    .sort((left, right) => left.floor - right.floor);

  if (!cleanBrackets.length || taxableIncome <= 0) {
    return 0;
  }

  let totalTax = 0;

  cleanBrackets.forEach((bracket, index) => {
    const nextFloor = cleanBrackets[index + 1]?.floor ?? Infinity;
    if (taxableIncome <= bracket.floor) {
      return;
    }

    const taxableAtRate = Math.min(taxableIncome, nextFloor) - bracket.floor;
    if (taxableAtRate > 0) {
      totalTax += taxableAtRate * bracket.rate;
    }
  });

  return totalTax;
}

function getStateTaxProfile(state, filingStatus) {
  const record = window.STATE_TAX_DATA?.[state];

  if (!record) {
    return {
      profile: null,
      meta: {},
      note: 'State tax data is unavailable for this selection, so state income tax is temporarily shown as $0.'
    };
  }

  if (filingStatus === 'Married Filing Jointly') {
    return { profile: record.mfj, meta: record.meta || {}, note: '' };
  }

  if (filingStatus === 'Single') {
    return { profile: record.single, meta: record.meta || {}, note: '' };
  }

  return {
    profile: record.single,
    meta: record.meta || {},
    note: `${filingStatus} currently uses the state's single schedule for this first build estimate. Federal tax is using the correct ${filingStatus.toLowerCase()} schedule.`
  };
}

function getStateStandardDeduction(meta, filingStatus) {
  if (filingStatus === 'Married Filing Jointly') {
    return meta.standardDeductionMFJ || 0;
  }

  return meta.standardDeductionSingle || 0;
}

function getStatePersonalAdjustment(meta, filingStatus) {
  if (filingStatus === 'Married Filing Jointly') {
    return meta.personalExemptionMFJ || { amount: 0, kind: 'none' };
  }

  return meta.personalExemptionSingle || { amount: 0, kind: 'none' };
}

function calculateStateTax(taxableWages, state, filingStatus) {
  const { profile, meta, note } = getStateTaxProfile(state, filingStatus);

  if (!profile || profile.none) {
    return {
      taxableIncome: 0,
      tax: 0,
      note: note || `${state} does not have a wage income tax in this estimate.`
    };
  }

  const standardDeduction = getStateStandardDeduction(meta, filingStatus);
  const personalAdjustment = getStatePersonalAdjustment(meta, filingStatus);
  const deductionAmount = personalAdjustment.kind === 'deduction' ? personalAdjustment.amount || 0 : 0;
  const stateTaxableIncome = Math.max(0, taxableWages - standardDeduction - deductionAmount);

  let stateTax = computeProgressiveTax(stateTaxableIncome, profile.brackets);

  if (personalAdjustment.kind === 'credit') {
    stateTax = Math.max(0, stateTax - (personalAdjustment.amount || 0));
  }

  return {
    taxableIncome: stateTaxableIncome,
    tax: stateTax,
    note
  };
}

function calculateResults() {
  if (currentMethod === 'manual') {
    const monthlyTakeHome = getManualMonthlyTakeHomeValue();
    const annualNet = monthlyTakeHome * 12;

    return {
      annualSalary: annualNet,
      annualPretaxDeductions: 0,
      pretaxItems: [],
      taxableWages: annualNet,
      federalStandardDeduction: 0,
      federalTaxableIncome: 0,
      annualFederalTax: 0,
      annualSocialSecurity: 0,
      annualMedicare: 0,
      annualFica: 0,
      stateTaxableIncome: 0,
      annualStateTax: 0,
      annualPosttaxDeductions: 0,
      posttaxItems: [],
      annualNet,
      monthlyGross: monthlyTakeHome,
      monthlyFederalTax: 0,
      monthlyStateTax: 0,
      monthlyFica: 0,
      monthlyNet: monthlyTakeHome,
      stateNote: 'Manual take-home mode uses your entered monthly amount directly and skips tax estimation.'
    };
  }

  const annualSalary = getSalaryValue();
  const filingStatus = filingStatusSelect.value;
  const state = stateSelect.value;
  const federalStandardDeduction = federalStandardDeductions[filingStatus] || 0;
  const annual401k = getDeductionAmount('401k');
  const annualRoth = getDeductionAmount('roth');
  const annualHsa = getDeductionAmount('hsa');
  const extraWithholding = parseMoney(extraWithholdingInput.value);
  const annualDeductionMap = {
    '401k': annual401k,
    roth: annualRoth,
    hsa: annualHsa
  };
  const pretaxItems = deductionKinds
    .filter(deduction => getDeductionTaxTreatment(deduction) === 'pretax' && annualDeductionMap[deduction] > 0)
    .map(deduction => ({ name: deductionLabel(deduction), amount: annualDeductionMap[deduction] }));
  const posttaxItems = deductionKinds
    .filter(deduction => getDeductionTaxTreatment(deduction) === 'posttax' && annualDeductionMap[deduction] > 0)
    .map(deduction => ({ name: deductionLabel(deduction), amount: annualDeductionMap[deduction] }));
  if (extraWithholding > 0) {
    const extraWithholdingItem = { name: 'Extra withholding', amount: extraWithholding };
    if (getDeductionTaxTreatment('extra-withholding') === 'pretax') {
      pretaxItems.push(extraWithholdingItem);
    } else {
      posttaxItems.push(extraWithholdingItem);
    }
  }
  const annualPretaxDeductions = pretaxItems.reduce((sum, item) => sum + item.amount, 0);
  const annualPosttaxDeductions = posttaxItems.reduce((sum, item) => sum + item.amount, 0);
  const taxableWages = Math.max(0, annualSalary - annualPretaxDeductions);
  const federalTaxableIncome = Math.max(0, taxableWages - federalStandardDeduction);
  const annualFederalTax = computeProgressiveTax(federalTaxableIncome, federalBrackets[filingStatus]);
  const socialSecurityWages = Math.min(taxableWages, 176100);
  const annualSocialSecurity = socialSecurityWages * 0.062;
  const annualBaseMedicare = taxableWages * 0.0145;
  const additionalThreshold = additionalMedicareThresholds[filingStatus] || 200000;
  const annualAdditionalMedicare = Math.max(0, taxableWages - additionalThreshold) * 0.009;
  const annualMedicare = annualBaseMedicare + annualAdditionalMedicare;
  const annualFica = annualSocialSecurity + annualMedicare;
  const stateResult = calculateStateTax(taxableWages, state, filingStatus);
  const annualNet = Math.max(
    0,
    annualSalary - annualPretaxDeductions - annualFederalTax - annualFica - stateResult.tax - annualPosttaxDeductions
  );

  return {
    annualSalary,
    annualPretaxDeductions,
    pretaxItems,
    taxableWages,
    federalStandardDeduction,
    federalTaxableIncome,
    annualFederalTax,
    annualSocialSecurity,
    annualMedicare,
    annualFica,
    stateTaxableIncome: stateResult.taxableIncome,
    annualStateTax: stateResult.tax,
    annualPosttaxDeductions,
    posttaxItems,
    annualNet,
    monthlyGross: annualSalary / getMonthlyDivisor(),
    monthlyFederalTax: annualFederalTax / getMonthlyDivisor(),
    monthlyStateTax: stateResult.tax / getMonthlyDivisor(),
    monthlyFica: annualFica / getMonthlyDivisor(),
    monthlyNet: annualNet / getMonthlyDivisor(),
    stateNote: stateResult.note
  };
}

function deductionLabel(deduction) {
  if (deduction === '401k') {
    return '401(k)';
  }

  if (deduction === 'roth') {
    return 'Roth';
  }

  if (deduction === 'hsa') {
    return 'HSA';
  }

  return deduction;
}

function renderBreakdownList(target, items, emptyLabel) {
  if (!target) {
    return;
  }

  if (!items.length) {
    target.innerHTML = `<div class="breakdown-subrow"><span>${emptyLabel}</span><strong>${formatCurrencyPrecise(0)}</strong></div>`;
    return;
  }

  target.innerHTML = items
    .map(item => `<div class="breakdown-subrow"><span>${item.name}</span><strong>${formatCurrencyPrecise(item.amount)}</strong></div>`)
    .join('');
}

function updateSummary() {
  const results = calculateResults();

  summaryNetMonthly.textContent = formatCurrency(results.monthlyNet);
  summaryGrossMonthly.textContent = formatCurrency(results.monthlyGross);
  summaryFederalMonthly.textContent = formatCurrency(results.monthlyFederalTax);
  summaryStateMonthly.textContent = formatCurrency(results.monthlyStateTax);
  summaryFicaMonthly.textContent = formatCurrency(results.monthlyFica);

  breakdownTargets.grossAnnual.textContent = formatCurrencyPrecise(results.annualSalary);
  breakdownTargets.pretaxAnnual.textContent = formatCurrencyPrecise(results.annualPretaxDeductions);
  renderBreakdownList(breakdownTargets.pretaxList, results.pretaxItems, 'No pre-tax deductions');
  breakdownTargets.taxableWages.textContent = formatCurrencyPrecise(results.taxableWages);
  breakdownTargets.federalStandard.textContent = formatCurrencyPrecise(results.federalStandardDeduction);
  breakdownTargets.federalTaxable.textContent = formatCurrencyPrecise(results.federalTaxableIncome);
  breakdownTargets.federalAnnual.textContent = formatCurrencyPrecise(results.annualFederalTax);
  breakdownTargets.ssAnnual.textContent = formatCurrencyPrecise(results.annualSocialSecurity);
  breakdownTargets.medicareAnnual.textContent = formatCurrencyPrecise(results.annualMedicare);
  breakdownTargets.stateTaxable.textContent = formatCurrencyPrecise(results.stateTaxableIncome);
  breakdownTargets.stateAnnual.textContent = formatCurrencyPrecise(results.annualStateTax);
  breakdownTargets.posttaxAnnual.textContent = formatCurrencyPrecise(results.annualPosttaxDeductions);
  renderBreakdownList(breakdownTargets.posttaxList, results.posttaxItems, 'No post-tax deductions');
  breakdownTargets.netAnnual.textContent = formatCurrencyPrecise(results.annualNet);
  breakdownTargets.netMonthly.textContent = formatCurrencyPrecise(results.monthlyNet);

  stateTaxNote.textContent = results.stateNote || '';

}

function getCurrentMonthLabel() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return formatter.format(new Date());
}

function normalizeCategoryTitle(title) {
  if (title === 'Longterm / Home Savings' || title === 'Longterm/Home Savings') {
    return 'Longterm Savings';
  }

  return title;
}

function resetLedgerAssistantState({ preserveAutoOpen = false } = {}) {
  ledgerAssistantState = {
    currentStep: 1,
    answers: {
      priority: '',
      expenses: [],
      leftover: ''
    },
    hasAutoOpened: preserveAutoOpen ? ledgerAssistantState.hasAutoOpened : false,
    isSubmitting: false,
    hasBuiltDraft: false,
    dismissed: false
  };
}

function renderAssistantOptionGroup(container, choices, selectedValue, { multi = false } = {}) {
  if (!container) {
    return;
  }

  const selectedValues = multi ? new Set(selectedValue || []) : null;

  container.innerHTML = choices
    .map(choice => {
      const selected = multi ? selectedValues.has(choice.id) : selectedValue === choice.id;
      return `
        <button
          class="ledger-assistant-option${selected ? ' ledger-assistant-option-active' : ''}"
          type="button"
          data-assistant-choice="${choice.id}"
          data-assistant-multi="${multi ? 'true' : 'false'}"
          aria-pressed="${selected ? 'true' : 'false'}"
        >
          <span class="ledger-assistant-option-label">${choice.label}</span>
          <span class="ledger-assistant-option-hint">${choice.hint || ''}</span>
        </button>
      `;
    })
    .join('');
}

function getAssistantPromptCopy() {
  if (ledgerAssistantState.currentStep === 1) {
    return 'Answer three quick prompts and Largent will build a starter budget you can edit right away.';
  }

  if (ledgerAssistantState.currentStep === 2) {
    return 'We’ll keep only the categories that actually fit your month so the ledger starts cleaner.';
  }

  return 'This last choice tells the assistant where to send the extra room in your plan.';
}

function validateAssistantStep(step = ledgerAssistantState.currentStep) {
  if (step === 1) {
    return Boolean(ledgerAssistantState.answers.priority);
  }

  if (step === 2) {
    return ledgerAssistantState.answers.expenses.length > 0;
  }

  if (step === 3) {
    return Boolean(ledgerAssistantState.answers.leftover);
  }

  return false;
}

function renderLedgerAssistant() {
  renderAssistantOptionGroup(assistantPriorityOptions, assistantPriorityChoices, ledgerAssistantState.answers.priority);
  renderAssistantOptionGroup(assistantExpenseOptions, assistantExpenseChoices, ledgerAssistantState.answers.expenses, { multi: true });
  renderAssistantOptionGroup(assistantLeftoverOptions, assistantLeftoverChoices, ledgerAssistantState.answers.leftover);

  ledgerAssistantQuestions.forEach(question => {
    const isActive = Number(question.dataset.assistantStep) === ledgerAssistantState.currentStep;
    question.hidden = !isActive;
    question.classList.toggle('ledger-assistant-question-active', isActive);
  });

  if (ledgerAssistantProgressCopy) {
    ledgerAssistantProgressCopy.textContent = `Question ${ledgerAssistantState.currentStep} of 3`;
  }

  if (ledgerAssistantProgressFill) {
    ledgerAssistantProgressFill.style.width = `${(ledgerAssistantState.currentStep / 3) * 100}%`;
  }

  if (ledgerAssistantCopy) {
    ledgerAssistantCopy.textContent = getAssistantPromptCopy();
  }

  if (ledgerAssistantBack) {
    ledgerAssistantBack.disabled = ledgerAssistantState.currentStep === 1 || ledgerAssistantState.isSubmitting;
  }

  if (ledgerAssistantNext) {
    const finalStep = ledgerAssistantState.currentStep === 3;
    ledgerAssistantNext.textContent = ledgerAssistantState.isSubmitting
      ? 'Building...'
      : finalStep
        ? 'Build my budget'
        : 'Next';
    ledgerAssistantNext.disabled = ledgerAssistantState.isSubmitting || !validateAssistantStep();
  }

  if (ledgerAssistantTrigger) {
    ledgerAssistantTrigger.classList.toggle('ledger-assistant-trigger-ready', ledgerAssistantState.hasBuiltDraft);
  }
}

function getAssistantExpenseMap() {
  return Object.fromEntries(assistantExpenseChoices.map(choice => [choice.id, choice]));
}

function roundAllocation(value) {
  return roundToCents(Math.max(0, value));
}

function buildAssistantAllocationState(monthlyIncome) {
  const income = roundToCents(monthlyIncome || allocationState?.monthlyIncome || 0);
  const selectedExpenses = ledgerAssistantState.answers.expenses;
  const expenseMap = getAssistantExpenseMap();
  const fixedPresets = {
    Rent: 0.3,
    'Car Payment': 0.09,
    'Car Insurance': 0.05,
    'Student Loans': 0.08,
    Subscriptions: 0.03,
    'Charitable Donations': 0.02,
    Groceries: 0.1,
    Gas: 0.05,
    Fun: 0.07,
  };
  const priorityProfiles = {
    stability: { Investments: 0.12, 'Emergency Savings': 0.34, 'Short Term Savings': 0.2, 'Longterm Savings': 0.2, Fun: 0.14 },
    save: { Investments: 0.1, 'Emergency Savings': 0.38, 'Short Term Savings': 0.24, 'Longterm Savings': 0.18, Fun: 0.1 },
    debt: { Investments: 0.08, 'Emergency Savings': 0.22, 'Short Term Savings': 0.12, 'Longterm Savings': 0.1, Fun: 0.08 },
    invest: { Investments: 0.34, 'Emergency Savings': 0.2, 'Short Term Savings': 0.1, 'Longterm Savings': 0.22, Fun: 0.14 },
    simple: { Investments: 0.14, 'Emergency Savings': 0.3, 'Short Term Savings': 0.16, 'Longterm Savings': 0.16, Fun: 0.12 },
  };
  const leftoverAdjustments = {
    savings: { 'Emergency Savings': 0.08, 'Short Term Savings': 0.07, 'Longterm Savings': 0.03, Investments: 0.02, Fun: -0.08 },
    debt: { 'Emergency Savings': 0.04, 'Short Term Savings': 0.02, 'Longterm Savings': 0.01, Investments: 0.01, Fun: -0.08 },
    split: { 'Emergency Savings': 0.04, 'Short Term Savings': 0.03, 'Longterm Savings': 0.02, Investments: 0, Fun: 0.03 },
    flex: { 'Emergency Savings': -0.05, 'Short Term Savings': -0.03, 'Longterm Savings': -0.01, Investments: -0.01, Fun: 0.1 },
    invest: { 'Emergency Savings': -0.02, 'Short Term Savings': -0.02, 'Longterm Savings': 0.03, Investments: 0.09, Fun: -0.03 },
    balanced: { 'Emergency Savings': 0.02, 'Short Term Savings': 0.01, 'Longterm Savings': 0.01, Investments: 0.02, Fun: 0 },
  };

  const fixedCategories = [];
  let fixedTotal = 0;
  selectedExpenses.forEach(expenseId => {
    const choice = expenseMap[expenseId];
    if (!choice) {
      return;
    }
    const amount = roundAllocation(income * (fixedPresets[choice.title] || 0));
    fixedTotal += amount;
    fixedCategories.push({
      id: `category-${expenseId}`,
      title: choice.title,
      amount,
      isEditing: false,
      bucket: choice.bucket,
    });
  });

  fixedTotal = roundToCents(fixedTotal);
  if (fixedTotal > income) {
    const scale = income / fixedTotal;
    fixedCategories.forEach(category => {
      category.amount = roundAllocation(category.amount * scale);
    });
    fixedTotal = roundToCents(fixedCategories.reduce((sum, category) => sum + category.amount, 0));
  }

  let remaining = roundToCents(Math.max(0, income - fixedTotal));
  const baseProfile = { ...(priorityProfiles[ledgerAssistantState.answers.priority] || priorityProfiles.stability) };
  const adjustmentProfile = leftoverAdjustments[ledgerAssistantState.answers.leftover] || leftoverAdjustments.balanced;
  const flexibleSelected = selectedExpenses.includes('fun');
  const weights = { ...baseProfile };

  Object.entries(adjustmentProfile).forEach(([key, delta]) => {
    weights[key] = Math.max(0, (weights[key] || 0) + delta);
  });

  if (!flexibleSelected) {
    weights.Fun = Math.max(weights.Fun || 0, ledgerAssistantState.answers.leftover === 'flex' ? 0.18 : 0.1);
  }

  const assetTitles = ['Investments', 'Emergency Savings', 'Short Term Savings', 'Longterm Savings'];
  const variableTitles = [];
  if (!flexibleSelected && (ledgerAssistantState.answers.leftover === 'flex' || ledgerAssistantState.answers.leftover === 'split')) {
    variableTitles.push('Fun');
  }

  const activeWeightedTitles = [...assetTitles, ...variableTitles].filter(title => (weights[title] || 0) > 0);
  let weightSum = activeWeightedTitles.reduce((sum, title) => sum + weights[title], 0);

  if (weightSum <= 0) {
    activeWeightedTitles.push('Emergency Savings');
    weights['Emergency Savings'] = 1;
    weightSum = 1;
  }

  const generatedCategories = activeWeightedTitles.map((title, index) => {
    if (index === activeWeightedTitles.length - 1) {
      return {
        id: `category-auto-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title,
        amount: roundToCents(remaining),
        isEditing: false,
      };
    }

    const amount = roundAllocation((remaining * weights[title]) / weightSum);
    remaining = roundToCents(Math.max(0, remaining - amount));
    weightSum -= weights[title];
    return {
      id: `category-auto-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title,
      amount,
      isEditing: false,
    };
  });

  const fixedExpenseCategories = fixedCategories.filter(category => category.bucket === 'fixed-expenses');
  const variableExpenseCategories = fixedCategories.filter(category => category.bucket === 'variable-expenses');

  const funGenerated = generatedCategories.find(category => category.title === 'Fun');
  if (funGenerated) {
    variableExpenseCategories.push(funGenerated);
  }

  const assetCategories = generatedCategories.filter(category => assetTitles.includes(category.title));

  let nextCategoryId = 1;
  const normalizeCategory = category => ({
    id: category.id || `category-${nextCategoryId++}`,
    title: category.title,
    amount: roundToCents(category.amount || 0),
    isEditing: false,
  });

  return {
    monthLabel: getCurrentMonthLabel(),
    monthlyIncome: income,
    sections: [
      { id: 'assets', title: 'Assets', categories: assetCategories.map(normalizeCategory).filter(category => category.amount > 0) },
      { id: 'fixed-expenses', title: 'Fixed Expenses', categories: fixedExpenseCategories.map(normalizeCategory).filter(category => category.amount > 0) },
      { id: 'variable-expenses', title: 'Variable Expenses', categories: variableExpenseCategories.map(normalizeCategory).filter(category => category.amount > 0) },
    ].filter(section => section.categories.length),
  };
}

function shouldAutoOpenLedgerAssistant() {
  if (!allocationState || ledgerAssistantState.hasAutoOpened || ledgerAssistantState.dismissed || ledgerAssistantState.hasBuiltDraft) {
    return false;
  }

  return getAllocatedTotal() === 0;
}

function openLedgerAssistant({ auto = false } = {}) {
  if (!ledgerAssistantModal || !allocationState) {
    return;
  }

  if (auto) {
    ledgerAssistantState.hasAutoOpened = true;
  }

  ledgerAssistantState.dismissed = false;
  setProfileFeedback(ledgerAssistantFeedback, '');
  renderLedgerAssistant();
  openModal(ledgerAssistantModal);
}

function closeLedgerAssistant() {
  ledgerAssistantState.dismissed = true;
  closeModal(ledgerAssistantModal);
}

function maybeOpenLedgerAssistant() {
  if (shouldAutoOpenLedgerAssistant()) {
    window.setTimeout(() => openLedgerAssistant({ auto: true }), 120);
  }
}

function handleLedgerAssistantChoice(choiceId, isMulti) {
  if (isMulti) {
    const currentValues = new Set(ledgerAssistantState.answers.expenses);
    if (currentValues.has(choiceId)) {
      currentValues.delete(choiceId);
    } else {
      currentValues.add(choiceId);
    }
    ledgerAssistantState.answers.expenses = [...currentValues];
    renderLedgerAssistant();
    return;
  }

  if (ledgerAssistantState.currentStep === 1) {
    ledgerAssistantState.answers.priority = choiceId;
  } else if (ledgerAssistantState.currentStep === 3) {
    ledgerAssistantState.answers.leftover = choiceId;
  }

  renderLedgerAssistant();
}

function handleLedgerAssistantBack() {
  if (ledgerAssistantState.currentStep <= 1 || ledgerAssistantState.isSubmitting) {
    return;
  }

  ledgerAssistantState.currentStep -= 1;
  setProfileFeedback(ledgerAssistantFeedback, '');
  renderLedgerAssistant();
}

function applyAssistantBudgetDraft() {
  if (!allocationState) {
    return;
  }

  ledgerAssistantState.isSubmitting = true;
  renderLedgerAssistant();

  window.setTimeout(() => {
    const draft = buildAssistantAllocationState(allocationState.monthlyIncome);
    allocationState = draft;
    ledgerAssistantState.isSubmitting = false;
    ledgerAssistantState.hasBuiltDraft = true;
    ledgerAssistantState.dismissed = true;
    renderAllocationScreen();
    renderLedgerAssistant();
    closeModal(ledgerAssistantModal);
  }, shouldReduceMotion() ? 0 : 220);
}

function handleLedgerAssistantNext() {
  if (!validateAssistantStep() || ledgerAssistantState.isSubmitting) {
    if (!validateAssistantStep()) {
      setProfileFeedback(ledgerAssistantFeedback, 'Choose an option before moving on.', 'error');
    }
    return;
  }

  setProfileFeedback(ledgerAssistantFeedback, '');

  if (ledgerAssistantState.currentStep < 3) {
    ledgerAssistantState.currentStep += 1;
    renderLedgerAssistant();
    return;
  }

  applyAssistantBudgetDraft();
}

function createAllocationState(monthlyIncome) {
  let nextCategoryId = 1;

  return {
    monthLabel: getCurrentMonthLabel(),
    monthlyIncome: roundToCents(monthlyIncome),
    sections: defaultAllocationSections.map(section => ({
      id: section.id,
      title: section.title,
      categories: section.categories.map(title => ({
        id: `category-${nextCategoryId++}`,
        title,
        amount: 0,
        isEditing: false
      }))
    }))
  };
}

function cloneExistingAllocationState(monthlyIncome) {
  if (!allocationState) {
    return createAllocationState(monthlyIncome);
  }

  return {
    monthLabel: getCurrentMonthLabel(),
    monthlyIncome: roundToCents(monthlyIncome),
    sections: allocationState.sections.map(section => ({
      id: section.id,
      title: section.title,
      categories: section.categories.map(category => ({
        id: category.id,
        title: normalizeCategoryTitle(category.title),
        amount: roundToCents(category.amount),
        isEditing: false
      }))
    }))
  };
}

function getAllocatedTotal() {
  if (!allocationState) {
    return 0;
  }

  return roundToCents(
    allocationState.sections.reduce(
      (sectionSum, section) => sectionSum + section.categories.reduce((sum, category) => sum + (Number(category.amount) || 0), 0),
      0
    )
  );
}

function getAllocationRemaining() {
  if (!allocationState) {
    return 0;
  }

  return roundToCents(allocationState.monthlyIncome - getAllocatedTotal());
}

function findCategoryById(categoryId) {
  if (!allocationState) {
    return null;
  }

  for (const section of allocationState.sections) {
    const category = section.categories.find(item => item.id === categoryId);
    if (category) {
      return { section, category };
    }
  }

  return null;
}

function renderAllocationSections() {
  if (!allocationSections || !allocationState) {
    return;
  }

  allocationSections.innerHTML = allocationState.sections
    .map(section => {
      const sectionTotal = roundToCents(section.categories.reduce((sum, category) => sum + category.amount, 0));

      return `
        <section class="allocation-section" data-section-id="${section.id}">
          <div class="allocation-section-head">
            <div>
              <h4>${section.title}</h4>
              <span>${formatCurrencyPrecise(sectionTotal)} allocated</span>
            </div>
            <button class="allocation-icon-button allocation-icon-button-add" type="button" data-action="add-category" data-section-id="${section.id}" aria-label="Add category to ${section.title}">
              <span aria-hidden="true">+</span>
            </button>
          </div>
          <div class="allocation-table allocation-tile-grid" role="list" aria-label="${section.title}">
            ${section.categories
              .map(category => `
                <article class="allocation-tile" role="listitem" data-category-id="${category.id}">
                  <div class="allocation-tile-top">
                    <input
                      class="allocation-title-input"
                      type="text"
                      value="${category.title.replace(/"/g, '&quot;')}"
                      ${category.isEditing ? '' : 'readonly'}
                      data-category-title="${category.id}"
                      aria-label="Category title"
                    />
                    <div class="allocation-row-actions">
                      <button class="allocation-icon-button allocation-icon-button-edit" type="button" data-action="edit-category" data-category-id="${category.id}" aria-label="${category.isEditing ? 'Save' : 'Edit'} ${category.title}">
                        <span aria-hidden="true">${category.isEditing ? '✓' : '✎'}</span>
                      </button>
                      <button class="allocation-icon-button allocation-icon-button-remove" type="button" data-action="remove-category" data-category-id="${category.id}" aria-label="Remove ${category.title}">
                        <span aria-hidden="true">−</span>
                      </button>
                    </div>
                  </div>
                  <label class="allocation-amount-cell">
                    <span class="sr-only">Allocation amount</span>
                    <input
                      class="allocation-amount-input"
                      type="text"
                      inputmode="decimal"
                      value="${toCurrencyInputValue(category.amount)}"
                      data-category-amount="${category.id}"
                      aria-label="Allocation amount for ${category.title}"
                    />
                  </label>
                </article>
              `)
              .join('')}
          </div>
        </section>
      `;
    })
    .join('');
}

function updateAllocationSummary() {
  if (!allocationState) {
    return;
  }

  const remaining = getAllocationRemaining();
  allocationMonth.textContent = allocationState.monthLabel;
  allocationIncome.textContent = formatCurrencyPrecise(allocationState.monthlyIncome);
  allocationRemaining.textContent = formatCurrencyPrecise(remaining);
  allocationRemaining.classList.toggle('allocation-negative', remaining < 0);
  allocationRemaining.classList.toggle('allocation-complete', remaining === 0);
  allocationProceedButton.disabled = !(allocationState.monthlyIncome > 0 && remaining === 0);
}

function renderAllocationScreen() {
  renderAllocationSections();
  updateAllocationSummary();
  if (ledgerAssistantTrigger) {
    ledgerAssistantTrigger.hidden = !allocationState;
  }
}

function initializeAllocationScreen() {
  const results = calculateResults();
  allocationState = cloneExistingAllocationState(results.monthlyNet);
  resetLedgerAssistantState();
  renderAllocationScreen();
}

function hydrateAllocationFromBudget(budget) {
  if (!budget) {
    allocationState = null;
    resetLedgerAssistantState();
    return;
  }

  allocationState = {
    monthLabel: budget.monthLabel || getCurrentMonthLabel(),
    monthlyIncome: roundToCents(budget.monthlyIncome || 0),
    sections: (budget.sections || []).map(section => ({
      id: section.id || section.sectionKey || `section-${Math.random().toString(36).slice(2, 8)}`,
      title: section.title,
      categories: (section.categories || [])
        .filter(category => !category.isArchived)
        .map(category => ({
          id: category.id,
          title: normalizeCategoryTitle(category.title),
          amount: roundToCents(category.amount || 0),
          isEditing: false
        }))
    }))
  };

  ledgerAssistantState.hasBuiltDraft = getAllocatedTotal() > 0;
}

function addCategoryToSection(sectionId) {
  const section = allocationState?.sections.find(item => item.id === sectionId);
  if (!section) {
    return;
  }

  const newCategory = {
    id: `category-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: 'New Category',
    amount: 0,
    isEditing: true
  };

  section.categories.push(newCategory);
  renderAllocationScreen();
}

function toggleCategoryEditing(categoryId) {
  const match = findCategoryById(categoryId);
  if (!match) {
    return;
  }

  const input = document.querySelector(`[data-category-title="${categoryId}"]`);
  if (!match.category.isEditing) {
    match.category.isEditing = true;
    renderAllocationScreen();
    const freshInput = document.querySelector(`[data-category-title="${categoryId}"]`);
    freshInput?.focus();
    freshInput?.select();
    return;
  }

  match.category.title = (input?.value || match.category.title).trim() || 'Untitled Category';
  match.category.isEditing = false;
  renderAllocationScreen();
}

function removeCategory(categoryId) {
  if (!allocationState) {
    return;
  }

  allocationState.sections.forEach(section => {
    section.categories = section.categories.filter(category => category.id !== categoryId);
  });

  renderAllocationScreen();
}

function updateCategoryAmount(categoryId, value) {
  const match = findCategoryById(categoryId);
  if (!match) {
    return;
  }

  match.category.amount = roundToCents(parseMoney(value));
  updateAllocationSummary();
}

function updateCategoryTitle(categoryId, value) {
  const match = findCategoryById(categoryId);
  if (!match) {
    return;
  }

  match.category.title = value;
}

function handleAllocationInteraction(event) {
  const actionTarget = event.target.closest('[data-action]');
  if (!actionTarget) {
    return;
  }

  const { action, sectionId, categoryId } = actionTarget.dataset;

  if (action === 'add-category') {
    addCategoryToSection(sectionId);
    return;
  }

  if (action === 'edit-category') {
    toggleCategoryEditing(categoryId);
    return;
  }

  if (action === 'remove-category') {
    removeCategory(categoryId);
  }
}

function handleAllocationInput(event) {
  const amountInput = event.target.closest('[data-category-amount]');
  if (amountInput) {
    updateCategoryAmount(amountInput.dataset.categoryAmount, amountInput.value);
    return;
  }

  const titleInput = event.target.closest('[data-category-title]');
  if (titleInput) {
    updateCategoryTitle(titleInput.dataset.categoryTitle, titleInput.value);
  }
}

function createDashboardStateFromAllocation() {
  if (!allocationState) {
    return null;
  }

  const previousTransactions = dashboardState?.transactions || [];
  const previousSpentByCategory = previousTransactions.reduce((accumulator, transaction) => {
    accumulator[transaction.categoryId] = roundToCents((accumulator[transaction.categoryId] || 0) + transaction.amount);
    return accumulator;
  }, {});

  return {
    monthLabel: allocationState.monthLabel,
    monthlyIncome: roundToCents(allocationState.monthlyIncome),
    sections: allocationState.sections.map(section => ({
      id: section.id,
      title: section.title,
      categories: section.categories.map(category => ({
        id: category.id,
        title: category.title,
        allocated: roundToCents(category.amount),
        spent: roundToCents(previousSpentByCategory[category.id] || 0)
      }))
    })),
    transactions: previousTransactions
      .filter(transaction => findCategoryInAllocation(transaction.categoryId))
      .map(transaction => {
        const categoryMatch = findCategoryInAllocation(transaction.categoryId);
        return {
          ...transaction,
          categoryTitle: categoryMatch?.category.title || transaction.categoryTitle,
          sectionTitle: categoryMatch?.section.title || transaction.sectionTitle
        };
      })
  };
}

function findCategoryInAllocation(categoryId) {
  if (!allocationState) {
    return null;
  }

  for (const section of allocationState.sections) {
    const category = section.categories.find(item => item.id === categoryId);
    if (category) {
      return { section, category };
    }
  }

  return null;
}

function getDashboardCategories() {
  if (!dashboardState) {
    return [];
  }

  return dashboardState.sections.flatMap(section =>
    section.categories.map(category => ({ ...category, sectionId: section.id, sectionTitle: section.title }))
  );
}

function normalizeReviewText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getSuggestedCategoryMatches(reviewItem, limit = 3) {
  if (!reviewItem) {
    return [];
  }

  const categories = getDashboardCategories().filter(category => category.allocated > 0 && category.title.trim());
  if (!categories.length) {
    return [];
  }

  const transaction = reviewItem.transaction || {};
  const haystack = normalizeReviewText([
    transaction.merchantName,
    transaction.name,
    transaction.institutionName,
    reviewItem.memo
  ].filter(Boolean).join(' '));

  const keywordGroups = [
    { titles: ['Groceries'], keywords: ['whole foods', 'trader joe', 'trader joes', 'kroger', 'publix', 'aldi', 'costco', 'instacart', 'market', 'grocery'] },
    { titles: ['Gas'], keywords: ['shell', 'chevron', 'exxon', 'bp', 'sunoco', 'marathon', 'speedway', 'fuel', 'gas station', '7 eleven fuel'] },
    { titles: ['Subscriptions'], keywords: ['netflix', 'spotify', 'apple com bill', 'itunes', 'google', 'youtube', 'hulu', 'disney', 'amazon prime', 'adobe', 'subscription', 'recurring'] },
    { titles: ['Rent'], keywords: ['rent', 'landlord', 'property management', 'apartments', 'lease'] },
    { titles: ['Car Payment'], keywords: ['car payment', 'auto loan', 'ford credit', 'toyota financial', 'honda financial', 'ally auto', 'gm financial'] },
    { titles: ['Car Insurance'], keywords: ['geico', 'progressive', 'allstate', 'state farm', 'insurance premium', 'car insurance'] },
    { titles: ['Student Loans'], keywords: ['student loan', 'nelnet', 'mohela', 'sallie mae', 'aidvantage', 'loan servicer'] },
    { titles: ['Investments'], keywords: ['vanguard', 'fidelity', 'schwab', 'etrade', 'betterment', 'robinhood', 'brokerage', 'investment'] },
    { titles: ['Charitable Donations'], keywords: ['donation', 'charity', 'church', 'tithe', 'fundraiser'] },
    { titles: ['Fun'], keywords: ['restaurant', 'bar', 'cinema', 'movie', 'ticket', 'entertainment', 'concert', 'doordash', 'uber eats', 'grubhub'] }
  ];

  const scored = categories.map(category => {
    const normalizedTitle = normalizeReviewText(category.title);
    let score = 0;

    keywordGroups.forEach(group => {
      const titleMatch = group.titles.some(title => normalizeReviewText(title) === normalizedTitle);
      if (!titleMatch) {
        return;
      }
      group.keywords.forEach(keyword => {
        if (haystack.includes(keyword)) {
          score += 3;
        }
      });
    });

    if (!score && haystack) {
      const titleTokens = normalizedTitle.split(' ').filter(Boolean);
      titleTokens.forEach(token => {
        if (token.length >= 4 && haystack.includes(token)) {
          score += 1;
        }
      });
    }

    return { category, score };
  })
    .filter(entry => entry.score > 0)
    .sort((left, right) => right.score - left.score || right.category.allocated - left.category.allocated)
    .slice(0, limit);

  if (scored.length) {
    return scored;
  }

  if (reviewItem.preview) {
    const previewSuggested = categories.find(category => normalizeReviewText(category.title) === normalizeReviewText(reviewItem.suggestedCategoryTitle));
    if (previewSuggested) {
      return [{ category: previewSuggested, score: 1 }];
    }
  }

  return categories
    .slice()
    .sort((left, right) => right.allocated - left.allocated)
    .slice(0, Math.min(limit, categories.length))
    .map(category => ({ category, score: 0 }));
}

function findDashboardCategory(categoryId) {
  if (!dashboardState) {
    return null;
  }

  for (const section of dashboardState.sections) {
    const category = section.categories.find(item => item.id === categoryId);
    if (category) {
      return { section, category };
    }
  }

  return null;
}

function getDashboardAllocatedTotal() {
  if (!dashboardState) {
    return 0;
  }

  return roundToCents(
    dashboardState.sections.reduce(
      (sectionSum, section) => sectionSum + section.categories.reduce((sum, category) => sum + category.allocated, 0),
      0
    )
  );
}

function recalculateDashboardCategorySpending() {
  if (!dashboardState) {
    return;
  }

  dashboardState.sections.forEach(section => {
    section.categories.forEach(category => {
      category.spent = 0;
    });
  });

  dashboardState.transactions.forEach(transaction => {
    const match = findDashboardCategory(transaction.categoryId);
    if (match) {
      match.category.spent = roundToCents(match.category.spent + transaction.amount);
      transaction.categoryTitle = match.category.title;
      transaction.sectionTitle = match.section.title;
    }
  });
}

function findDashboardTransaction(transactionId) {
  if (!dashboardState) {
    return null;
  }

  return dashboardState.transactions.find(transaction => transaction.id === transactionId) || null;
}

function getDashboardSpentTotal() {
  if (!dashboardState) {
    return 0;
  }

  return roundToCents(
    dashboardState.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  );
}

function getDashboardRemainingTotal() {
  if (!dashboardState) {
    return 0;
  }

  return roundToCents(getDashboardAllocatedTotal() - getDashboardSpentTotal());
}

function getRemainingPercent(category) {
  if (!category.allocated) {
    return 100;
  }

  return (category.allocated - category.spent) / category.allocated * 100;
}

function getProgressTone(category) {
  const remainingPercent = getRemainingPercent(category);

  if (remainingPercent <= 19) {
    return 'danger';
  }

  if (remainingPercent <= 70) {
    return 'warning';
  }

  return 'healthy';
}

function getDashboardStatusCopy(remaining) {
  if (remaining < 0) {
    return 'Over budget';
  }

  if (remaining === 0) {
    return 'Fully used';
  }

  return 'On track';
}

function renderTransactionCategoryOptions() {
  if (!transactionCategorySelect) {
    return;
  }

  const categories = getDashboardCategories()
    .filter(category => category.allocated > 0 && category.title.trim());
  transactionCategorySelect.innerHTML = categories.length
    ? categories
        .map(category => `<option value="${category.id}">${category.title}</option>`)
        .join('')
    : '<option value="">No categories available</option>';
}

function renderDashboardSummary() {
  if (!dashboardState) {
    return;
  }

  const allocated = getDashboardAllocatedTotal();
  const spent = getDashboardSpentTotal();
  const remaining = getDashboardRemainingTotal();

  dashboardMonthTitle.textContent = dashboardState.monthLabel;
  dashboardTotalAllocated.textContent = formatCurrencyPrecise(allocated);
  dashboardTotalSpent.textContent = formatCurrencyPrecise(spent);
  dashboardLeftToSpend.textContent = formatCurrencyPrecise(remaining);
  dashboardStatusPill.textContent = getDashboardStatusCopy(remaining);
  dashboardStatusPill.classList.toggle('status-pill-danger', remaining < 0);
}

function renderTrackingSections() {
  if (!trackingSections || !dashboardState) {
    return;
  }

  trackingSections.innerHTML = dashboardState.sections
    .map(section => {
      const trackedCategories = section.categories.filter(category => category.allocated > 0);
      const sectionSpent = roundToCents(trackedCategories.reduce((sum, category) => sum + category.spent, 0));
      const sectionAllocated = roundToCents(trackedCategories.reduce((sum, category) => sum + category.allocated, 0));

      if (!trackedCategories.length) {
        return '';
      }

      return `
        <section class="tracking-group" aria-label="${section.title}">
          <div class="tracking-group-head">
            <div>
              <h4>${section.title}</h4>
              <span>${formatCurrencyPrecise(sectionSpent)} spent of ${formatCurrencyPrecise(sectionAllocated)}</span>
            </div>
          </div>
          <div class="progress-list">
            ${trackedCategories
              .map(category => {
                const spent = roundToCents(category.spent);
                const remaining = roundToCents(category.allocated - category.spent);
                const remainingPercent = getRemainingPercent(category);
                const remainingBarWidth = Math.min(100, Math.max(0, remainingPercent));
                const tone = getProgressTone(category);
                const overBudget = remaining < 0;
                const isHighlighted = selectedDashboardCategoryId === category.id;

                return `
                  <div
                    class="progress-item progress-item-${tone}${overBudget ? ' progress-item-overspent' : ''}${isHighlighted ? ' progress-item-highlighted' : ''}"
                    data-tracking-category-id="${category.id}"
                  >
                    <div class="progress-copy">
                      <div>
                        <strong>${category.title}</strong>
                        <span>${formatCurrencyPrecise(spent)} / ${formatCurrencyPrecise(category.allocated)}</span>
                      </div>
                      <em>${overBudget ? `${formatCurrencyPrecise(Math.abs(remaining))} over` : `${Math.max(0, roundToCents(remainingPercent))}% left`}</em>
                    </div>
                    <div class="bar" aria-hidden="true"><span style="width: ${remainingBarWidth}%"></span></div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </section>
      `;
    })
    .join('');
}

function renderTransactionHistory() {
  if (!transactionHistory || !dashboardState) {
    return;
  }

  if (!dashboardState.transactions.length) {
    transactionHistory.innerHTML = `
      <div class="history-empty">
        <strong>No spending logged yet.</strong>
        <span>Your entries will show up here as soon as you add them.</span>
      </div>
    `;
    return;
  }

  transactionHistory.innerHTML = dashboardState.transactions
    .slice()
    .reverse()
    .map(transaction => `
      <article class="history-item">
        <div class="history-item-copy">
          <strong>${transaction.categoryTitle}</strong>
          <span>${formatHistoryDate(transaction.date)}${transaction.memo ? ` · ${transaction.memo}` : ''}</span>
        </div>
        <div class="history-item-side">
          <strong>${formatCurrencyPrecise(transaction.amount)}</strong>
          <div class="history-item-actions">
            <button class="button button-secondary history-item-button" type="button" data-edit-transaction="${transaction.id}">Edit</button>
            <button class="button button-secondary history-item-button history-item-button-danger" type="button" data-remove-transaction="${transaction.id}">Remove</button>
          </div>
        </div>
      </article>
    `)
    .join('');
}

function renderDashboard() {
  if (!dashboardState) {
    return;
  }

  renderDashboardSummary();
  renderPlaidSection();
  renderReviewQueue();
  renderTransactionCategoryOptions();
  renderTrackingSections();
  renderTransactionHistory();
}

function isPremiumActive() {
  if (profileState.premium?.entitlement) {
    return Boolean(profileState.premium.entitlement.premiumAccess && profileState.premium.entitlement.bankSyncEnabled);
  }
  if (plaidState.entitlement) {
    return Boolean(plaidState.entitlement.premiumAccess && plaidState.entitlement.bankSyncEnabled);
  }
  if (plaidState.summary) {
    return !Boolean(plaidState.summary.premiumRequired);
  }
  return false;
}

function hasPaidPremiumSubscription() {
  return Boolean(profileState.premium?.subscription && isPremiumActive());
}

function openPremiumBankModal() {
  if (!premiumBankModal) {
    return;
  }

  openModal(premiumBankModal);
}

function closePremiumBankModal() {
  if (!premiumBankModal) {
    return;
  }

  closeModal(premiumBankModal);
}

function openPremiumBillingExperience(message = '') {
  if (!currentUser) {
    return;
  }

  openProfileModal('billing');
  if (message) {
    setProfileFeedback(profileBillingFeedback, message, 'success');
  }
}

async function beginStripeCheckout() {
  try {
    setProfileFeedback(profileBillingFeedback, 'Opening secure checkout…');
    const payload = await apiRequest('/api/stripe/checkout-session', { method: 'POST' });
    if (!payload.url) {
      throw new Error('Stripe checkout URL was missing.');
    }
    window.location.href = payload.url;
  } catch (error) {
    setProfileFeedback(profileBillingFeedback, error.message || 'We could not start checkout right now.', 'error');
  }
}

async function openStripeBillingPortal() {
  try {
    setProfileFeedback(profileBillingFeedback, 'Opening billing portal…');
    const payload = await apiRequest('/api/stripe/billing-portal', { method: 'POST' });
    if (!payload.url) {
      throw new Error('Stripe billing portal URL was missing.');
    }
    window.location.href = payload.url;
  } catch (error) {
    setProfileFeedback(profileBillingFeedback, error.message || 'We could not open billing right now.', 'error');
  }
}

async function handleStripeReturnState() {
  const params = new URLSearchParams(window.location.search);
  const stripeState = params.get('stripe');
  const sessionId = params.get('session_id');
  const billingState = params.get('billing');

  if (stripeState === 'success' && sessionId && currentUser) {
    try {
      await apiRequest(`/api/stripe/checkout-session-status?session_id=${encodeURIComponent(sessionId)}`);
      await loadPremiumStatus();
      await loadPlaidStatus({ silent: true });
      renderPlaidSection();
      renderProfileBillingPanel();
      openProfileModal('billing');
      setProfileFeedback(profileBillingFeedback, 'Premium is active. Bank sync is now unlocked.', 'success');
    } catch (error) {
      openProfileModal('billing');
      setProfileFeedback(profileBillingFeedback, error.message || 'Payment went through, but we could not confirm Premium yet.', 'error');
    } finally {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    return;
  }

  if (stripeState === 'cancelled' && currentUser) {
    openProfileModal('billing');
    setProfileFeedback(profileBillingFeedback, 'Checkout was canceled. You can try again any time.', 'error');
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  if (billingState === 'returned' && currentUser) {
    await loadPremiumStatus();
    renderProfileBillingPanel();
    openProfileModal('billing');
    setProfileFeedback(profileBillingFeedback, 'Billing details refreshed.', 'success');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function flattenPlaidAccounts(items = []) {
  return items.flatMap(item =>
    (item.accounts || [])
      .filter(account => account.isActive)
      .map(account => ({
        ...account,
        institutionName: item.institutionName || 'Connected institution',
        itemStatus: item.status
      }))
  );
}

function setPlaidFeedback(message = '', tone = 'neutral') {
  if (!plaidFeedback) {
    return;
  }

  plaidFeedback.textContent = message;
  plaidFeedback.dataset.tone = tone;
}

function renderPlaidSection() {
  if (!plaidSummaryRow || !plaidConnectedList || !plaidConnectButton || !plaidCard || !plaidCardBody || !plaidCollapseButton) {
    return;
  }

  const premiumActive = isPremiumActive();
  const summary = plaidState.summary;
  const accounts = flattenPlaidAccounts(plaidState.items);
  const activeConnected = summary?.activeConnectedAccounts ?? accounts.length;
  const maxLinked = summary?.maxLinkedAccounts ?? 4;
  const canLinkMore = summary ? Boolean(summary.canLinkMoreAccounts) : true;
  const toggleActive = premiumActive && activeConnected > 0;

  plaidCard.dataset.premiumState = premiumActive ? 'premium' : 'free';
  plaidCard.classList.toggle('plaid-card-expanded', plaidCardExpanded);
  plaidCollapseButton.setAttribute('aria-expanded', String(plaidCardExpanded));
  plaidCardBody.hidden = !plaidCardExpanded;
  plaidConnectButton.disabled = plaidState.loading || plaidState.connecting;
  plaidConnectButton.classList.toggle('bank-sync-toggle-active', toggleActive);
  plaidConnectButton.setAttribute('aria-checked', String(toggleActive));

  if (!premiumActive) {
    setPlaidFeedback('', 'neutral');
    plaidSummaryRow.hidden = true;
    plaidConnectedList.hidden = true;
    plaidFeedback.hidden = true;
    plaidConnectButton.setAttribute('aria-label', 'Learn about Premium bank sync');
    return;
  }

  plaidSummaryRow.hidden = false;
  plaidConnectedList.hidden = false;
  plaidFeedback.hidden = false;
  plaidConnectButton.setAttribute('aria-label', activeConnected > 0 ? 'Manage connected bank accounts' : 'Connect a bank account');

  const progressPercent = maxLinked ? Math.min(100, Math.max(0, (activeConnected / maxLinked) * 100)) : 0;

  plaidSummaryRow.innerHTML = `
    <div class="plaid-progress">
      <div class="plaid-progress-track" aria-hidden="true">
        <span class="plaid-progress-fill" style="width:${progressPercent}%"></span>
      </div>
      <div class="plaid-progress-copy">
        <span>You can connect up to 4 bank accounts to track spending from.</span>
        <strong>${activeConnected} of ${maxLinked} connected</strong>
      </div>
    </div>
  `;

  if (plaidState.error) {
    setPlaidFeedback(plaidState.error, 'error');
  } else if (plaidState.success) {
    setPlaidFeedback(plaidState.success, 'success');
  } else if (plaidState.loading) {
    setPlaidFeedback('Checking your bank sync status…', 'neutral');
  } else if (accounts.length) {
    setPlaidFeedback('Use Change on any connected account if you want to swap it out.', 'neutral');
  } else {
    setPlaidFeedback('Toggle on to connect a bank and start pulling in eligible activity for review.', 'neutral');
  }

  if (!accounts.length) {
    plaidConnectedList.innerHTML = `
      <div class="plaid-empty-state">
        <strong>No bank accounts connected yet.</strong>
        <span>When you connect one, your linked accounts will show up here.</span>
      </div>
    `;
    renderProfileBankingPanel();
    return;
  }

  plaidConnectedList.innerHTML = accounts
    .map(account => `
      <article class="plaid-account-tile">
        <div class="plaid-account-copy">
          <strong>${account.name || account.officialName || 'Connected account'}</strong>
          <span>${account.institutionName}${account.mask ? ` •••• ${account.mask}` : ''}</span>
        </div>
        <div class="plaid-account-meta">
          <span>${account.subtype || account.type || 'Account'}</span>
          <button class="plaid-account-remove" type="button" data-disconnect-plaid-account="${account.id}" aria-label="Disconnect ${account.name || account.officialName || 'connected account'}">
            Change
          </button>
        </div>
      </article>
    `)
    .join('');
  renderProfileBankingPanel();
}

function handlePlaidDashboardToggle() {
  if (!currentUser) {
    openModal(authModal);
    return;
  }

  if (!isPremiumActive()) {
    openPremiumBankModal();
    return;
  }

  startPlaidLinkFlow();
}

function findPlaidAccountById(accountId) {
  return flattenPlaidAccounts(plaidState.items).find(account => account.id === accountId) || null;
}

function openPlaidDisconnectModal(accountId) {
  const account = findPlaidAccountById(accountId);
  if (!account) {
    return;
  }

  plaidDisconnectState.accountId = account.id;
  plaidDisconnectState.accountName = account.name || account.officialName || 'this connected account';
  plaidDisconnectState.saving = false;

  if (plaidDisconnectCopy) {
    plaidDisconnectCopy.textContent = `We’ll remove ${plaidDisconnectState.accountName} first so you can connect a different account right after.`;
  }
  if (plaidDisconnectFeedback) {
    plaidDisconnectFeedback.textContent = '';
  }
  if (plaidDisconnectConfirm) {
    plaidDisconnectConfirm.disabled = false;
    plaidDisconnectConfirm.textContent = 'Remove account';
  }
  if (plaidDisconnectCancel) {
    plaidDisconnectCancel.disabled = false;
  }
  if (plaidDisconnectClose) {
    plaidDisconnectClose.disabled = false;
  }

  openModal(plaidDisconnectModal);
}

function closePlaidDisconnectModal() {
  if (plaidDisconnectState.saving) {
    return;
  }

  plaidDisconnectState.accountId = null;
  plaidDisconnectState.accountName = '';
  if (plaidDisconnectFeedback) {
    plaidDisconnectFeedback.textContent = '';
  }
  closeModal(plaidDisconnectModal);
}

async function disconnectPlaidAccount() {
  if (!plaidDisconnectState.accountId || plaidDisconnectState.saving) {
    return;
  }

  plaidState.error = '';
  plaidState.success = '';
  plaidDisconnectState.saving = true;
  if (plaidDisconnectFeedback) {
    plaidDisconnectFeedback.textContent = '';
  }
  if (plaidDisconnectConfirm) {
    plaidDisconnectConfirm.disabled = true;
    plaidDisconnectConfirm.textContent = 'Removing...';
  }
  if (plaidDisconnectCancel) {
    plaidDisconnectCancel.disabled = true;
  }
  if (plaidDisconnectClose) {
    plaidDisconnectClose.disabled = true;
  }
  renderPlaidSection();

  try {
    const payload = await apiRequest(`/api/plaid/accounts/${plaidDisconnectState.accountId}/disconnect`, { method: 'POST' });
    plaidState.summary = payload.summary || plaidState.summary;
    plaidState.items = payload.items || plaidState.items;
    plaidState.success = payload.message || 'Connected bank account removed. You can add another one now.';
    closeModal(plaidDisconnectModal);
    plaidDisconnectState.accountId = null;
    plaidDisconnectState.accountName = '';
    renderPlaidSection();
  } catch (error) {
    if (plaidDisconnectFeedback) {
      plaidDisconnectFeedback.textContent = error.message || 'We could not update that connected account.';
    }
    renderPlaidSection();
  } finally {
    plaidDisconnectState.saving = false;
    if (plaidDisconnectConfirm) {
      plaidDisconnectConfirm.disabled = false;
      plaidDisconnectConfirm.textContent = 'Remove account';
    }
    if (plaidDisconnectCancel) {
      plaidDisconnectCancel.disabled = false;
    }
    if (plaidDisconnectClose) {
      plaidDisconnectClose.disabled = false;
    }
  }
}

function setReviewFeedback(message = '', tone = 'neutral') {
  if (!reviewFeedback) {
    return;
  }

  reviewFeedback.textContent = message;
  reviewFeedback.dataset.tone = tone;
}

function getActiveReviewItem() {
  if (reviewState.activeReviewId === 'instant-preview') {
    return {
      id: 'instant-preview',
      status: 'preview',
      memo: 'Whole Foods',
      budgetCategoryId: reviewState.selectedCategoryId,
      preview: true,
      suggestedCategoryTitle: 'Groceries',
      transaction: {
        id: 'instant-preview-transaction',
        plaidTransactionId: null,
        name: 'Whole Foods Market',
        merchantName: 'Whole Foods',
        amount: 42.18,
        date: new Date().toISOString().split('T')[0],
        pending: true,
        paymentChannel: 'in store',
        accountId: null,
        accountName: 'Checking',
        accountMask: '4242',
        accountSubtype: 'checking',
        institutionName: 'Connected bank',
      },
    };
  }
  return reviewState.items.find(item => item.id === reviewState.activeReviewId) || null;
}

function renderReviewQueue() {
  if (!reviewSummaryRow || !reviewQueueList || !reviewRefreshButton || !reviewCard) {
    return;
  }

  const premiumActive = isPremiumActive();
  reviewCard.hidden = !premiumActive;
  if (!premiumActive) {
    return;
  }

  const queueCount = reviewState.summary?.queueCount ?? reviewState.items.length;
  reviewRefreshButton.disabled = reviewState.syncing || reviewState.loading || !currentUser;
  reviewRefreshButton.textContent = reviewState.syncing ? 'Refreshing...' : 'Refresh activity';

  if (reviewLivePill) {
    reviewLivePill.hidden = false;
    reviewLivePill.dataset.state = queueCount > 0 ? 'active' : 'idle';
    reviewLivePill.textContent = queueCount > 0
      ? `${queueCount} waiting`
      : 'All caught up';
  }

  reviewSummaryRow.innerHTML = `
    <div class="review-stat">
      <span>Ready to review</span>
      <strong>${queueCount}</strong>
    </div>
    <div class="review-stat">
      <span>Month</span>
      <strong>${reviewState.summary?.monthLabel || dashboardState?.monthLabel || 'Current'}</strong>
    </div>
  `;

  if (reviewState.error) {
    setReviewFeedback(reviewState.error, 'error');
  } else if (reviewState.success) {
    setReviewFeedback(reviewState.success, 'success');
  } else if (reviewState.loading) {
    setReviewFeedback('Loading bank activity review queue…', 'neutral');
  } else if (queueCount > 0) {
    setReviewFeedback('Open any new debit and assign it to the category that fits best.', 'neutral');
  } else {
    setReviewFeedback('You are caught up. New posted debits will show up here for review.', 'neutral');
  }

  if (!reviewState.items.length) {
    reviewQueueList.innerHTML = `
      <div class="review-empty-state">
        <strong>No uncategorized bank debits right now.</strong>
        <span>Refresh activity after new purchases post to your connected accounts.</span>
      </div>
    `;
    tryOpenReviewDeepLink();
    return;
  }

  reviewQueueList.innerHTML = reviewState.items
    .map(item => {
      const transaction = item.transaction;
      return `
        <article class="review-item">
          <div class="review-item-copy">
            <strong>${transaction.merchantName || transaction.name}${transaction.pending ? ' <span class="review-pending-badge">Pending</span>' : ''}</strong>
            <span>${formatHistoryDate(transaction.date)} · ${transaction.institutionName || 'Connected bank'}${transaction.accountMask ? ` •••• ${transaction.accountMask}` : ''}</span>
          </div>
          <div class="review-item-side">
            <strong>${formatCurrencyPrecise(transaction.amount)}</strong>
            <div class="review-item-actions">
              <button class="button button-primary review-item-button" type="button" data-open-review-sheet="${item.id}">
                Choose category
              </button>
              <button class="button button-secondary review-item-button review-item-remove-button" type="button" data-remove-review="${item.id}">
                Remove
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  tryOpenReviewDeepLink();
}

function renderReviewSheet() {
  if (!reviewSheetTransaction || !reviewSheetCategoryList || !reviewSheetMemo || !reviewSheetCopy || !reviewSheetFeedback || !reviewSheetCategoryToggle || !reviewSheetCategoryPanel) {
    return;
  }

  const activeReview = getActiveReviewItem();
  if (!activeReview) {
    reviewSheetTransaction.innerHTML = '';
    reviewSheetCategoryList.innerHTML = '';
    reviewSheetCategoryToggle.hidden = true;
    reviewSheetCategoryPanel.hidden = false;
    reviewSheetMemo.value = '';
    reviewSheetFeedback.textContent = '';
    reviewSheetModal?.removeAttribute('data-preview');
    reviewSheetCard?.removeAttribute('data-preview');
    return;
  }

  const transaction = activeReview.transaction;
  const isPreview = Boolean(activeReview.preview);
  reviewSheetModal?.setAttribute('data-preview', isPreview ? 'true' : 'false');
  reviewSheetCard?.setAttribute('data-preview', isPreview ? 'true' : 'false');
  reviewSheetCopy.textContent = isPreview
    ? 'Pick the category you would tap when a new bank purchase alert comes in.'
    : transaction.pending
      ? `${formatCurrencyPrecise(transaction.amount)} from ${transaction.merchantName || transaction.name} is still pending, so the amount or merchant may update when it posts.`
      : `${formatCurrencyPrecise(transaction.amount)} from ${transaction.merchantName || transaction.name} on ${formatHistoryDate(transaction.date)}.`;
  reviewSheetTransaction.innerHTML = isPreview
    ? `
      <div class="review-sheet-transaction-copy review-sheet-transaction-copy-preview">
        <span class="review-sheet-transaction-label">Instant alert preview</span>
        <strong>${transaction.merchantName || transaction.name}</strong>
        <span>${transaction.institutionName || 'Connected bank'}${transaction.accountName ? ` · ${transaction.accountName}` : ''}</span>
      </div>
      <div class="review-sheet-transaction-amount-wrap">
        ${transaction.pending ? '<span class="review-pending-badge">Pending</span>' : ''}
        <strong class="review-sheet-transaction-amount">${formatCurrencyPrecise(transaction.amount)}</strong>
      </div>
    `
    : `
      <div class="review-sheet-transaction-copy">
        <strong>${transaction.merchantName || transaction.name}${transaction.pending ? ' <span class="review-pending-badge">Pending</span>' : ''}</strong>
        <span>${transaction.institutionName || 'Connected bank'}${transaction.accountName ? ` · ${transaction.accountName}` : ''}</span>
      </div>
      <strong class="review-sheet-transaction-amount">${formatCurrencyPrecise(transaction.amount)}</strong>
    `;

  const categories = getDashboardCategories().filter(category => category.allocated > 0 && category.title.trim());

  reviewSheetCategoryToggle.hidden = !isPreview;
  reviewSheetCategoryToggle.setAttribute('aria-expanded', String(!isPreview || reviewSheetCategoriesExpanded));
  reviewSheetCategoryToggle.textContent = !isPreview
    ? 'All categories'
    : reviewSheetCategoriesExpanded
      ? 'Hide all categories'
      : 'More categories';
  reviewSheetCategoryPanel.hidden = isPreview ? !reviewSheetCategoriesExpanded : false;

  reviewSheetCategoryList.innerHTML = categories
    .map(category => `
      <button
        class="review-category-option${reviewState.selectedCategoryId === category.id ? ' review-category-option-active' : ''}"
        type="button"
        role="radio"
        aria-checked="${reviewState.selectedCategoryId === category.id ? 'true' : 'false'}"
        data-review-category="${category.id}"
      >
        <span class="review-category-copy">
          <strong>${category.title}</strong>
          <span>${formatCurrencyPrecise(category.allocated)}</span>
        </span>
      </button>
    `)
    .join('');

  reviewSheetMemo.value = activeReview.memo || transaction.merchantName || transaction.name || '';
  reviewSheetFeedback.textContent = '';
  if (reviewSheetDismiss) {
    reviewSheetDismiss.textContent = activeReview.preview ? 'Dismiss preview' : (activeReview.transaction?.pending ? 'Remove pending' : 'Remove from review');
  }
  if (reviewSheetSave) {
    reviewSheetSave.textContent = activeReview.preview ? 'Save preview' : 'Save to category';
  }
}

function openReviewSheet(reviewId) {
  reviewState.activeReviewId = reviewId;
  reviewSheetCategoriesExpanded = true;
  const activeReview = getActiveReviewItem();
  const firstCategoryId = getDashboardCategories().find(category => category.allocated > 0 && category.title.trim())?.id || null;
  reviewState.selectedCategoryId = activeReview?.budgetCategoryId || firstCategoryId;
  renderReviewSheet();
  openModal(reviewSheetModal);
}

function openInstantAlertPreviewSheet(preferredCategoryTitle = null) {
  reviewSheetCategoriesExpanded = false;
  const normalizedPreferredTitle = normalizeReviewText(preferredCategoryTitle || '');
  const suggestedCategory = getDashboardCategories().find(category => normalizeReviewText(category.title) === normalizedPreferredTitle && category.allocated > 0)
    || getDashboardCategories().find(category => category.title === 'Groceries' && category.allocated > 0)
    || getDashboardCategories().find(category => category.allocated > 0 && category.title.trim())
    || null;
  reviewState.activeReviewId = 'instant-preview';
  reviewState.selectedCategoryId = suggestedCategory?.id || null;
  renderReviewSheet();
  openModal(reviewSheetModal);
}

function closeReviewSheet() {
  reviewState.activeReviewId = null;
  reviewState.selectedCategoryId = null;
  if (reviewSheetFeedback) {
    reviewSheetFeedback.textContent = '';
  }
  closeModal(reviewSheetModal);
}

function setAddSpendingExpanded(expanded) {
  addSpendingExpanded = expanded;
  if (!addSpendingToggle || !addSpendingPanel) {
    return;
  }

  addSpendingToggle.setAttribute('aria-expanded', String(expanded));
  addSpendingToggle.classList.toggle('add-spending-pill-active', expanded);
  addSpendingPanel.hidden = !expanded;

  if (expanded) {
    window.requestAnimationFrame(() => {
      transactionAmountInput?.focus();
    });
  }
}

async function loadPlaidStatus({ silent = false } = {}) {
  if (!currentUser) {
    plaidState = {
      loading: false,
      connecting: false,
      entitlement: null,
      summary: null,
      items: [],
      error: '',
      success: ''
    };
    renderPlaidSection();
    return null;
  }

  plaidState.loading = true;
  if (!silent) {
    plaidState.error = '';
  }
  renderPlaidSection();

  try {
    const payload = await apiRequest('/api/plaid/status');
    plaidState = {
      ...plaidState,
      loading: false,
      entitlement: payload.entitlement || null,
      summary: payload.summary || null,
      items: payload.items || [],
      error: ''
    };
    renderPlaidSection();
    return payload;
  } catch (error) {
    plaidState.loading = false;
    if (error.status === 401) {
      plaidState.entitlement = null;
      plaidState.summary = null;
      plaidState.items = [];
      plaidState.error = '';
    } else {
      plaidState.error = error.message || 'We could not load your bank sync status.';
    }
    renderPlaidSection();
    return null;
  }
}

async function loadPlaidReviewQueue({ silent = false } = {}) {
  if (!currentUser || !dashboardState) {
    reviewState = {
      loading: false,
      hasLoaded: false,
      syncing: false,
      saving: false,
      items: [],
      summary: { queueCount: 0, monthLabel: null },
      error: '',
      success: '',
      activeReviewId: null,
      selectedCategoryId: null
    };
    renderReviewQueue();
    return null;
  }

  reviewState.loading = true;
  if (!silent) {
    reviewState.error = '';
  }
  renderReviewQueue();

  try {
    const payload = await apiRequest('/api/plaid/review-queue');
    reviewState = {
      ...reviewState,
      loading: false,
      hasLoaded: true,
      items: payload.items || [],
      summary: payload.summary || { queueCount: 0, monthLabel: dashboardState.monthLabel },
      error: ''
    };
    renderReviewQueue();
    return payload;
  } catch (error) {
    reviewState.loading = false;
    reviewState.hasLoaded = true;
    reviewState.error = error.status === 401 ? '' : (error.message || 'We could not load bank activity to review.');
    renderReviewQueue();
    return null;
  }
}

async function syncPlaidTransactions() {
  if (!currentUser || reviewState.syncing) {
    return;
  }

  reviewState.syncing = true;
  reviewState.error = '';
  reviewState.success = '';
  renderReviewQueue();

  try {
    const payload = await apiRequest('/api/plaid/sync-transactions', { method: 'POST' });
    reviewState.syncing = false;
    reviewState.hasLoaded = true;
    reviewState.items = payload.items || [];
    reviewState.summary = payload.summary || { queueCount: reviewState.items.length, monthLabel: dashboardState?.monthLabel || null };
    reviewState.success = payload.message || 'Bank activity refreshed.';
    renderReviewQueue();
  } catch (error) {
    reviewState.syncing = false;
    reviewState.hasLoaded = true;
    reviewState.error = error.message || 'We could not refresh bank activity right now.';
    renderReviewQueue();
  }
}

async function approveActiveReview() {
  const activeReview = getActiveReviewItem();
  if (!activeReview || !reviewState.selectedCategoryId) {
    if (reviewSheetFeedback) {
      reviewSheetFeedback.textContent = 'Choose a category before saving this transaction.';
    }
    return;
  }

  if (activeReview.preview) {
    reviewState.success = 'Preview saved. Real instant alerts will work like this when new bank purchases come in.';
    renderReviewQueue();
    closeReviewSheet();
    return;
  }

  reviewState.saving = true;
  if (reviewSheetSave) {
    reviewSheetSave.disabled = true;
    reviewSheetSave.textContent = 'Saving...';
  }
  if (reviewSheetDismiss) {
    reviewSheetDismiss.disabled = true;
  }
  if (reviewSheetCancel) {
    reviewSheetCancel.disabled = true;
  }

  try {
    const payload = await apiRequest(`/api/plaid/reviews/${activeReview.id}/approve`, {
      method: 'POST',
      body: {
        categoryId: reviewState.selectedCategoryId,
        memo: reviewSheetMemo?.value.trim() || ''
      }
    });

    if (payload.monthlyBudget) {
      hydrateAllocationFromBudget(payload.monthlyBudget);
      hydrateDashboardFromBudget(payload.monthlyBudget);
    }
    reviewState.items = payload.reviewQueue?.items || [];
    reviewState.summary = payload.reviewQueue?.summary || { queueCount: reviewState.items.length, monthLabel: dashboardState?.monthLabel || null };
    reviewState.success = payload.message || 'Bank transaction added to your budget.';
    reviewState.error = '';
    renderDashboard();
    closeReviewSheet();
  } catch (error) {
    if (reviewSheetFeedback) {
      reviewSheetFeedback.textContent = error.message || 'We could not save that bank transaction.';
    }
  } finally {
    reviewState.saving = false;
    if (reviewSheetSave) {
      reviewSheetSave.disabled = false;
      reviewSheetSave.textContent = 'Save to category';
    }
    if (reviewSheetDismiss) {
      reviewSheetDismiss.disabled = false;
    }
    if (reviewSheetCancel) {
      reviewSheetCancel.disabled = false;
    }
  }
}

async function dismissActiveReview() {
  const activeReview = getActiveReviewItem();
  if (!activeReview) {
    return;
  }

  if (activeReview.preview) {
    reviewState.success = 'Preview dismissed.';
    renderReviewQueue();
    closeReviewSheet();
    return;
  }

  reviewState.saving = true;
  if (reviewSheetDismiss) {
    reviewSheetDismiss.disabled = true;
    reviewSheetDismiss.textContent = 'Dismissing...';
  }
  if (reviewSheetSave) {
    reviewSheetSave.disabled = true;
  }
  if (reviewSheetCancel) {
    reviewSheetCancel.disabled = true;
  }

  try {
    const payload = await apiRequest(`/api/plaid/reviews/${activeReview.id}/dismiss`, { method: 'POST' });
    reviewState.items = payload.reviewQueue?.items || [];
    reviewState.summary = payload.reviewQueue?.summary || { queueCount: reviewState.items.length, monthLabel: dashboardState?.monthLabel || null };
    reviewState.success = payload.message || 'Bank transaction dismissed.';
    reviewState.error = '';
    renderReviewQueue();
    closeReviewSheet();
  } catch (error) {
    if (reviewSheetFeedback) {
      reviewSheetFeedback.textContent = error.message || 'We could not dismiss that bank transaction.';
    }
  } finally {
    reviewState.saving = false;
    if (reviewSheetDismiss) {
      reviewSheetDismiss.disabled = false;
      reviewSheetDismiss.textContent = 'Dismiss';
    }
    if (reviewSheetSave) {
      reviewSheetSave.disabled = false;
    }
    if (reviewSheetCancel) {
      reviewSheetCancel.disabled = false;
    }
  }
}

function destroyPlaidHandler() {
  if (plaidLinkHandler && typeof plaidLinkHandler.destroy === 'function') {
    plaidLinkHandler.destroy();
  }
  plaidLinkHandler = null;
}

async function startPlaidLinkFlow() {
  if (!currentUser || plaidState.connecting) {
    return;
  }

  const summary = plaidState.summary;
  const activeConnected = summary?.activeConnectedAccounts ?? flattenPlaidAccounts(plaidState.items).length;
  const maxLinked = summary?.maxLinkedAccounts ?? 4;
  if (activeConnected >= maxLinked) {
    plaidState.error = 'You already have 4 connected accounts. Use Change on one below to swap one out.';
    plaidState.success = '';
    renderPlaidSection();
    return;
  }

  if (!window.Plaid || typeof window.Plaid.create !== 'function') {
    plaidState.error = 'Plaid Link did not load yet. Please try again in a moment.';
    plaidState.success = '';
    renderPlaidSection();
    return;
  }

  plaidState.connecting = true;
  plaidState.error = '';
  plaidState.success = '';
  renderPlaidSection();

  try {
    const linkPayload = await apiRequest('/api/plaid/link-token', { method: 'POST' });
    destroyPlaidHandler();

    plaidLinkHandler = window.Plaid.create({
      token: linkPayload.linkToken,
      onSuccess: async (publicToken, metadata) => {
        try {
          const connectPayload = await apiRequest('/api/plaid/exchange-public-token', {
            method: 'POST',
            body: {
              publicToken,
              metadata
            }
          });
          if (connectPayload.syncWarning) {
            plaidState.success = '';
            plaidState.error = connectPayload.syncWarning;
          } else if ((connectPayload.syncSummary?.queued || 0) > 0) {
            plaidState.success = `Bank connected. ${connectPayload.syncSummary.queued} transaction${connectPayload.syncSummary.queued === 1 ? '' : 's'} ready to review.`;
            plaidState.error = '';
          } else {
            plaidState.success = 'Bank account connected successfully.';
            plaidState.error = '';
          }
          await loadPlaidStatus({ silent: true });
          await loadPlaidReviewQueue({ silent: true });
        } catch (error) {
          plaidState.error = error.message || 'We could not finish connecting that bank.';
          plaidState.success = '';
          renderPlaidSection();
        } finally {
          plaidState.connecting = false;
          destroyPlaidHandler();
          renderPlaidSection();
        }
      },
      onExit: error => {
        plaidState.connecting = false;
        if (error) {
          plaidState.error = error.display_message || error.error_message || 'Plaid was closed before the connection finished.';
          plaidState.success = '';
        }
        destroyPlaidHandler();
        renderPlaidSection();
      }
    });

    plaidLinkHandler.open();
  } catch (error) {
    plaidState.connecting = false;
    plaidState.error = error.message || 'We could not start bank connection right now.';
    plaidState.success = '';
    destroyPlaidHandler();
    renderPlaidSection();
  }
}

function hydrateDashboardFromBudget(budget) {
  if (!budget) {
    dashboardState = null;
    return;
  }

  dashboardState = {
    monthLabel: budget.monthLabel || getCurrentMonthLabel(),
    monthlyIncome: roundToCents(budget.monthlyIncome || 0),
    sections: (budget.sections || []).map(section => ({
      id: section.id || section.sectionKey || `section-${Math.random().toString(36).slice(2, 8)}`,
      title: section.title,
      categories: (section.categories || [])
        .filter(category => !category.isArchived)
        .map(category => ({
          id: category.id,
          title: category.title,
          allocated: roundToCents(category.amount || 0),
          spent: 0
        }))
    })),
    transactions: (budget.transactions || []).map(transaction => ({
      id: transaction.id,
      amount: roundToCents(transaction.amount || 0),
      date: transaction.date,
      categoryId: transaction.categoryId,
      categoryTitle: transaction.categoryTitle,
      sectionTitle: transaction.sectionTitle,
      memo: transaction.memo || ''
    }))
  };

  dashboardState.transactions.forEach(transaction => {
    const match = findDashboardCategory(transaction.categoryId);
    if (match) {
      match.category.spent = roundToCents(match.category.spent + transaction.amount);
    }
  });
}

function handleAllocationLegendInteraction(event) {
  const button = event.target.closest('[data-highlight-category-id]');
  if (!button) {
    return;
  }

  const categoryId = button.dataset.highlightCategoryId;
  selectedDashboardCategoryId = selectedDashboardCategoryId === categoryId ? null : categoryId;
  renderDashboard();

  if (selectedDashboardCategoryId) {
    const trackingItem = document.querySelector(`[data-tracking-category-id="${selectedDashboardCategoryId}"]`);
    trackingItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function initializeDashboardScreen() {
  dashboardState = createDashboardStateFromAllocation();
  if (!dashboardState) {
    return;
  }

  transactionDateInput.value = getTodayDateValue();
  if (transactionAmountInput) {
    transactionAmountInput.value = '';
  }
  if (transactionMemoInput) {
    transactionMemoInput.value = '';
  }
  if (transactionFeedback) {
    transactionFeedback.textContent = '';
  }
  renderDashboard();
  loadPlaidReviewQueue({ silent: true });
}

function canOpenStep(stepIndex) {
  return stepIndex === 1 || stepIndex < currentStep || currentStep === 4;
}

function openFlowStep(stepIndex) {
  if (!canOpenStep(stepIndex)) {
    return;
  }

  previousStep = currentStep;
  currentStep = stepIndex;
  updateFlowStep();
}

function openModal(modal) {
  if (!modal) {
    return;
  }

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('modal-open'));
}

function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.remove('modal-open');
  window.setTimeout(() => {
    if (!modal.classList.contains('modal-open')) {
      modal.hidden = true;
      const anyOpenModals = document.querySelector('.modal-shell.modal-open');
      if (!anyOpenModals) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    }
  }, 220);
}

function closeHeaderMenu() {
  if (!headerAccountMenu || !headerAuthButton) {
    return;
  }
  headerAccountMenu.classList.remove('header-dropdown-open');
  headerAuthButton.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => {
    if (!headerAccountMenu.classList.contains('header-dropdown-open')) {
      headerAccountMenu.hidden = true;
    }
  }, 180);
}

function openHeaderMenu() {
  if (!headerAccountMenu || !headerAuthButton || !currentUser) {
    return;
  }
  headerAccountMenu.hidden = false;
  headerAuthButton.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => headerAccountMenu.classList.add('header-dropdown-open'));
}

function toggleHeaderMenu() {
  if (!currentUser) {
    return;
  }
  if (headerAccountMenu?.hidden) {
    openHeaderMenu();
  } else {
    closeHeaderMenu();
  }
}

async function loadPremiumStatus() {
  if (!currentUser) {
    profileState.premium = null;
    return null;
  }

  const payload = await apiRequest('/api/premium/status');
  profileState.premium = payload;
  return payload;
}

function setProfileFeedback(target, message = '', type = '') {
  if (!target) {
    return;
  }
  target.textContent = message;
  target.classList.remove('auth-feedback-error', 'auth-feedback-success');
  if (type) {
    target.classList.add(`auth-feedback-${type}`);
  }
}

function renderProfileAccountPanel() {
  if (!profileAccountForm || !currentUser) {
    return;
  }

  profileAccountForm.elements.firstName.value = currentUser.firstName || '';
  profileAccountForm.elements.lastName.value = currentUser.lastName || '';
  profileAccountForm.elements.email.value = currentUser.email || '';
}

function renderProfileBillingPanel() {
  if (!profileBillingSummary) {
    return;
  }

  const entitlement = profileState.premium?.entitlement;
  const subscription = profileState.premium?.subscription;
  const promoRedemption = profileState.premium?.promoRedemption;
  const premiumActive = Boolean(entitlement?.premiumAccess);
  const paidPremiumActive = Boolean(subscription && premiumActive);
  const promoPremiumActive = Boolean(!subscription && premiumActive && entitlement?.source === 'promo_code');
  const planLabel = premiumActive ? 'Premium' : 'Free';
  const statusLabel = subscription?.status
    ? subscription.status.replaceAll('_', ' ').replace(/\b\w/g, character => character.toUpperCase())
    : premiumActive
      ? 'Active'
      : 'No active premium plan';
  const renewalLabel = subscription?.currentPeriodEnd
    ? formatHistoryDate(subscription.currentPeriodEnd)
    : 'Not scheduled yet';

  profileBillingSummary.innerHTML = `
    <div class="premium-summary-card">
      <span class="premium-label">Plan</span>
      <strong>${planLabel}</strong>
      <p>${statusLabel}</p>
    </div>
    <div class="premium-feature-list">
      <div><strong>Bank sync</strong><span>${entitlement?.bankSyncEnabled ? 'Enabled' : 'Unavailable on free plan'}</span></div>
      <div><strong>Connected accounts</strong><span>Up to ${entitlement?.maxLinkedAccounts ?? 4}</span></div>
      <div><strong>Billing cycle</strong><span>${premiumActive ? 'Monthly' : 'Not active'}</span></div>
      <div><strong>${promoPremiumActive ? 'Promo ends' : 'Next renewal'}</strong><span>${premiumActive && subscription ? renewalLabel : promoRedemption?.grantedUntil ? formatHistoryDate(promoRedemption.grantedUntil) : '—'}</span></div>
    </div>
  `;

  if (profilePromoCodeInput) {
    const promoIsActive = Boolean(promoRedemption?.grantedUntil && promoPremiumActive);
    profilePromoCodeInput.disabled = promoIsActive || profileState.redeemingPromo || paidPremiumActive;
    if (promoIsActive) {
      profilePromoCodeInput.value = '';
      profilePromoCodeInput.placeholder = `Promo active until ${formatHistoryDate(promoRedemption.grantedUntil)}`;
    } else {
      profilePromoCodeInput.placeholder = 'LGT-XXXX-XXXX-XXXX';
    }
  }
  if (profilePromoCodeButton) {
    const promoIsLocked = Boolean(paidPremiumActive || (promoRedemption && promoPremiumActive));
    profilePromoCodeButton.disabled = promoIsLocked || profileState.redeemingPromo;
    profilePromoCodeButton.textContent = promoIsLocked ? 'Promo active' : profileState.redeemingPromo ? 'Applying…' : 'Apply code';
  }

  if (profileUpgradeButton) {
    profileUpgradeButton.textContent = paidPremiumActive ? 'Premium active' : promoPremiumActive ? 'Upgrade to continue' : 'Upgrade plan';
    profileUpgradeButton.disabled = paidPremiumActive;
  }
  if (profileManagePremiumButton) {
    profileManagePremiumButton.textContent = paidPremiumActive ? 'Manage billing' : promoPremiumActive ? 'Promo active' : 'No premium to manage';
    profileManagePremiumButton.disabled = !paidPremiumActive;
  }
}

function renderProfileBankingPanel() {
  if (!profileBankSummary || !profileBankList) {
    return;
  }

  const summary = plaidState.summary;
  const accounts = flattenPlaidAccounts(plaidState.items);
  const activeConnected = summary?.activeConnectedAccounts ?? accounts.length;
  const maxLinked = summary?.maxLinkedAccounts ?? 4;
  const premiumRequired = summary ? Boolean(summary.premiumRequired) : false;

  profileBankSummary.innerHTML = `
    <div class="profile-bank-summary-row">
      <strong>${activeConnected} of ${maxLinked} connected</strong>
      <span>${premiumRequired ? 'Premium is required to add bank accounts.' : 'Use Change to replace a connected account.'}</span>
    </div>
  `;

  if (profileConnectBankButton) {
    profileConnectBankButton.disabled = premiumRequired || activeConnected >= maxLinked;
    profileConnectBankButton.textContent = premiumRequired ? 'Premium required' : activeConnected >= maxLinked ? 'Accounts full' : 'Connect bank';
  }
  if (profileOpenDashboardButton) {
    profileOpenDashboardButton.disabled = !dashboardState;
  }

  if (!accounts.length) {
    profileBankList.innerHTML = `
      <div class="plaid-empty-state">
        <strong>No bank accounts connected yet.</strong>
        <span>Connect one from here or from the dashboard when you’re ready.</span>
      </div>
    `;
    return;
  }

  profileBankList.innerHTML = accounts
    .map(account => `
      <article class="plaid-account-tile profile-bank-tile">
        <div class="plaid-account-copy">
          <strong>${account.name || account.officialName || 'Connected account'}</strong>
          <span>${account.institutionName}${account.mask ? ` •••• ${account.mask}` : ''}</span>
        </div>
        <div class="plaid-account-meta">
          <span>${account.subtype || account.type || 'Account'}</span>
          <button class="plaid-account-remove" type="button" data-disconnect-plaid-account="${account.id}" aria-label="Disconnect ${account.name || account.officialName || 'connected account'}">
            Change
          </button>
        </div>
      </article>
    `)
    .join('');
}

function setProfileView(nextView) {
  profileView = nextView;
  profileNavButtons.forEach(button => {
    const isActive = button.dataset.profileNav === nextView;
    button.classList.toggle('profile-nav-item-active', isActive);
  });
  profilePanels.forEach(panel => {
    panel.classList.toggle('profile-panel-active', panel.dataset.profilePanel === nextView);
  });
}

async function openProfileModal(nextView = 'account') {
  if (!currentUser) {
    return;
  }

  closeHeaderMenu();
  profileState.loading = true;
  setProfileFeedback(profileBillingFeedback, '');
  setProfileFeedback(profileAccountFeedback, '');
  setProfileFeedback(profileBankingFeedback, '');
  setProfileFeedback(profilePromoCodeFeedback, '');
  renderProfileAccountPanel();
  renderProfileBankingPanel();
  openModal(profileModal);
  setProfileView(nextView);

  try {
    await Promise.all([
      loadPremiumStatus(),
    ]);
    renderProfileBillingPanel();
    renderProfileAccountPanel();
    renderProfileBankingPanel();
  } catch (error) {
    setProfileFeedback(profileBillingFeedback, error.message || 'We could not load your billing details.', 'error');
  } finally {
    profileState.loading = false;
  }
}

function closeProfileModal() {
  closeModal(profileModal);
}

function saveCurrentUser(user) {
  currentUser = user;
  if (user) {
    window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }
  updateHeaderAuthState();
}

function resetAppToSignedOutState() {
  currentUser = null;
  dashboardState = null;
  allocationState = null;
  reviewState.items = [];
  reviewState.summary = { queueCount: 0, monthLabel: null };
  plaidState = {
    loading: false,
    connecting: false,
    entitlement: null,
    summary: null,
    items: [],
    error: '',
    success: ''
  };
  syncPersistedState({
    incomeProfile: null,
    monthlyBudget: null,
    hasCompletedOnboarding: false
  });
  saveCurrentUser(null);
  updateHeaderAuthState();
  closeHeaderMenu();
  closeProfileModal();
  currentStep = 1;
  previousStep = 1;
  updateFlowStep();
  showScreen('landing');
}

function syncPersistedState({ incomeProfile = null, monthlyBudget = null, hasCompletedOnboarding = false } = {}) {
  persistedAppState = {
    incomeProfile,
    monthlyBudget,
    hasCompletedOnboarding
  };
}

function hydrateOnboardingFromProfile(profile) {
  if (!profile) {
    return;
  }

  currentMethod = profile.method === 'manual' ? 'manual' : 'salary';
  const incomeValue = currentMethod === 'manual'
    ? roundToCents(profile.manualMonthlyIncome || 0)
    : roundToCents(profile.annualSalary || 0);

  annualSalaryInput.value = incomeValue ? String(incomeValue) : '';
  stateSelect.value = stateCodeToName[profile.state] || profile.state || 'Tennessee';
  filingStatusSelect.value = filingStatusFromApi[profile.filingStatus] || 'Single';
  payFrequencySelect.value = payFrequencyFromApi[profile.payFrequency] || 'Biweekly';
  extraWithholdingInput.value = profile.extraWithholding ? String(roundToCents(profile.extraWithholding)) : '';
  setDeductionTaxTreatment('extra-withholding', profile.extraWithholdingTaxTreatment === 'pretax' ? 'pretax' : 'posttax');

  deductionKinds.forEach(deductionKey => {
    const match = (profile.deductions || []).find(deduction => deduction.key === deductionKey);
    const mode = match?.inputMode === 'percent' ? 'percent' : 'yearly';
    setDeductionMode(deductionKey, mode);

    const yearlyInput = getDeductionInput(deductionKey, 'yearly');
    const percentInput = getDeductionInput(deductionKey, 'percent');
    if (yearlyInput) {
      yearlyInput.value = match?.yearlyAmount ? String(roundToCents(match.yearlyAmount)) : '';
    }
    if (percentInput) {
      percentInput.value = match?.percent ? String(roundToCents(match.percent)) : '';
    }
    setDeductionTaxTreatment(deductionKey, match?.taxTreatment === 'pretax' ? 'pretax' : 'posttax');
    updateDeductionReflection(deductionKey);
  });

  methodButtons.forEach(button => {
    const isActive = button.dataset.method === currentMethod;
    button.classList.toggle('option-card-active', isActive);
    button.setAttribute('aria-checked', String(isActive));
  });

  updateMethodUI();
  updateSummary();
}

function buildOnboardingPayload() {
  const results = calculateResults();

  return {
    method: currentMethod,
    annualSalary: currentMethod === 'salary' ? roundToCents(getSalaryValue()) : null,
    manualMonthlyIncome: currentMethod === 'manual' ? roundToCents(getManualMonthlyTakeHomeValue()) : null,
    stateCode: stateNameToCode[stateSelect.value] || stateSelect.value,
    filingStatus: currentMethod === 'salary' ? filingStatusToApi[filingStatusSelect.value] : null,
    payFrequency: currentMethod === 'salary' ? payFrequencyToApi[payFrequencySelect.value] : null,
    extraWithholding: roundToCents(parseMoney(extraWithholdingInput.value)),
    extraWithholdingTaxTreatment: getDeductionTaxTreatment('extra-withholding'),
    results,
    deductions: deductionKinds.map(deduction => ({
      key: deduction,
      title: deductionLabel(deduction),
      inputMode: getActiveDeductionMode(deduction),
      yearlyAmount: roundToCents(parseMoney(getDeductionInput(deduction, 'yearly')?.value)),
      percent: roundToCents(parsePercent(getDeductionInput(deduction, 'percent')?.value)),
      taxTreatment: getDeductionTaxTreatment(deduction),
      enabled: Boolean(parseMoney(getDeductionInput(deduction, 'yearly')?.value) || parsePercent(getDeductionInput(deduction, 'percent')?.value))
    }))
  };
}

function buildLedgerPayload() {
  if (!allocationState) {
    return null;
  }

  const validCategoryIds = new Set(
    allocationState.sections.flatMap(section => section.categories.map(category => category.id))
  );
  const transactions = (dashboardState?.transactions || []).filter(transaction => validCategoryIds.has(transaction.categoryId));

  return {
    monthLabel: allocationState.monthLabel,
    monthlyIncome: roundToCents(allocationState.monthlyIncome),
    allocatedTotal: getAllocatedTotal(),
    remainingToAllocate: getAllocationRemaining(),
    sections: allocationState.sections.map(section => ({
      id: section.id,
      sectionKey: section.id,
      title: section.title,
      categories: section.categories
        .filter(category => category.title.trim())
        .map(category => ({
        id: category.id,
        title: category.title,
        amount: roundToCents(category.amount)
      }))
    })),
    transactions: transactions.map(transaction => ({
      id: transaction.id,
      amount: roundToCents(transaction.amount),
      date: transaction.date,
      categoryId: transaction.categoryId,
      memo: transaction.memo || ''
    }))
  };
}

async function loadAppState() {
  pendingReviewDeepLink = pendingReviewDeepLink || readReviewDeepLinkFromUrl();
  const payload = await apiRequest('/api/app-state');
  saveCurrentUser(payload.user || null);
  syncPersistedState(payload);
  if (payload.authenticated) {
    profileState.premium = {
      ...(profileState.premium || {}),
      entitlement: payload.entitlement || profileState.premium?.entitlement || null,
      subscription: payload.subscription || profileState.premium?.subscription || null,
      promoRedemption: payload.promoRedemption || null
    };
  }

  if (payload.incomeProfile) {
    hydrateOnboardingFromProfile(payload.incomeProfile);
  }
  if (payload.monthlyBudget) {
    hydrateAllocationFromBudget(payload.monthlyBudget);
    hydrateDashboardFromBudget(payload.monthlyBudget);
  }

  return payload;
}

function routeAuthenticatedUser(appState) {
  if (!appState?.authenticated) {
    currentStep = 1;
    previousStep = 1;
    updateFlowStep();
    showScreen('landing');
    return;
  }

  loadPlaidStatus({ silent: true });
  loadPushStatus({ silent: true });

  if (appState?.monthlyBudget) {
    currentStep = 4;
    previousStep = 4;
    updateFlowStep();
    renderAllocationScreen();
    renderDashboard();
    showScreen('dashboard');
    tryOpenReviewDeepLink();
    return;
  }

  currentStep = 1;
  previousStep = 1;
  updateFlowStep();
  showScreen('step-a');
}

async function ensureAuthenticatedForSave() {
  if (currentUser) {
    return true;
  }

  setAuthMode('signup');
  openModal(authModal);
  setAuthFeedback(authSignupFeedback, 'Create an account or log in to save your progress.', 'error');
  return false;
}

async function saveOnboardingAndOpenLedger() {
  if (!(await ensureAuthenticatedForSave())) {
    return;
  }

  nextStepButton.disabled = true;
  nextStepButton.textContent = 'Saving...';

  try {
    const payload = await apiRequest('/api/onboarding/save', {
      method: 'POST',
      body: buildOnboardingPayload()
    });

    if (payload.incomeProfile) {
      syncPersistedState({
        incomeProfile: payload.incomeProfile,
        monthlyBudget: persistedAppState.monthlyBudget,
        hasCompletedOnboarding: Boolean(payload.incomeProfile && persistedAppState.monthlyBudget)
      });
      hydrateOnboardingFromProfile(payload.incomeProfile);
    }

    initializeAllocationScreen();
    showScreen('allocation');
  } catch (error) {
    setAuthFeedback(authLoginFeedback, error.message, 'error');
    if (error.status === 401) {
      openModal(authModal);
    }
  } finally {
    nextStepButton.disabled = false;
    updateFlowStep();
  }
}

async function saveLedgerState() {
  const payload = buildLedgerPayload();
  if (!payload) {
    return null;
  }

  const response = await apiRequest('/api/ledger/save', {
    method: 'POST',
    body: payload
  });

  if (response.monthlyBudget) {
    hydrateAllocationFromBudget(response.monthlyBudget);
    hydrateDashboardFromBudget(response.monthlyBudget);
    syncPersistedState({
      incomeProfile: persistedAppState.incomeProfile,
      monthlyBudget: response.monthlyBudget,
      hasCompletedOnboarding: Boolean(persistedAppState.incomeProfile && response.monthlyBudget)
    });
  }

  return response;
}

function populateTransactionEditCategoryOptions() {
  if (!transactionEditCategory) {
    return;
  }

  transactionEditCategory.innerHTML = getDashboardCategories()
    .filter(category => category.allocated > 0 && category.title.trim())
    .map(category => `<option value="${category.id}">${category.title}</option>`)
    .join('');
}

function openTransactionEditModal(transactionId) {
  const transaction = findDashboardTransaction(transactionId);
  if (!transaction || !transactionEditModal || !transactionEditAmount || !transactionEditDate || !transactionEditCategory || !transactionEditMemo) {
    return;
  }

  transactionEditState.transactionId = transactionId;
  transactionEditState.saving = false;
  populateTransactionEditCategoryOptions();
  transactionEditAmount.value = String(roundToCents(transaction.amount));
  transactionEditDate.value = transaction.date;
  transactionEditCategory.value = transaction.categoryId;
  transactionEditMemo.value = transaction.memo || '';
  if (transactionEditFeedback) {
    transactionEditFeedback.textContent = '';
  }
  if (transactionEditSave) {
    transactionEditSave.disabled = false;
    transactionEditSave.textContent = 'Save changes';
  }
  if (transactionEditRemove) {
    transactionEditRemove.disabled = false;
  }
  openModal(transactionEditModal);
}

function closeTransactionEditModal() {
  transactionEditState.transactionId = null;
  if (transactionEditFeedback) {
    transactionEditFeedback.textContent = '';
  }
  closeModal(transactionEditModal);
}

function openActionConfirm({ eyebrow = 'Confirm', title = 'Are you sure?', copy = 'Please confirm this action.', confirmLabel = 'Confirm', destructive = false, onConfirm }) {
  if (!actionConfirmModal || !actionConfirmTitle || !actionConfirmCopy || !actionConfirmProceed) {
    return;
  }

  actionConfirmState.onConfirm = onConfirm;
  actionConfirmState.saving = false;
  actionConfirmEyebrow.textContent = eyebrow;
  actionConfirmTitle.textContent = title;
  actionConfirmCopy.textContent = copy;
  actionConfirmProceed.textContent = confirmLabel;
  actionConfirmProceed.dataset.defaultLabel = confirmLabel;
  actionConfirmProceed.classList.toggle('button-danger', destructive);
  actionConfirmProceed.disabled = false;
  if (actionConfirmFeedback) {
    actionConfirmFeedback.textContent = '';
  }
  openModal(actionConfirmModal);
}

function closeActionConfirmModal() {
  actionConfirmState.onConfirm = null;
  actionConfirmState.saving = false;
  if (actionConfirmFeedback) {
    actionConfirmFeedback.textContent = '';
  }
  actionConfirmProceed?.classList.remove('button-danger');
  closeModal(actionConfirmModal);
}

async function saveTransactionEdit() {
  const transaction = findDashboardTransaction(transactionEditState.transactionId);
  if (!transaction || !dashboardState) {
    return;
  }

  const amount = roundToCents(parseMoney(transactionEditAmount?.value));
  const date = transactionEditDate?.value;
  const categoryId = transactionEditCategory?.value;
  const memo = transactionEditMemo?.value.trim() || '';
  const match = findDashboardCategory(categoryId);

  if (!amount || !date || !match) {
    if (transactionEditFeedback) {
      transactionEditFeedback.textContent = 'Add an amount, date, and category before saving changes.';
    }
    return;
  }

  transactionEditState.saving = true;
  if (transactionEditSave) {
    transactionEditSave.disabled = true;
    transactionEditSave.textContent = 'Saving...';
  }
  if (transactionEditRemove) {
    transactionEditRemove.disabled = true;
  }

  const previousTransaction = { ...transaction };
  transaction.amount = amount;
  transaction.date = date;
  transaction.categoryId = categoryId;
  transaction.categoryTitle = match.category.title;
  transaction.sectionTitle = match.section.title;
  transaction.memo = memo;
  recalculateDashboardCategorySpending();
  renderDashboard();

  try {
    await persistDashboardSilently();
    if (transactionFeedback) {
      transactionFeedback.textContent = 'Transaction updated.';
    }
    closeTransactionEditModal();
  } catch (error) {
    Object.assign(transaction, previousTransaction);
    recalculateDashboardCategorySpending();
    renderDashboard();
    if (transactionEditFeedback) {
      transactionEditFeedback.textContent = error.message || 'We could not save those transaction changes.';
    }
  } finally {
    transactionEditState.saving = false;
    if (transactionEditSave) {
      transactionEditSave.disabled = false;
      transactionEditSave.textContent = 'Save changes';
    }
    if (transactionEditRemove) {
      transactionEditRemove.disabled = false;
    }
  }
}

function requestTransactionRemoval(transactionId) {
  const transaction = findDashboardTransaction(transactionId);
  if (!transaction) {
    return;
  }

  openActionConfirm({
    eyebrow: 'Remove spending',
    title: 'Remove this logged transaction?',
    copy: `${formatCurrencyPrecise(transaction.amount)} in ${transaction.categoryTitle} will be removed from this month.`,
    confirmLabel: 'Remove',
    onConfirm: async () => {
      const previousTransactions = dashboardState.transactions.map(item => ({ ...item }));
      dashboardState.transactions = dashboardState.transactions.filter(item => item.id !== transactionId);
      recalculateDashboardCategorySpending();
      renderDashboard();
      closeTransactionEditModal();
      try {
        await persistDashboardSilently();
        return 'Transaction removed.';
      } catch (error) {
        dashboardState.transactions = previousTransactions;
        recalculateDashboardCategorySpending();
        renderDashboard();
        throw error;
      }
    }
  });
}

function requestReviewRemoval(reviewId) {
  const review = reviewState.items.find(item => item.id === reviewId) || getActiveReviewItem();
  const transaction = review?.transaction;
  if (!review || !transaction || review.preview) {
    return;
  }

  openActionConfirm({
    eyebrow: transaction.pending ? 'Remove pending review' : 'Remove bank review',
    title: transaction.pending ? 'Remove this pending purchase from review?' : 'Remove this bank purchase from review?',
    copy: `${formatCurrencyPrecise(transaction.amount)} from ${transaction.merchantName || transaction.name} will be removed from your review queue.`,
    confirmLabel: 'Remove',
    onConfirm: async () => {
      const payload = await apiRequest(`/api/plaid/reviews/${review.id}/dismiss`, { method: 'POST' });
      reviewState.items = payload.reviewQueue?.items || [];
      reviewState.summary = payload.reviewQueue?.summary || { queueCount: reviewState.items.length, monthLabel: dashboardState?.monthLabel || null };
      reviewState.success = payload.message || 'Bank transaction removed from review.';
      reviewState.error = '';
      closeReviewSheet();
      renderReviewQueue();
      return payload.message || 'Bank transaction removed from review.';
    }
  });
}

async function persistDashboardSilently() {
  if (!currentUser || !dashboardState) {
    return;
  }

  try {
    await saveLedgerState();
    renderAllocationScreen();
    renderDashboard();
  } catch (error) {
    if (transactionFeedback) {
      transactionFeedback.textContent = error.message || 'We could not save that spending entry yet.';
    }
    throw error;
  }
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || 'GET',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'same-origin'
  });

  let payload = {};

  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    const error = new Error(payload.message || 'Something went wrong.');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

async function loadCurrentUser() {
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    currentUser = raw ? JSON.parse(raw) : null;
  } catch {
    currentUser = null;
  }
  updateHeaderAuthState();

  try {
    const payload = await loadAppState();
    routeAuthenticatedUser(payload);
    await handleStripeReturnState();
  } catch {
    saveCurrentUser(null);
    syncPersistedState();
  }
}

function setAuthFormLoading(form, isLoading) {
  const submitButton = form?.querySelector('[type="submit"]');
  if (submitButton) {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading
      ? (
        form.dataset.form === 'signup'
          ? 'Creating Account...'
          : form.dataset.form === 'recovery'
            ? (authRecoveryStage === 'reset' ? 'Resetting Password...' : 'Sending Recovery Code...')
            : 'Signing In...'
      )
      : (
        form.dataset.form === 'signup'
          ? 'Create Account'
          : form.dataset.form === 'recovery'
            ? (authRecoveryStage === 'reset' ? 'Reset Password' : 'Send Recovery Code')
            : 'Continue'
      );
  }

  const forgotButton = form?.querySelector('#auth-forgot-password');
  if (forgotButton) {
    forgotButton.disabled = isLoading;
  }
}

function updateHeaderAuthState() {
  if (!headerAuthButton) {
    return;
  }

  const headerAuthLabel = headerAuthButton.querySelector('.header-link-label');

  if (currentUser?.firstName && currentUser?.lastName) {
    if (headerAuthLabel) {
      headerAuthLabel.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    }
    headerAuthButton.removeAttribute('data-open-auth');
    headerAuthButton.classList.add('header-link-user');
    headerAuthButton.setAttribute('aria-label', `Signed in as ${currentUser.firstName} ${currentUser.lastName}`);
    headerAuthButton.setAttribute('aria-expanded', 'false');
    return;
  }

  if (headerAuthLabel) {
    headerAuthLabel.textContent = 'Log In';
  }
  headerAuthButton.setAttribute('data-open-auth', 'login');
  headerAuthButton.classList.remove('header-link-user');
  headerAuthButton.setAttribute('aria-label', 'Log In');
  headerAuthButton.setAttribute('aria-expanded', 'false');
  closeHeaderMenu();
}

async function handleAccountProfileSave(event) {
  event.preventDefault();
  if (!profileAccountForm || profileState.savingAccount) {
    return;
  }

  const firstName = profileAccountForm.elements.firstName.value.trim();
  const lastName = profileAccountForm.elements.lastName.value.trim();
  const email = profileAccountForm.elements.email.value.trim().toLowerCase();

  if (!firstName || !lastName || !email) {
    setProfileFeedback(profileAccountFeedback, 'Please complete your first name, last name, and email.', 'error');
    return;
  }

  profileState.pendingAccountPayload = {
    firstName,
    lastName,
    email
  };
  setProfileFeedback(profileAccountConfirmFeedback, '');
  openModal(profileAccountConfirmModal);
}

async function confirmAccountProfileSave() {
  if (!profileState.pendingAccountPayload || profileState.savingAccount) {
    return;
  }

  profileState.savingAccount = true;
  if (profileAccountSaveButton) {
    profileAccountSaveButton.disabled = true;
    profileAccountSaveButton.textContent = 'Saving...';
  }
  if (profileAccountConfirmSaveButton) {
    profileAccountConfirmSaveButton.disabled = true;
    profileAccountConfirmSaveButton.textContent = 'Saving...';
  }
  if (profileAccountConfirmCancelButton) {
    profileAccountConfirmCancelButton.disabled = true;
  }

  try {
    const payload = await apiRequest('/api/account/profile', {
      method: 'POST',
      body: profileState.pendingAccountPayload
    });
    saveCurrentUser(payload.user);
    setProfileFeedback(profileAccountFeedback, payload.message || 'Account updated successfully.', 'success');
    closeModal(profileAccountConfirmModal);
    profileState.pendingAccountPayload = null;
    updateHeaderAuthState();
  } catch (error) {
    setProfileFeedback(profileAccountConfirmFeedback, error.message || 'We could not update your account.', 'error');
  } finally {
    profileState.savingAccount = false;
    if (profileAccountSaveButton) {
      profileAccountSaveButton.disabled = false;
      profileAccountSaveButton.textContent = 'Save changes';
    }
    if (profileAccountConfirmSaveButton) {
      profileAccountConfirmSaveButton.disabled = false;
      profileAccountConfirmSaveButton.textContent = 'Confirm & Save';
    }
    if (profileAccountConfirmCancelButton) {
      profileAccountConfirmCancelButton.disabled = false;
    }
  }
}

function handleResetPasswordFromProfile() {
  if (!currentUser || !authRecoveryForm) {
    return;
  }

  closeProfileModal();
  setRecoveryStage('request');
  setAuthMode('recovery');
  authRecoveryForm.reset();
  authRecoveryForm.elements.email.value = currentUser.email || '';
  openModal(authModal);
  setAuthFeedback(authRecoveryFeedback, 'We’ll email you a recovery code to reset your password.', 'success');
}

function handleDeleteAccountRequest() {
  if (!currentUser) {
    return;
  }

  openActionConfirm({
    eyebrow: 'Delete account',
    title: 'Delete your Largent account?',
    copy: 'This permanently removes your account, saved budgets, connected bank records, and history. If you still have a paid Premium subscription, remove it in Billing first.',
    confirmLabel: 'Delete account',
    destructive: true,
    onConfirm: async () => {
      await apiRequest('/api/account/delete', { method: 'POST' });
      resetAppToSignedOutState();
      return null;
    }
  });
}

async function handleSignOut() {
  try {
    await apiRequest('/api/auth/logout', { method: 'POST' });
  } catch {
  }
  resetAppToSignedOutState();
}

function setAuthFeedback(target, message, type = '') {
  if (!target) {
    return;
  }

  target.textContent = message;
  target.classList.remove('auth-feedback-error', 'auth-feedback-success');
  if (type) {
    target.classList.add(`auth-feedback-${type}`);
  }
}

function clearAuthFeedback() {
  setAuthFeedback(authSignupFeedback, '');
  setAuthFeedback(authLoginFeedback, '');
  setAuthFeedback(authRecoveryFeedback, '');
}

function isStrongPassword(password) {
  return password.length >= 8 && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
}

async function handleSignupSubmit(form) {
  const firstName = form.elements.firstName.value.trim();
  const lastName = form.elements.lastName.value.trim();
  const email = form.elements.email.value.trim().toLowerCase();
  const password = form.elements.password.value;
  const confirmPassword = form.elements.confirmPassword.value;
  const promoCode = form.elements.promoCode?.value.trim() || '';

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    setAuthFeedback(authSignupFeedback, 'Please complete every field to create your account.', 'error');
    return false;
  }

  if (password !== confirmPassword) {
    setAuthFeedback(authSignupFeedback, 'Passwords do not match.', 'error');
    return false;
  }

  if (!isStrongPassword(password)) {
    setAuthFeedback(authSignupFeedback, 'Password must be at least 8 characters and include 1 number and 1 special character.', 'error');
    return false;
  }

  try {
    const payload = await apiRequest('/api/auth/signup', {
      method: 'POST',
      body: { firstName, lastName, email, password, confirmPassword, promoCode }
    });
    saveCurrentUser(payload.user);
    const signupMessage = payload.promo?.applied
      ? payload.promo.message
      : payload.message || 'Account created successfully.';
    setAuthFeedback(authSignupFeedback, signupMessage, 'success');
    return true;
  } catch (error) {
    setAuthFeedback(authSignupFeedback, error.message, 'error');
    if (error.status === 409) {
      setAuthMode('login');
    }
    return false;
  }
}

async function handlePromoCodeRedeem() {
  if (!profilePromoCodeInput || profileState.redeemingPromo) {
    return;
  }

  const promoCode = profilePromoCodeInput.value.trim();
  if (!promoCode) {
    setProfileFeedback(profilePromoCodeFeedback, 'Enter a promo code to continue.', 'error');
    return;
  }

  profileState.redeemingPromo = true;
  renderProfileBillingPanel();
  setProfileFeedback(profilePromoCodeFeedback, 'Applying promo code…');

  try {
    const payload = await apiRequest('/api/promo-code/redeem', {
      method: 'POST',
      body: { promoCode }
    });
    if (payload.user) {
      saveCurrentUser(payload.user);
    }
    profileState.premium = {
      ...profileState.premium,
      entitlement: payload.entitlement || profileState.premium?.entitlement,
      subscription: payload.subscription || null,
      promoRedemption: payload.promoRedemption || null
    };
    await loadPlaidStatus({ silent: true });
    if (profilePromoCodeInput) {
      profilePromoCodeInput.value = '';
    }
    renderProfileBillingPanel();
    renderPlaidSection();
    renderProfileBankingPanel();
    setProfileFeedback(profilePromoCodeFeedback, payload.message || 'Promo code applied.', 'success');
  } catch (error) {
    setProfileFeedback(profilePromoCodeFeedback, error.message || 'We could not apply that promo code.', 'error');
  } finally {
    profileState.redeemingPromo = false;
    renderProfileBillingPanel();
  }
}

async function handleLoginSubmit(form) {
  const email = form.elements.email.value.trim().toLowerCase();
  const password = form.elements.password.value;

  try {
    const payload = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    saveCurrentUser(payload.user);
    setAuthFeedback(authLoginFeedback, payload.message || 'Logged in successfully.', 'success');
    return true;
  } catch (error) {
    setAuthFeedback(authLoginFeedback, error.message, 'error');
    return false;
  }
}

async function handleRecoverySubmit(form) {
  const email = form.elements.email.value.trim().toLowerCase();

  if (!email) {
    setAuthFeedback(authRecoveryFeedback, 'Enter your email to continue.', 'error');
    return false;
  }

  if (authRecoveryStage === 'request') {
    try {
      const payload = await apiRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: { email }
      });
      setRecoveryStage('reset');
      setAuthFeedback(authRecoveryFeedback, payload.message, 'success');
      form.elements.recoveryCode.focus();
      return false;
    } catch (error) {
      setAuthFeedback(authRecoveryFeedback, error.message, 'error');
      return false;
    }
  }

  const recoveryCode = form.elements.recoveryCode.value.trim();
  const password = form.elements.password.value;
  const confirmPassword = form.elements.confirmPassword.value;

  if (!recoveryCode || !password || !confirmPassword) {
    setAuthFeedback(authRecoveryFeedback, 'Complete every field to reset your password.', 'error');
    return false;
  }

  if (password !== confirmPassword) {
    setAuthFeedback(authRecoveryFeedback, 'Passwords do not match.', 'error');
    return false;
  }

  if (!isStrongPassword(password)) {
    setAuthFeedback(authRecoveryFeedback, 'Password must be at least 8 characters and include 1 number and 1 special character.', 'error');
    return false;
  }

  try {
    const payload = await apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: { email, recoveryCode, password, confirmPassword }
    });
    form.reset();
    setRecoveryStage('request');
    setAuthMode('login');
    const loginEmailInput = document.querySelector('.auth-form[data-form="login"] input[name="email"]');
    if (loginEmailInput) {
      loginEmailInput.value = email;
    }
    setAuthFeedback(authLoginFeedback, payload.message, 'success');
    return false;
  } catch (error) {
    setAuthFeedback(authRecoveryFeedback, error.message, 'error');
    return false;
  }
}

function getTodayDateValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().split('T')[0];
}

function formatHistoryDate(value) {
  if (!value) {
    return 'No date';
  }

  const parsed = value.includes('T')
    ? new Date(value)
    : new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(parsed);
}

async function handleTransactionSubmit(event) {
  event.preventDefault();

  if (!dashboardState) {
    return;
  }

  const amount = roundToCents(parseMoney(transactionAmountInput.value));
  const date = transactionDateInput.value;
  const categoryId = transactionCategorySelect.value;
  const memo = transactionMemoInput.value.trim();
  const match = findDashboardCategory(categoryId);

  if (!amount || !date || !match) {
    if (transactionFeedback) {
      transactionFeedback.textContent = 'Add an amount, date, and category to log spending.';
    }
    return;
  }

  match.category.spent = roundToCents(match.category.spent + amount);
  dashboardState.transactions.push({
    id: `transaction-${Date.now()}`,
    amount,
    date,
    categoryId,
    categoryTitle: match.category.title,
    sectionTitle: match.section.title,
    memo
  });

  transactionAmountInput.value = '';
  transactionMemoInput.value = '';
  transactionFeedback.textContent = `${formatCurrencyPrecise(amount)} added to ${match.category.title}.`;
  renderDashboard();
  setAddSpendingExpanded(false);
  await persistDashboardSilently();
}

function populateStates() {
  stateOptions.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.append(option);
  });
}

function refreshAllDeductions() {
  deductionKinds.forEach(deduction => {
    syncDeductionFields(deduction, getActiveDeductionMode(deduction));
    updateDeductionReflection(deduction);
  });
}

function setManualModeDisabledState(isManual) {
  const deductionCards = document.querySelectorAll('.deduction-card');

  deductionCards.forEach(card => {
    card.classList.toggle('manual-disabled', isManual);
  });

  taxSwitches.forEach(input => {
    input.disabled = isManual;
  });

  deductionInputs.forEach(input => {
    input.disabled = isManual;
  });

  if (extraWithholdingInput) {
    extraWithholdingInput.disabled = isManual;
  }

  if (summaryGrid) {
    summaryGrid.classList.toggle('manual-disabled', isManual);
  }

  if (breakdownCard) {
    breakdownCard.classList.toggle('manual-disabled', isManual);
  }

  if (stepThreeHelper) {
    stepThreeHelper.textContent = isManual
      ? 'This step stays in the flow, but the inputs are paused because your monthly net is already known.'
      : 'Some people think in yearly dollars. Others know their paycheck percentages. We support both.';
  }

  if (stepThreeManualNote) {
    stepThreeManualNote.hidden = !isManual;
  }

  if (stepFourHelper) {
    stepFourHelper.textContent = isManual
      ? 'We are using your entered monthly amount directly as the budget starting point.'
      : 'This preview becomes the starting point for your dashboard and monthly ledger.';
  }

  if (stepFourManualNote) {
    stepFourManualNote.hidden = !isManual;
  }
}

function updateMethodUI() {
  const isManual = currentMethod === 'manual';

  if (incomeInputLabel) {
    incomeInputLabel.textContent = isManual ? 'Estimated monthly income' : 'Annual salary';
  }

  if (annualSalaryInput) {
    annualSalaryInput.placeholder = isManual ? '$4,250' : '$85,000';
  }

  if (stepTwoHelper) {
    stepTwoHelper.textContent = isManual
      ? 'Enter the monthly take-home amount you want to budget from.'
      : 'We’ll use this to shape the first monthly income estimate.';
  }

  setManualModeDisabledState(isManual);
  updateSummary();
}

openAuthButtons.forEach(button => {
  button.addEventListener('click', event => {
    if (button === headerAuthButton && currentUser) {
      event.preventDefault();
      toggleHeaderMenu();
      return;
    }

    if (!button.dataset.openAuth) {
      return;
    }
    setAuthMode(button.dataset.openAuth);
    setRecoveryStage('request');
    clearAuthFeedback();
    openModal(authModal);
  });
});

profileNavButtons.forEach(button => {
  button.addEventListener('click', () => setProfileView(button.dataset.profileNav));
});

document.querySelectorAll('[data-open-profile-view]').forEach(button => {
  button.addEventListener('click', () => openProfileModal(button.dataset.openProfileView));
});

authToggles.forEach(toggle => {
  toggle.addEventListener('click', () => setAuthMode(toggle.dataset.authMode));
});

quickNextButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetStep = Number(button.dataset.quickNext);
    if (targetStep === currentStep) {
      nextStepButton.click();
    }
  });
});

passwordToggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const fieldWrap = button.closest('.password-field');
    const input = fieldWrap?.querySelector('input');
    if (!input) {
      return;
    }

    const isShowing = input.type === 'text';
    input.type = isShowing ? 'password' : 'text';
    button.setAttribute('aria-pressed', String(!isShowing));
    button.setAttribute('aria-label', isShowing ? 'Show password' : 'Hide password');
    button.innerHTML = `<span aria-hidden="true">${isShowing ? 'Show' : 'Hide'}</span>`;
  });
});

authForms.forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (authRequestInFlight) {
      return;
    }
    const formType = form.dataset.form;
    const isSignup = formType === 'signup';
    authRequestInFlight = true;
    setAuthFormLoading(form, true);

    try {
      const isValid = isSignup
        ? await handleSignupSubmit(form)
        : formType === 'recovery'
          ? await handleRecoverySubmit(form)
          : await handleLoginSubmit(form);
      if (!isValid) {
        return;
      }
      closeModal(authModal);
      const appState = await loadAppState();
      routeAuthenticatedUser(appState);
    } finally {
      authRequestInFlight = false;
      setAuthFormLoading(form, false);
    }
  });
});

authForgotPasswordButton?.addEventListener('click', async () => {
  setRecoveryStage('request');
  setAuthMode('recovery');
  const loginForm = authForgotPasswordButton.closest('form');
  const email = loginForm?.elements.email?.value.trim().toLowerCase();
  if (authRecoveryForm && email) {
    authRecoveryForm.elements.email.value = email;
  }
});

authRecoveryBackButton?.addEventListener('click', () => {
  if (authRecoveryForm) {
    authRecoveryForm.reset();
  }
  setRecoveryStage('request');
  setAuthMode('login');
});

methodButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentMethod = button.dataset.method;
    methodButtons.forEach(item => {
      const isActive = item.dataset.method === currentMethod;
      item.classList.toggle('option-card-active', isActive);
      item.setAttribute('aria-checked', String(isActive));
    });
    updateMethodUI();
  });
});

stepIndicators.forEach(indicator => {
  indicator.addEventListener('click', () => {
    openFlowStep(Number(indicator.dataset.stepIndicator));
  });

  indicator.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFlowStep(Number(indicator.dataset.stepIndicator));
    }
  });
});

taxSwitches.forEach(input => {
  input.addEventListener('change', () => {
    setDeductionTaxTreatment(input.dataset.taxSwitch, input.checked ? 'pretax' : 'posttax');
    updateSummary();
  });
});

deductionInputs.forEach(input => {
  input.addEventListener('focus', () => {
    setDeductionMode(input.dataset.deductionInput, input.dataset.mode);
    updateSummary();
  });

  input.addEventListener('input', () => {
    setDeductionMode(input.dataset.deductionInput, input.dataset.mode);
    syncDeductionFields(input.dataset.deductionInput, input.dataset.mode);
    updateDeductionReflection(input.dataset.deductionInput);
    updateSummary();
  });
});

[annualSalaryInput, payFrequencySelect, filingStatusSelect, stateSelect, extraWithholdingInput].forEach(field => {
  field.addEventListener('input', () => {
    refreshAllDeductions();
    updateSummary();
  });
  field.addEventListener('change', () => {
    refreshAllDeductions();
    updateSummary();
  });
});

nextStepButton.addEventListener('click', async () => {
  if (currentStep < 4) {
    previousStep = currentStep;
    currentStep += 1;
    updateFlowStep();
    return;
  }

  updateSummary();
  await saveOnboardingAndOpenLedger();
});

backStepButton.addEventListener('click', () => {
  if (currentStep > 1) {
    previousStep = currentStep;
    currentStep -= 1;
    updateFlowStep();
  }
});

document.addEventListener(
  'pointerdown',
  event => {
    if (event.button !== 0) {
      return;
    }

    const target = getClickMotionTarget(event.target);
    if (!target) {
      return;
    }

    playClickMotion(target);
  },
  true
);

document.addEventListener(
  'keydown',
  event => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    const target = getClickMotionTarget(event.target);
    if (!target) {
      return;
    }

    playClickMotion(target);
  },
  true
);

allocationSections?.addEventListener('click', handleAllocationInteraction);
allocationSections?.addEventListener('input', handleAllocationInput);
ledgerAssistantTrigger?.addEventListener('click', () => {
  if (!allocationState) {
    return;
  }
  openLedgerAssistant();
});
ledgerAssistantClose?.addEventListener('click', closeLedgerAssistant);
ledgerAssistantModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closeLedgerAssistant();
    return;
  }

  const option = event.target.closest('[data-assistant-choice]');
  if (!option) {
    return;
  }

  handleLedgerAssistantChoice(option.dataset.assistantChoice, option.dataset.assistantMulti === 'true');
});
ledgerAssistantBack?.addEventListener('click', handleLedgerAssistantBack);
ledgerAssistantNext?.addEventListener('click', handleLedgerAssistantNext);
allocationBackButton?.addEventListener('click', () => {
  previousStep = currentStep;
  currentStep = 4;
  updateFlowStep();
  showScreen('step-a');
});
allocationProceedButton?.addEventListener('click', () => {
  if (!allocationProceedButton.disabled) {
    openModal(allocationConfirmationModal);
  }
});

allocationConfirmCancelButton?.addEventListener('click', () => closeModal(allocationConfirmationModal));
allocationConfirmProceedButton?.addEventListener('click', async () => {
  allocationConfirmProceedButton.disabled = true;
  allocationConfirmProceedButton.textContent = 'Saving...';

  try {
    initializeDashboardScreen();
    await saveLedgerState();
    closeModal(allocationConfirmationModal);
    renderAllocationScreen();
    renderDashboard();
    showScreen('dashboard');
  } catch (error) {
    closeModal(allocationConfirmationModal);
    setAuthFeedback(authLoginFeedback, error.message, 'error');
    if (error.status === 401) {
      openModal(authModal);
    }
  } finally {
    allocationConfirmProceedButton.disabled = false;
    allocationConfirmProceedButton.textContent = 'Proceed & Save';
  }
});

allocationConfirmationModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closeModal(allocationConfirmationModal);
  }
});

authModalCloseButton?.addEventListener('click', () => closeModal(authModal));
authModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closeModal(authModal);
  }
});
profileModalCloseButton?.addEventListener('click', closeProfileModal);
profileModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closeProfileModal();
  }
});
profileAccountForm?.addEventListener('submit', handleAccountProfileSave);
transactionPushToggle?.addEventListener('change', handleTransactionPushToggleChange);
transactionPushTestButton?.addEventListener('click', sendTransactionPushTest);
instantAlertPreviewButton?.addEventListener('click', sendInstantAlertPreview);
profileDeleteAccountButton?.addEventListener('click', handleDeleteAccountRequest);
profileAccountConfirmCancelButton?.addEventListener('click', () => {
  profileState.pendingAccountPayload = null;
  closeModal(profileAccountConfirmModal);
});
profileAccountConfirmSaveButton?.addEventListener('click', confirmAccountProfileSave);
profileAccountConfirmModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget && !profileState.savingAccount) {
    profileState.pendingAccountPayload = null;
    closeModal(profileAccountConfirmModal);
  }
});
profileResetPasswordButton?.addEventListener('click', handleResetPasswordFromProfile);
headerSignoutButton?.addEventListener('click', handleSignOut);
profileUpgradeButton?.addEventListener('click', () => {
  beginStripeCheckout();
});
profileManagePremiumButton?.addEventListener('click', () => {
  openStripeBillingPortal();
});
profilePromoCodeButton?.addEventListener('click', handlePromoCodeRedeem);
profilePromoCodeInput?.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handlePromoCodeRedeem();
  }
});
profileOpenDashboardButton?.addEventListener('click', () => {
  closeProfileModal();
  showScreen('dashboard');
});
profileConnectBankButton?.addEventListener('click', async () => {
  closeProfileModal();
  showScreen('dashboard');
  await startPlaidLinkFlow();
});

dashboardBackButton?.addEventListener('click', () => showScreen('allocation'));
reviewRefreshButton?.addEventListener('click', syncPlaidTransactions);
plaidConnectButton?.addEventListener('click', handlePlaidDashboardToggle);
premiumBankClose?.addEventListener('click', closePremiumBankModal);
premiumBankCancel?.addEventListener('click', closePremiumBankModal);
premiumBankConfirm?.addEventListener('click', () => {
  closePremiumBankModal();
  beginStripeCheckout();
});
premiumBankModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closePremiumBankModal();
  }
});
plaidConnectedList?.addEventListener('click', event => {
  const disconnectButton = event.target.closest('[data-disconnect-plaid-account]');
  if (disconnectButton) {
    openPlaidDisconnectModal(disconnectButton.dataset.disconnectPlaidAccount);
  }
});
plaidCollapseButton?.addEventListener('click', () => {
  plaidCardExpanded = !plaidCardExpanded;
  renderPlaidSection();
});
addSpendingToggle?.addEventListener('click', () => {
  setAddSpendingExpanded(!addSpendingExpanded);
});
reviewQueueList?.addEventListener('click', event => {
  const removeButton = event.target.closest('[data-remove-review]');
  if (removeButton?.dataset.removeReview) {
    requestReviewRemoval(removeButton.dataset.removeReview);
    return;
  }

  const openButton = event.target.closest('[data-open-review-sheet]');
  if (openButton?.dataset.openReviewSheet) {
    openReviewSheet(openButton.dataset.openReviewSheet);
  }
});
transactionHistory?.addEventListener('click', event => {
  const editButton = event.target.closest('[data-edit-transaction]');
  if (editButton?.dataset.editTransaction) {
    openTransactionEditModal(editButton.dataset.editTransaction);
    return;
  }

  const removeButton = event.target.closest('[data-remove-transaction]');
  if (removeButton?.dataset.removeTransaction) {
    requestTransactionRemoval(removeButton.dataset.removeTransaction);
  }
});
reviewSheetModal?.addEventListener('click', event => {
  const option = event.target.closest('[data-review-category]');
  if (!option) {
    return;
  }
  reviewState.selectedCategoryId = option.dataset.reviewCategory;
  renderReviewSheet();
});
reviewSheetClose?.addEventListener('click', closeReviewSheet);
reviewSheetCancel?.addEventListener('click', closeReviewSheet);
reviewSheetSave?.addEventListener('click', approveActiveReview);
reviewSheetDismiss?.addEventListener('click', dismissActiveReview);
reviewSheetModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closeReviewSheet();
  }
});
plaidDisconnectClose?.addEventListener('click', closePlaidDisconnectModal);
plaidDisconnectCancel?.addEventListener('click', closePlaidDisconnectModal);
plaidDisconnectConfirm?.addEventListener('click', disconnectPlaidAccount);
plaidDisconnectModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closePlaidDisconnectModal();
  }
});
profileBankList?.addEventListener('click', event => {
  const disconnectButton = event.target.closest('[data-disconnect-plaid-account]');
  if (disconnectButton) {
    openPlaidDisconnectModal(disconnectButton.dataset.disconnectPlaidAccount);
  }
});
transactionForm?.addEventListener('submit', handleTransactionSubmit);

document.addEventListener('click', event => {
  if (!headerAccountMenu || headerAccountMenu.hidden) {
    return;
  }

  if (!event.target.closest('.header-account')) {
    closeHeaderMenu();
  }
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') {
    return;
  }

  if (headerAccountMenu && !headerAccountMenu.hidden) {
    closeHeaderMenu();
  }

  if (profileModal && !profileModal.hidden) {
    closeProfileModal();
  }

  if (premiumBankModal && !premiumBankModal.hidden) {
    closePremiumBankModal();
  }
});

window.addEventListener('focus', () => {
  refreshReviewDeepLinkFromUrl({ openDashboardIfNeeded: true });
});

window.addEventListener('pageshow', () => {
  refreshReviewDeepLinkFromUrl({ openDashboardIfNeeded: true });
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    refreshReviewDeepLinkFromUrl({ openDashboardIfNeeded: true });
  }
});

setAuthMode('signup');
setRecoveryStage('request');
pushState.supported = pushSupportedInBrowser();
pushState.permission = pushState.supported ? Notification.permission : 'default';
resetLedgerAssistantState();
renderLedgerAssistant();
renderPushAlertsUI();
registerPushServiceWorker();
loadCurrentUser();
populateStates();
stateSelect.value = 'Tennessee';
setDeductionTaxTreatment('401k', 'pretax');
setDeductionTaxTreatment('roth', 'posttax');
setDeductionTaxTreatment('hsa', 'pretax');
setDeductionTaxTreatment('extra-withholding', 'posttax');
deductionKinds.forEach(deduction => setDeductionMode(deduction, 'yearly'));
updateMethodUI();
updateFlowStep();
updateSummary();

transactionEditClose?.addEventListener('click', closeTransactionEditModal);
transactionEditCancel?.addEventListener('click', closeTransactionEditModal);
transactionEditSave?.addEventListener('click', saveTransactionEdit);
transactionEditRemove?.addEventListener('click', () => {
  if (transactionEditState.transactionId) {
    requestTransactionRemoval(transactionEditState.transactionId);
  }
});
transactionEditModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget?.dataset.closeModal === 'transaction-edit-modal') {
    closeTransactionEditModal();
  }
});
actionConfirmCancel?.addEventListener('click', closeActionConfirmModal);
actionConfirmProceed?.addEventListener('click', async () => {
  if (!actionConfirmState.onConfirm || actionConfirmState.saving) {
    return;
  }

  actionConfirmState.saving = true;
  actionConfirmProceed.disabled = true;
  actionConfirmProceed.textContent = 'Working...';
  try {
    const message = await actionConfirmState.onConfirm();
    closeActionConfirmModal();
    if (message) {
      if (transactionFeedback) {
        transactionFeedback.textContent = message;
      }
    }
  } catch (error) {
    if (actionConfirmFeedback) {
      actionConfirmFeedback.textContent = error.message || 'We could not complete that action.';
    }
    actionConfirmProceed.disabled = false;
    actionConfirmProceed.textContent = actionConfirmProceed.dataset.defaultLabel || 'Confirm';
    actionConfirmState.saving = false;
  }
});
actionConfirmModal?.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget?.dataset.closeModal === 'action-confirm-modal') {
    closeActionConfirmModal();
  }
});

reviewSheetCategoryToggle?.addEventListener('click', () => {
  reviewSheetCategoriesExpanded = !reviewSheetCategoriesExpanded;
  renderReviewSheet();
});
