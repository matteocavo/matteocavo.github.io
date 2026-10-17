window.setLanguage = function setLanguage(lang) {
  window.CURRENT_LANG = lang;
  localStorage.setItem("portfolio-lang", lang);

  const btnIt = document.getElementById("lang-it");
  const btnEn = document.getElementById("lang-en");
  btnIt.setAttribute("aria-pressed", lang === "it");
  btnEn.setAttribute("aria-pressed", lang === "en");

  window.renderPortfolio();
};

window.setupLanguageToggle = function setupLanguageToggle() {
  document.getElementById("lang-it").addEventListener("click", () => window.setLanguage("it"));
  document.getElementById("lang-en").addEventListener("click", () => window.setLanguage("en"));
};
