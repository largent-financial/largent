const screens = [...document.querySelectorAll('.screen')];
const authToggles = [...document.querySelectorAll('[data-auth-mode]')];
const authForms = [...document.querySelectorAll('.auth-form')];
const openAuthButtons = [...document.querySelectorAll('[data-open-auth]')];
const headerAuthButton = document.getElementById('header-auth-button');
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
const dashboardMainRemaining = document.getElementById('dashboard-main-remaining');
const dashboardTotalAllocated = document.getElementById('dashboard-total-allocated');
const dashboardTotalSpent = document.getElementById('dashboard-total-spent');
const dashboardLeftToSpend = document.getElementById('dashboard-left-to-spend');
const dashboardStatusPill = document.getElementById('dashboard-status-pill');
const dashboardBackButton = document.getElementById('dashboard-back');
const allocationDonut = document.getElementById('allocation-donut');
const allocationDonutTotal = document.getElementById('allocation-donut-total');
const allocationLegend = document.getElementById('allocation-legend');
const trackingSections = document.getElementById('tracking-sections');
const transactionForm = document.getElementById('transaction-form');
const transactionAmountInput = document.getElementById('transaction-amount');
const transactionDateInput = document.getElementById('transaction-date');
const transactionCategorySelect = document.getElementById('transaction-category');
const transactionMemoInput = document.getElementById('transaction-memo');
const transactionFeedback = document.getElementById('transaction-feedback');
const transactionHistory = document.getElementById('transaction-history');

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

const chartPalette = ['#62de6a', '#35bc40', '#1f7a2b', '#a7eaad', '#f5cd47', '#85c5ff', '#ef8b65', '#b6ebb9'];
const CURRENT_USER_STORAGE_KEY = 'largent-current-user';

const defaultAllocationSections = [
  {
    id: 'assets',
    title: 'Assets',
    categories: ['Investments', 'Emergency Savings', 'Short Term Savings', 'Longterm / Home Savings']
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

function showScreen(screenName) {
  screens.forEach(screen => {
    const isActive = screen.dataset.screen === screenName;
    screen.classList.toggle('screen-active', isActive);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  nextStepButton.textContent = currentStep === 4 ? 'Go To Ledger' : 'Next';

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
        title: category.title,
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
}

function initializeAllocationScreen() {
  const results = calculateResults();
  allocationState = cloneExistingAllocationState(results.monthlyNet);
  renderAllocationScreen();
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

function getAllocationChartItems() {
  if (!dashboardState) {
    return [];
  }

  const totalAllocated = getDashboardAllocatedTotal();
  if (!totalAllocated) {
    return [];
  }

  return getDashboardCategories()
    .filter(category => category.allocated > 0 && category.title.trim())
    .sort((left, right) => right.allocated - left.allocated)
    .map((category, index) => ({
      ...category,
      color: chartPalette[index % chartPalette.length],
      percent: (category.allocated / totalAllocated) * 100
    }));
}

function renderAllocationChart() {
  if (!allocationDonut || !allocationLegend || !allocationDonutTotal) {
    return;
  }

  const totalAllocated = getDashboardAllocatedTotal();
  const items = getAllocationChartItems();

  allocationDonutTotal.textContent = formatCurrencyPrecise(totalAllocated);

  if (!items.length) {
    allocationDonut.style.background = 'conic-gradient(#eef3ed 0deg 360deg)';
    allocationLegend.innerHTML = `
      <div class="allocation-legend-empty">
        <strong>No allocations yet.</strong>
        <span>Once your ledger has values, the chart will show your category mix here.</span>
      </div>
    `;
    return;
  }

  let currentAngle = 0;
  const gradientStops = items.map(item => {
    const start = currentAngle;
    const degrees = (item.percent / 100) * 360;
    currentAngle += degrees;
    return `${item.color} ${start}deg ${currentAngle}deg`;
  });

  allocationDonut.style.background = `conic-gradient(${gradientStops.join(', ')})`;
  allocationLegend.innerHTML = items
    .map(item => `
      <button
        class="allocation-legend-item${selectedDashboardCategoryId === item.id ? ' allocation-legend-item-active' : ''}"
        type="button"
        data-highlight-category-id="${item.id}"
        aria-pressed="${selectedDashboardCategoryId === item.id ? 'true' : 'false'}"
      >
        <span class="allocation-legend-swatch" style="background:${item.color}"></span>
        <div class="allocation-legend-copy">
          <strong>${item.title}</strong>
          <span>${formatCurrencyPrecise(item.allocated)} · ${formatPercent(roundToCents(item.percent))}</span>
        </div>
      </button>
    `)
    .join('');
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
  dashboardMainRemaining.textContent = formatCurrencyPrecise(remaining);
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
        <div>
          <strong>${transaction.categoryTitle}</strong>
          <span>${formatHistoryDate(transaction.date)}${transaction.memo ? ` · ${transaction.memo}` : ''}</span>
        </div>
        <strong>${formatCurrencyPrecise(transaction.amount)}</strong>
      </article>
    `)
    .join('');
}

function renderDashboard() {
  if (!dashboardState) {
    return;
  }

  renderDashboardSummary();
  renderAllocationChart();
  renderTransactionCategoryOptions();
  renderTrackingSections();
  renderTransactionHistory();
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
    }
  }, 220);
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
    const payload = await apiRequest('/api/auth/me');
    saveCurrentUser(payload.user || null);
  } catch {
    saveCurrentUser(null);
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

  if (currentUser?.firstName && currentUser?.lastName) {
    headerAuthButton.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    headerAuthButton.removeAttribute('data-open-auth');
    headerAuthButton.classList.add('header-link-user');
    headerAuthButton.setAttribute('aria-label', `Signed in as ${currentUser.firstName} ${currentUser.lastName}`);
    return;
  }

  headerAuthButton.textContent = 'Log In';
  headerAuthButton.setAttribute('data-open-auth', 'login');
  headerAuthButton.classList.remove('header-link-user');
  headerAuthButton.setAttribute('aria-label', 'Log In');
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
      body: { firstName, lastName, email, password, confirmPassword }
    });
    saveCurrentUser(payload.user);
    setAuthFeedback(authSignupFeedback, payload.message || 'Account created successfully.', 'success');
    return true;
  } catch (error) {
    setAuthFeedback(authSignupFeedback, error.message, 'error');
    if (error.status === 409) {
      setAuthMode('login');
    }
    return false;
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

  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(parsed);
}

function handleTransactionSubmit(event) {
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
  transactionAmountInput.focus();
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
  button.addEventListener('click', () => {
    if (!button.dataset.openAuth) {
      return;
    }
    setAuthMode(button.dataset.openAuth);
    openModal(authModal);
  });
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
      showScreen('step-a');
      currentStep = 1;
      updateFlowStep();
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

nextStepButton.addEventListener('click', () => {
  if (currentStep < 4) {
    previousStep = currentStep;
    currentStep += 1;
    updateFlowStep();
    return;
  }

  updateSummary();
  initializeAllocationScreen();
  showScreen('allocation');
});

backStepButton.addEventListener('click', () => {
  if (currentStep > 1) {
    previousStep = currentStep;
    currentStep -= 1;
    updateFlowStep();
  }
});

allocationSections?.addEventListener('click', handleAllocationInteraction);
allocationSections?.addEventListener('input', handleAllocationInput);
allocationBackButton?.addEventListener('click', () => showScreen('step-a'));
allocationProceedButton?.addEventListener('click', () => {
  if (!allocationProceedButton.disabled) {
    openModal(allocationConfirmationModal);
  }
});

allocationConfirmCancelButton?.addEventListener('click', () => closeModal(allocationConfirmationModal));
allocationConfirmProceedButton?.addEventListener('click', () => {
  initializeDashboardScreen();
  closeModal(allocationConfirmationModal);
  showScreen('dashboard');
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

dashboardBackButton?.addEventListener('click', () => showScreen('allocation'));
allocationLegend?.addEventListener('click', handleAllocationLegendInteraction);
transactionForm?.addEventListener('submit', handleTransactionSubmit);

setAuthMode('signup');
setRecoveryStage('request');
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
