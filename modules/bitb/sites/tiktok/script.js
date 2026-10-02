(() => {
  const states = [...document.querySelectorAll("[data-state]")];
  const buttons = [...document.querySelectorAll("[data-go]")];
  const forms = [...document.querySelectorAll("form")];

  const show = (name) => {
    states.forEach((state) => state.classList.toggle("active", state.dataset.state === name));
    document.querySelector(".shell")?.scrollTo({ top: 0, behavior: "instant" });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => show(button.dataset.go));
  });

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());
  });

})();
