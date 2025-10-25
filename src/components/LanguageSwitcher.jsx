import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Set initial dir attribute on mount and when language changes
  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n.language]);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "he" : "en";
    i18n.changeLanguage(newLang);
  };

  const getFlagIcon = () => {
    if (i18n.language === "he") {
      return "🇮🇱"; // Israeli flag
    }
    return "🇬🇧"; // British flag
  };

  return (
    <button
      className="language-button"
      onClick={handleLanguageToggle}
      title={i18n.language === "en" ? "Switch to Hebrew" : "Switch to English"}
    >
      {getFlagIcon()}
    </button>
  );
};

export default LanguageSwitcher;
