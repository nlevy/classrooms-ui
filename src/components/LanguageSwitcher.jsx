import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    document.dir = i18n.dir();
  };

  return (
    <select 
      className="language-select"
      value={i18n.language}
      onChange={handleLanguageChange}
      title="Change language"
    >
      <option value="en" style={{ textAlign: 'center' }}>En</option>
      <option value="he" style={{ textAlign: 'center' }}>עב</option>
    </select>
  );
};

export default LanguageSwitcher; 