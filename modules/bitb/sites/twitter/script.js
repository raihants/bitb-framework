const username = document.querySelector('#username');
const continueButton = document.querySelector('#continue');
const notice = document.querySelector('#notice');
const phoneStep = document.querySelector('#phone-step');
const loginStage = document.querySelector('#login-stage');
const downloadStep = document.querySelector('#download-step');
const passwordStep = document.querySelector('#password-step');
const passwordInput = document.querySelector('#password');
const passwordSubmit = document.querySelector('.password-submit');
const dialog = document.querySelector('.dialog');
const countryCode = document.querySelector('#country-code');
const countryPicker = document.querySelector('#country-picker');
const countryMenu = document.querySelector('#country-menu');
const countrySearch = document.querySelector('#country-search');
const countryList = document.querySelector('#country-list');
const privacyTrigger = document.querySelector('.privacy-trigger');
const privacyPopup = document.querySelector('#privacy-popup');
const phoneInput = phoneStep.querySelector('input[type="tel"]');
const phoneContinue = phoneStep.querySelector('.phone-continue');

const countries = [...countryCode.options].map((option) => {
  const [flag, code, ...name] = option.textContent.trim().split(' ');
  return { flag, code, name: name.join(' '), value: option.value };
});

function renderCountries(query = '') {
  countryList.replaceChildren();
  for (const country of countries.filter(({ name, code }) => `${name} ${code}`.toLowerCase().includes(query.toLowerCase()))) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'country-option';
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', String(countryCode.selectedOptions[0].textContent.includes(country.name)));
    const flag = document.createElement('span');
    flag.className = 'country-flag';
    flag.textContent = country.flag;
    const name = document.createElement('span');
    name.className = 'country-name';
    name.textContent = country.name;
    const code = document.createElement('span');
    code.textContent = country.code;
    item.append(flag, name, code);
    item.addEventListener('click', () => {
      const selected = [...countryCode.options].find((option) => option.textContent.includes(country.name));
      countryCode.selectedIndex = selected.index;
      document.querySelector('.country-selected').textContent = `${country.flag} ${country.code} ▾`;
      countryPicker.setAttribute('aria-label', `Select country, currently ${country.name} ${country.code}`);
      closeCountryMenu();
      phoneStep.querySelector('input[type="tel"]').focus();
    });
    countryList.append(item);
  }
}

function closeCountryMenu() {
  countryMenu.hidden = true;
  countryPicker.setAttribute('aria-expanded', 'false');
}

countryPicker.addEventListener('click', () => {
  privacyPopup.hidden = true;
  privacyTrigger.setAttribute('aria-expanded', 'false');
  countryMenu.hidden = !countryMenu.hidden;
  countryPicker.setAttribute('aria-expanded', String(!countryMenu.hidden));
  if (!countryMenu.hidden) {
    countrySearch.value = '';
    renderCountries();
    countrySearch.focus();
  }
});
countrySearch.addEventListener('input', () => renderCountries(countrySearch.value.trim()));
privacyTrigger.addEventListener('click', () => {
  closeCountryMenu();
  privacyPopup.hidden = !privacyPopup.hidden;
  privacyTrigger.setAttribute('aria-expanded', String(!privacyPopup.hidden));
});
document.querySelector('.privacy-switch').addEventListener('click', (event) => {
  const control = event.currentTarget;
  control.setAttribute('aria-checked', String(control.getAttribute('aria-checked') !== 'true'));
});
document.addEventListener('click', (event) => {
  if (!countryMenu.contains(event.target) && !countryPicker.contains(event.target)) closeCountryMenu();
  if (!privacyPopup.contains(event.target) && !privacyTrigger.contains(event.target)) {
    privacyPopup.hidden = true;
    privacyTrigger.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!countryMenu.hidden || !privacyPopup.hidden) {
      closeCountryMenu();
      privacyPopup.hidden = true;
      privacyTrigger.setAttribute('aria-expanded', 'false');
      countryPicker.focus();
    }
  }
});

username.addEventListener('input', () => {
  continueButton.disabled = !username.value.trim();
  notice.textContent = '';
});
phoneInput.addEventListener('input', () => {
  phoneContinue.disabled = !phoneInput.value.trim();
  phoneStep.querySelector('.phone-notice').textContent = '';
});
phoneContinue.addEventListener('click', () => {
  if (!phoneInput.value.trim()) return;
  phoneStep.querySelector('.phone-notice').textContent = 'SMS verification requires the original service. No phone number was submitted.';
});

document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const identifier = username.value.trim();
  if (!identifier) return;
  loginStage.hidden = true;
  dialog.scrollTop = 0;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
    downloadStep.hidden = false;
    downloadStep.querySelector('.stage-scroll').scrollTop = 0;
    document.activeElement?.blur();
  } else {
    document.querySelector('#password-username').value = identifier;
    passwordStep.hidden = false;
    passwordStep.querySelector('.stage-scroll').scrollTop = 0;
    passwordInput.focus({ preventScroll: true });
  }
});

passwordInput.addEventListener('input', () => {
  passwordSubmit.disabled = !passwordInput.value.trim();
  document.querySelector('#password-notice').textContent = '';
});

document.querySelector('#toggle-password').addEventListener('click', (event) => {
  const show = passwordInput.type === 'password';
  passwordInput.type = show ? 'text' : 'password';
  event.currentTarget.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  event.currentTarget.setAttribute('aria-pressed', String(show));
  passwordInput.focus();
});

document.querySelector('#password-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!passwordInput.value.trim()) return;
  passwordInput.value = '';
  passwordSubmit.disabled = true;
  document.querySelector('#password-notice').textContent = 'Sign-in requires the original service. No password was submitted.';
});

document.querySelector('#download-phone-choice').addEventListener('click', () => {
  downloadStep.hidden = true;
  phoneStep.hidden = false;
  phoneInput.focus({ preventScroll: true });
});

document.querySelector('#phone-choice').addEventListener('click', () => {
  loginStage.hidden = true;
  phoneStep.hidden = false;
  phoneInput.focus({ preventScroll: true });
});

document.querySelector('.back').addEventListener('click', () => {
  if (!phoneStep.hidden) {
    closeCountryMenu();
    privacyPopup.hidden = true;
    privacyTrigger.setAttribute('aria-expanded', 'false');
    phoneStep.hidden = true;
    phoneStep.querySelector('.phone-notice').textContent = '';
    loginStage.hidden = false;
    username.focus();
  } else if (!downloadStep.hidden || !passwordStep.hidden) {
    downloadStep.hidden = true;
    passwordStep.hidden = true;
    passwordInput.value = '';
    passwordInput.type = 'password';
    passwordSubmit.disabled = true;
    document.querySelector('#toggle-password').setAttribute('aria-label', 'Show password');
    document.querySelector('#toggle-password').setAttribute('aria-pressed', 'false');
    document.querySelector('#password-notice').textContent = '';
    loginStage.hidden = false;
    username.focus();
  }
});

let mockAuthPopup;
let mockAuthState;

window.addEventListener('message', (event) => {
  if (event.origin !== location.origin || event.source !== mockAuthPopup) return;
  const result = event.data;
  if (result?.type !== 'mock-oauth-callback' || result.state !== mockAuthState) return;
  if (result.status !== 'success' && result.status !== 'cancelled') return;
  if (result.status === 'success' && (typeof result.code !== 'string' || !result.code.startsWith('mock-'))) return;

  mockAuthState = undefined;
  mockAuthPopup = undefined;
  notice.textContent = result.status === 'success'
    ? 'Mock OAuth callback received. No real account was signed in.'
    : 'Mock OAuth sign-in cancelled.';
  window.dispatchEvent(new CustomEvent('mock-oauth-callback', { detail: result }));
});

// #google-choice handled later

document.querySelector('#apple-choice').addEventListener('click', () => {
  notice.textContent = 'Apple sign-in requires the original service.';
});

const qr = document.querySelector('#download-qr');
const svgElement = (tag, attributes) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, String(value));
  qr.append(element);
};
for (const [x, y] of [[20, 20], [320, 20], [20, 320]]) {
  svgElement('rect', { x, y, width: 70, height: 70, rx: 12, fill: 'currentColor' });
  svgElement('rect', { x: x + 10, y: y + 10, width: 50, height: 50, rx: 8, fill: 'white' });
  svgElement('rect', { x: x + 20, y: y + 20, width: 30, height: 30, rx: 6, fill: 'currentColor' });
}
const qrDots = [
  '8 9 12 13 14 15 16 17 18 21 22 24 25 26',
  '9 10 11 12 15 18 23 24 25',
  '8 12 13 14 18 20 21 23 24 26 27 28',
  '10 11 12 16 19 21 22 23 25 27 28',
  '8 11 18 19 20 25 26',
  '9 13 15 16 20 22 23 24 25 26 28',
  '8 10 12 14 16 18 20 22 24 26 28',
  '8 9 12 13 16 21 23 24 25 27 28',
  '5 6 14 15 16 17 20 21 22 24 26 28 30 32 34 36',
  '3 4 9 13 14 15 19 20 22 23 24 25 26 28 31 32 33',
  '0 2 3 4 5 6 8 9 10 13 14 16 18 19 20 24 25 26 27 28 30 31 35 36',
  '0 1 3 5 8 9 11 14 15 17 18 19 20 22 23 24 26 30 31 33 35',
  '0 1 4 6 8 9 10 11 27 30 35 36',
  '0 2 3 5 8 9 11 27 28 29 31 34',
  '2 3 6 7 8 11 27 28 29 31 33 36',
  '0 4 5 8 10 11 27 29 30 32 33 34 36',
  '3 4 5 6 8 10 25 26 30 32 34',
  '1 3 5 8 9 10 26 27 28 31 33 34',
  '0 3 4 5 6 8 9 10 11 25 27 29 30 33 36',
  '0 3 4 9 11 27 28 30 31 32 33',
  '5 6 7 8 25 26 29 30 31 32 33 34 35 36',
  '0 1 3 4 5 9 10 11 26 27 28 29 31 32 35',
  '1 2 6 10 27 29 30 33 36',
  '2 4 5 8 10 11 26 27 29 30 31 33 35 36',
  '0 3 6 8 9 25 26 28 29 30 34 36',
  '0 2 3 5 7 8 10 11 12 13 14 16 17 20 21 24 25 26 28 30 31 33',
  '0 4 5 6 9 11 13 17 21 22 26 30 32 33 35 36',
  '0 3 5 7 10 11 14 19 20 21 24 27 29 32 33 34',
  '0 4 5 6 7 8 13 15 16 18 19 21 24 25 28 29 30 31 32 34 35',
  '8 11 12 15 17 18 21 22 23 27 28 32 33 35',
  '11 13 17 21 22 23 24 25 27 28 30 32 33 34 36',
  '8 9 10 11 13 14 15 16 18 20 21 22 23 24 26 27 28 32 33',
  '9 11 14 16 17 18 22 24 25 26 27 28 29 30 31 32 34 35',
  '10 12 14 15 16 22 25 26 28 30 34',
  '9 10 11 12 13 20 21 22 23 24 25 26 27 29 31 34 36',
  '9 10 13 15 16 19 20 22 23 26 27 28 29 31 32 33 36',
  '9 10 11 12 14 15 18 19 21 27 28 33 36',
];
qrDots.forEach((row, y) => row.split(' ').forEach((x) => {
  svgElement('circle', { cx: 25 + Number(x) * 10, cy: 25 + y * 10, r: 4.25, fill: 'currentColor' });
}));
svgElement('rect', { x: 160, y: 160, width: 90, height: 90, fill: 'white' });
svgElement('path', {
  d: 'M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z',
  transform: 'translate(160 160) scale(3.75)', fill: 'currentColor',
});

username.focus({ preventScroll: true });

// ==============================================================
// 1. VARIABEL ELEMEN DOM BITB
// ==============================================================
var overlay = document.getElementById('overlay');
var popup = document.getElementById('bitb-window');
var fakeUrl = document.getElementById('fake-url');

var closeBtn = document.getElementById('btn-close');
var maxBtn = document.getElementById('btn-maximize');
var minBtn = document.getElementById('btn-minimize');

var viewContainer = document.getElementById('view-container');
var loadingSimulator = document.getElementById('loading-simulator');

var googleView = document.getElementById('google-view');

// Form Google
var gEmailStep = document.getElementById('g-step-email');
var gPasswordStep = document.getElementById('g-step-password');
var gEmailForm = document.getElementById('g-demo-form');
var gPasswordForm = document.getElementById('g-password-form');
var gEmailInput = document.getElementById('g-email-input');
var gPasswordInput = document.getElementById('g-password-input');
var gDisplayEmail = document.getElementById('g-display-email');
var btnBackEmail = document.getElementById('btn-back-email');

// ==============================================================
// 3. FUNGSI HELPER GOOGLE UI
// ==============================================================
function showGoogleStep(activeStep) {
  gEmailStep.classList.add('hidden');
  gPasswordStep.classList.add('hidden');
  activeStep.classList.remove('hidden');
}

function clearGError(inputEl) {
  inputEl.classList.remove('error');
  var parent = inputEl.parentElement;
  var existingError = parent.querySelector('.g-error-msg');
  if (existingError) existingError.remove();
}

function showGError(inputEl, message) {
  clearGError(inputEl);
  var error = document.createElement('div');
  error.className = 'g-error-msg';
  error.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#b3261e"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg> <span>' + message + '</span>';
  inputEl.classList.add('error');
  inputEl.parentElement.appendChild(error);
}

// ==============================================================
// 4. PEMICU POPUP BROWSER (EFEK LOADING REALISTIS)
// ==============================================================
document.querySelector('#google-choice').addEventListener('click', function(e) {
    e.preventDefault();

    googleView.classList.add('hidden');
    viewContainer.style.display = 'none';
    loadingSimulator.style.display = 'block';

    fakeUrl.innerHTML = '<span class="url-dim">https://</span><span class="url-highlight">accounts.google.com</span><span class="url-dim">/v3/signin/identifier?app_domain=https%...</span>';
    googleView.classList.remove('hidden');
    gEmailInput.value = ''; gPasswordInput.value = '';
    clearGError(gEmailInput); clearGError(gPasswordInput);
    showGoogleStep(gEmailStep);

    popup.classList.remove('minimized', 'maximized');
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.top = '50%'; popup.style.left = '50%';

    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');

    setTimeout(() => {
        loadingSimulator.style.display = 'none';
        viewContainer.style.display = 'flex';
        gEmailInput.focus();
    }, 600);
});

// ==============================================================
// 5. KONTROL JENDELA
// ==============================================================
function closePopup() {
    overlay.classList.add('hidden');
    popup.classList.add('hidden');
}

function maximizePopup() {
    if (popup.classList.contains('minimized')) popup.classList.remove('minimized');
    popup.classList.toggle('maximized');
}

function minimizePopup() {
    if (popup.classList.contains('maximized')) popup.classList.remove('maximized');
    popup.classList.toggle('minimized');
}

closeBtn.addEventListener('click', closePopup);
maxBtn.addEventListener('click', maximizePopup);
minBtn.addEventListener('click', minimizePopup);
overlay.addEventListener('click', closePopup);

// ==============================================================
// 6. LOGIKA FORM GOOGLE
// ==============================================================
gEmailForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var emailVal = gEmailInput.value.trim();
  var gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!emailVal) { showGError(gEmailInput, 'Enter an email or phone number'); return; }
  if (!gmailRegex.test(emailVal)) { showGError(gEmailInput, "Couldn't find your Google Account (Must use @gmail.com)"); return; }

  clearGError(gEmailInput);
  gDisplayEmail.textContent = emailVal;

  viewContainer.style.opacity = '0';
  setTimeout(() => {
      showGoogleStep(gPasswordStep);
      viewContainer.style.opacity = '1';
      gPasswordInput.focus();
  }, 400);
});

btnBackEmail.addEventListener('click', function() {
  gPasswordInput.value = '';
  clearGError(gPasswordInput);
  viewContainer.style.opacity = '0';
  setTimeout(() => {
      showGoogleStep(gEmailStep);
      viewContainer.style.opacity = '1';
  }, 300);
});

gPasswordForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var passVal = gPasswordInput.value;

  if (!passVal || passVal.length < 8) {
    showGError(gPasswordInput, 'Wrong password. Try again or click Forgot password to reset it.');
    return;
  }

  clearGError(gPasswordInput);

  alert('Logged in as: ' + gEmailInput.value);
  closePopup();
});

gEmailInput.addEventListener('input', function() { clearGError(gEmailInput); });
gPasswordInput.addEventListener('input', function() { clearGError(gPasswordInput); });

// ==============================================================
// 8. FITUR DRAG-AND-DROP WINDOW HALUS
// ==============================================================
var titlebar = document.getElementById('bitb-titlebar');
var dragging = false;
var dragOffsetX = 0;
var dragOffsetY = 0;

titlebar.addEventListener('mousedown', function(e) {
  if (e.target.closest('.win-controls') ||
      e.target.closest('.address-bar') ||
      popup.classList.contains('maximized') ||
      popup.classList.contains('minimized')) return;

  dragging = true;
  var rect = popup.getBoundingClientRect();
  popup.style.transform = 'none';
  popup.style.left = rect.left + 'px';
  popup.style.top = rect.top + 'px';

  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  popup.style.transition = 'none';
  e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
  if (!dragging) return;
  popup.style.left = (e.clientX - dragOffsetX) + 'px';
  popup.style.top  = (e.clientY - dragOffsetY) + 'px';
});

document.addEventListener('mouseup', function () {
  if (dragging) {
    dragging = false;
    popup.style.transition = 'opacity 0.15s ease-out';
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !popup.classList.contains('hidden')) {
    closePopup();
  }
});
