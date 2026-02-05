const loadLanguage = async (lang) => {
  try {
    const response = await fetch(`./src/lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      element.textContent = translations[key] || key;
    });

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  } catch (error) {
    console.error("Erro ao carregar idioma:", error);
  }
};

const languageSelect = document.getElementById("language-select");

languageSelect.addEventListener("change", (event) => {
  loadLanguage(event.target.value);
});

// idioma inicial
const savedLanguage = localStorage.getItem("lang") || "pt";
languageSelect.value = savedLanguage;
loadLanguage(savedLanguage);