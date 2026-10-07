(() => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const toast = document.querySelector('.toast');
  let toastTimer;

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  function selectTab(tab) {
    tabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle('is-active', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
      item.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
      selectTab(nextTab);
      nextTab.focus();
    });
  });

  document.querySelector('.email-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');

    if (!input.value.trim()) {
      input.focus();
      showToast('Enter an email address to preview the next step. Nothing will be sent.');
      return;
    }

    showToast('Demo only — account details were not sent or stored.');
    input.value = '';
  });

  document.querySelectorAll('[data-provider]').forEach((button) => {
    button.addEventListener('click', () => {
      showToast(`${button.dataset.provider} sign-in is disabled in this local visual demo.`);
    });
  });

  document.querySelector('.guest-link').addEventListener('click', () => {
    showToast('Guest mode is simulated locally. No account session was created.');
  });

  document.querySelector('.nav-sign-in').addEventListener('click', () => {
    window.location.href = 'auth.html';
  });

  document.querySelector('.app-switcher').addEventListener('click', () => {
    showToast('The Adobe app switcher is not connected in this local demo.');
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });

  document.querySelectorAll('.footer-settings button, .legal-links button').forEach((button) => {
    button.addEventListener('click', () => {
      showToast('This control is included for visual fidelity and does not change browser settings.');
    });
  });
})();

  const emailInput = document.querySelector('#email');
  const continueButton = document.querySelector('.continue-button');
  if (emailInput && continueButton) {
    emailInput.addEventListener('input', () => {
      continueButton.disabled = emailInput.value.trim() === '';
    });
  }
