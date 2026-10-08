// Klon halaman Masuk HBO Max — pertukaran langkah, toggle kata sandi, validasi.

(function () {
  "use strict";

  var steps = document.querySelectorAll(".step");
  var emailForm = document.getElementById("email-form");
  var passwordForm = document.getElementById("password-form");
  var emailInput = document.getElementById("sign-in-phoneEmail-input");
  var readOnlyEmail = document.getElementById("sign-in-password-email-input");
  var editEmail = document.getElementById("edit-email");
  var passwordInput = document.getElementById("sign-in-password-password-input");
  var passwordToggle = document.getElementById("field-button-sign-in-password-password-input");

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_RE = /^\+?[0-9][0-9\s().-]{5,}$/;

  function showStep(name) {
    Array.prototype.forEach.call(steps, function (step) {
      step.hidden = step.getAttribute("data-step") !== name;
    });
  }

  // Langkah 1 tidak punya wadah pesan galat di markup aslinya; pesan dibuat
  // sekali di sini supaya galat bisa ditampilkan persis di bawah judul.

  function alertSlot(form) {
    var slot = form.querySelector('[role="alert"]');
    if (slot) return slot;

    slot = document.createElement("div");
    slot.setAttribute("role", "alert");
    form.insertBefore(slot, form.firstChild);
    return slot;
  }

  function setError(form, message) {
    var slot = alertSlot(form);
    slot.textContent = message;
    slot.hidden = !message;

    var field = form.querySelector(".text-input-wrapper");
    if (!field) return;
    if (message) field.classList.add("has-error");
    else field.classList.remove("has-error");
  }

  function isBlank(value) {
    return value.trim().length === 0;
  }

  emailForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var value = emailInput.value.trim();
    if (isBlank(value) || !(EMAIL_RE.test(value) || PHONE_RE.test(value))) {
      setError(emailForm, "Masukkan alamat surel atau nomor ponsel yang valid.");
      emailInput.focus();
      return;
    }

    setError(emailForm, "");
    readOnlyEmail.value = value;
    if (EMAIL_RE.test(value)) readOnlyEmail.type = "email";
    else readOnlyEmail.type = "text";

    showStep("password");
    passwordInput.focus();
  });

  editEmail.addEventListener("click", function () {
    showStep("email");
    emailInput.focus();
  });

  editEmail.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      editEmail.click();
    }
  });

  passwordToggle.addEventListener("click", function () {
    var reveal = passwordInput.type === "password";

    passwordInput.type = reveal ? "text" : "password";
    passwordToggle.setAttribute("aria-pressed", reveal ? "true" : "false");
    passwordToggle.setAttribute("aria-label", reveal ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
    passwordToggle.classList.toggle("password-visible", reveal);
  });

  passwordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isBlank(passwordInput.value)) {
      setError(passwordForm, "Masukkan kata sandimu.");
      passwordInput.focus();
      return;
    }

    setError(passwordForm, "");
  });

  passwordInput.addEventListener("input", function () {
    passwordInput.classList.toggle("filled", passwordInput.value.length > 0);
    if (!isBlank(passwordInput.value)) setError(passwordForm, "");
  });

  emailInput.addEventListener("input", function () {
    if (!isBlank(emailInput.value)) setError(emailForm, "");
  });
})();
