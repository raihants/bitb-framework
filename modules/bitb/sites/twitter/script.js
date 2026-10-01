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

document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const identifier = username.value.trim();
  if (!identifier) return;
  loginStage.hidden = true;
  dialog.scrollTop = 0;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
    downloadStep.hidden = false;
    downloadStep.querySelector('.stage-scroll').scrollTop = 0;
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
  phoneStep.querySelector('input[type="tel"]').focus();
});

document.querySelector('#phone-choice').addEventListener('click', () => {
  loginStage.hidden = true;
  phoneStep.hidden = false;
  phoneStep.querySelector('input[type="tel"]').focus();
});

document.querySelector('.back').addEventListener('click', () => {
  if (!phoneStep.hidden) {
    closeCountryMenu();
    privacyPopup.hidden = true;
    privacyTrigger.setAttribute('aria-expanded', 'false');
    phoneStep.hidden = true;
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

document.querySelector('#google-choice').addEventListener('click', () => {
  mockAuthState = crypto.randomUUID();
  const url = new URL('mock-auth.html', location.href);
  url.searchParams.set('state', mockAuthState);
  mockAuthPopup = window.open(url.href, 'local-auth-demo', 'popup,width=520,height=650');
  if (!mockAuthPopup) {
    mockAuthState = undefined;
    notice.textContent = 'Allow pop-ups to test local authentication.';
  }
});

document.querySelector('#apple-choice').addEventListener('click', () => {
  notice.textContent = 'Apple sign-in requires the original service.';
});

const qr = document.querySelector('#download-qr');
for (let y = 0; y < 33; y++) {
  for (let x = 0; x < 33; x++) {
    const finder = [[0, 0], [26, 0], [0, 26]].some(([fx, fy]) => {
      const dx = x - fx;
      const dy = y - fy;
      return dx >= 0 && dx < 7 && dy >= 0 && dy < 7 &&
        (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
    });
    const emptyFinder = [[0, 0], [26, 0], [0, 26]].some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7);
    const center = x >= 12 && x <= 20 && y >= 12 && y <= 20;
    if (!finder && (emptyFinder || center || (x * 37 + y * 61 + x * y * 11) % 7 > 3)) continue;
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', String(x * 6 + 14));
    dot.setAttribute('cy', String(y * 6 + 14));
    dot.setAttribute('r', finder ? '2.8' : '2.1');
    dot.setAttribute('fill', 'currentColor');
    qr.append(dot);
  }
}
const mark = document.createElementNS('http://www.w3.org/2000/svg', 'text');
mark.setAttribute('x', '110');
mark.setAttribute('y', '125');
mark.setAttribute('text-anchor', 'middle');
mark.setAttribute('font-size', '46');
mark.setAttribute('fill', 'currentColor');
mark.textContent = '𝕏';
qr.append(mark);

username.focus({ preventScroll: true });
