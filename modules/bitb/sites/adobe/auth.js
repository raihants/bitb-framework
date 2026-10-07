(() => {
  const steps = {
    email: document.querySelector('[data-step="email"]'),
    password: document.querySelector('[data-step="password"]'),
  };

  const emailForm = document.getElementById('email-form');
  const emailInput = document.getElementById('email');
  const accountEmail = document.getElementById('account-email');
  const passwordForm = document.getElementById('password-form');
  const passwordInput = document.getElementById('password');
  const passwordToggle = document.querySelector('.password-toggle');
  const differentAccount = document.getElementById('different-account');

  function showStep(name, email) {
    if (email) accountEmail.textContent = email;
    Object.entries(steps).forEach(([key, element]) => {
      element.hidden = key !== name;
    });
  }

  emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    if (!email) {
      emailInput.focus();
      return;
    }
    showStep('password', email);
  });

  passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!passwordInput.value) passwordInput.focus();
  });

  passwordToggle.addEventListener('click', () => {
    const revealed = passwordInput.type === 'text';
    passwordInput.type = revealed ? 'password' : 'text';
    passwordToggle.setAttribute('aria-pressed', String(!revealed));
    passwordToggle.setAttribute('aria-label', revealed ? 'Show password' : 'Hide password');
  });

  differentAccount.addEventListener('click', (event) => {
    event.preventDefault();
    showStep('email');
    passwordInput.value = '';
    emailInput.focus();
  });

  document.querySelectorAll('[data-provider]').forEach((button) => {
    button.addEventListener('click', () => {
      window.alert(`${button.dataset.provider} sign-in is not connected in this local demo.`);
    });
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
