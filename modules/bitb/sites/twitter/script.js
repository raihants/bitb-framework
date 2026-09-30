const username = document.querySelector('#username');
const continueButton = document.querySelector('#continue');
const notice = document.querySelector('#notice');
const phoneStep = document.querySelector('#phone-step');
const loginStep = document.querySelector('#login-step');
const header = document.querySelector('.header');
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
  if (!username.value.trim()) return;
  notice.textContent = 'This is a local preview. Sign-in requires the original service.';
});

document.querySelector('#phone-choice').addEventListener('click', () => {
  loginStep.hidden = true;
  header.hidden = true;
  phoneStep.hidden = false;
  phoneStep.querySelector('input[type="tel"]').focus();
});

document.querySelector('.back').addEventListener('click', () => {
  if (!phoneStep.hidden) {
    closeCountryMenu();
    privacyPopup.hidden = true;
    privacyTrigger.setAttribute('aria-expanded', 'false');
    phoneStep.hidden = true;
    header.hidden = false;
    loginStep.hidden = false;
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

username.focus({ preventScroll: true });
