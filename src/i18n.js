import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      title: "Classrooms Builder",
      dropHere: "Drop Excel File Here",
      preview: "Preview",
      resultsPreview: "Results Preview",
      downloadResults: "Download Results",
      clearResults: "Clear Results",
      buildClassrooms: "Build Classrooms",
      building: "Building...",
      downloadTemplate: "Download Template",
      chooseFile: "Choose File",
      numberOfClasses: "Number of Classes",
      clear: "Clear",
      class: "Class",
      summary: "Summary",
      downloading: "Downloading...",
    },
  },
  he: {
    translation: {
      title: "בונה כיתות",
      dropHere: "גרור קובץ אקסל לכאן",
      preview: "תצוגה מקדימה",
      resultsPreview: "תצוגת תוצאות",
      downloadResults: "הורד תוצאות",
      clearResults: "נקה תוצאות",
      buildClassrooms: "בנה כיתות",
      building: "בונה...",
      downloadTemplate: "הורד טמפלייט",
      chooseFile: "בחר קובץ",
      numberOfClasses: "מספר כיתות",
      clear: "נקה",
      class: "כיתה",
      summary: "סיכום",
      downloading: "...מוריד",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    direction: {
      he: "rtl",
      en: "ltr",
    },
  });

export default i18n;
