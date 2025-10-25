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
      // Landing page translations
      landingTitle: "Classrooms Builder",
      heroTitle: "Smart Classroom Organization Made Simple",
      heroDescription:
        "Automatically create balanced classroom groups based on student data, friendships, and academic performance. Upload your Excel file and let our algorithm do the work.",
      getStarted: "Get Started",
      featuresTitle: "Key Features",
      feature1Title: "Excel Integration",
      feature1Description: "Simply upload your student data in Excel format",
      feature2Title: "Balanced Classes",
      feature2Description:
        "Automatically balance academic and behavioral performance",
      feature3Title: "Friend Preferences",
      feature3Description:
        "Respect student friendship requests and separation needs",
      feature4Title: "Instant Results",
      feature4Description: "Download organized classroom lists immediately",
      howItWorksTitle: "How It Works",
      step1Title: "Download Template",
      step1Description:
        "Get our Excel template with the required student data fields",
      step2Title: "Fill Student Data",
      step2Description:
        "Add student names, performance levels, and friendship preferences",
      step3Title: "Upload & Process",
      step3Description:
        "Upload your file and select the number of classes needed",
      step4Title: "Download Results",
      step4Description:
        "Get your balanced classroom assignments in Excel format",
      backToHome: "Back to Home",
      // File upload feedback
      file: "File",
      students: "Students",
      errorInvalidFileType: "Invalid file type. Please upload an Excel file (.xlsx)",
      errorEmptyFile: "The file appears to be empty. Please check your file and try again.",
      errorMissingColumns: "Missing required columns",
      errorUploadFailed: "Upload failed. Please try again.",
      errorProcessingFile: "Error processing file. Please ensure it's a valid Excel file.",
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
      // Landing page translations
      landingTitle: "בונה כיתות",
      heroTitle: "ארגון כיתות חכם ופשוט",
      heroDescription:
        "צור קבוצות כיתה מאוזנות באופן אוטומטי על בסיס נתוני תלמידים, חברויות וביצועים אקדמיים. העלה את קובץ האקסל שלך ותן לאלגוריתם שלנו לעשות את העבודה.",
      getStarted: "בואו נתחיל",
      featuresTitle: "תכונות מרכזיות",
      feature1Title: "אינטגרציה עם אקסל",
      feature1Description: "פשוט העלה את נתוני התלמידים בפורמט אקסל",
      feature2Title: "כיתות מאוזנות",
      feature2Description: "איזון אוטומטי של ביצועים אקדמיים והתנהגותיים",
      feature3Title: "העדפות חברות",
      feature3Description: "כיבוד בקשות חברות של תלמידים וצרכי הפרדה",
      feature4Title: "תוצאות מיידיות",
      feature4Description: "הורד רשימות כיתות מאורגנות מיד",
      howItWorksTitle: "איך זה עובד",
      step1Title: "הורד תבנית",
      step1Description: "קבל את תבנית האקסל שלנו עם שדות הנתונים הנדרשים",
      step2Title: "מלא נתוני תלמידים",
      step2Description: "הוסף שמות תלמידים, רמות ביצועים והעדפות חברות",
      step3Title: "העלה ועבד",
      step3Description: "העלה את הקובץ שלך ובחר את מספר הכיתות הנדרש",
      step4Title: "הורד תוצאות",
      step4Description: "קבל את הקצאות הכיתות המאוזנות שלך בפורמט אקסל",
      backToHome: "חזור לעמוד הבית",
      // File upload feedback
      file: "קובץ",
      students: "תלמידים",
      errorInvalidFileType: "סוג קובץ לא תקין. אנא העלה קובץ אקסל",
      errorEmptyFile: "הקובץ נראה ריק. אנא בדוק את הקובץ ונסה שוב",
      errorMissingColumns: "חסרות עמודות נדרשות",
      errorUploadFailed: "ההעלאה נכשלה. אנא נסה שוב",
      errorProcessingFile: "שגיאה בעיבוד הקובץ. אנא ודא שזה קובץ אקסל תקין",
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
