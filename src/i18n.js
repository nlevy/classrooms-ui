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
      // Server error translations
      errors: {
        INVALID_CONTENT_TYPE: "Invalid content type. Please send JSON data.",
        MISSING_PARAMETER: "Required parameter '{parameter}' is missing.",
        INVALID_STUDENT_DATA: "Invalid student data: {details}",
        EMPTY_STUDENT_DATA: "Student data is empty. Please provide at least one student.",
        MISSING_REQUIRED_FIELDS: "Missing required fields: {fields}. Please ensure all required information is provided.",
        DUPLICATE_STUDENT_NAMES: "Duplicate student names found: {duplicates}. Each student name must be unique.",
        STUDENT_NO_FRIENDS: "Student '{studentName}' has no friends listed. All students must have at least one friend to enable optimal class assignments.",
        UNKNOWN_FRIEND: "Student '{studentName}' lists unknown friend '{friendName}'. All friends must exist in the student list.",
        ISOLATED_STUDENTS: "Students with no valid friendships: {students}. This may be due to one-way friendships. Please ensure friendships are mutual.",
        INVALID_CLASS_COUNT: "Number of classes must be positive. Please provide a valid number of classes.",
        INVALID_STUDENT_COUNT: "Number of students must be positive.",
        TOO_MANY_CLASSES: "Cannot create {classCount} classes with only {studentCount} students. Please reduce the number of classes or add more students.",
        CLASS_SIZE_TOO_SMALL: "Class size would be too small ({minSize} students per class). Please reduce the number of classes from {classCount} or add more students.",
        ASSIGNMENT_FAILED: "Failed to assign students to classes. Please try again or contact support.",
        NO_SOLUTION_FOUND: "No valid assignment solution found. Please review student constraints and try again.",
        OPTIMIZATION_TIMEOUT: "Assignment optimization timed out. Try using fewer students, more classes, or simplifying constraints.",
        UNSUPPORTED_LANGUAGE: "Language '{language}' is not supported. Available languages: English (en), Hebrew (he).",
        TEMPLATE_NOT_AVAILABLE: "Data template is not available. Please try again later.",
        INTERNAL_SERVER_ERROR: "An unexpected error occurred. Please try again or contact support if the problem persists.",
      },
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
      // Server error translations
      errors: {
        INVALID_CONTENT_TYPE: "סוג תוכן לא חוקי. אנא שלח נתוני JSON",
        MISSING_PARAMETER: "פרמטר נדרש '{parameter}' חסר",
        INVALID_STUDENT_DATA: "נתוני תלמיד לא חוקיים: {details}",
        EMPTY_STUDENT_DATA: "נתוני התלמידים ריקים. אנא ספק לפחות תלמיד אחד",
        MISSING_REQUIRED_FIELDS: "שדות חובה חסרים: {fields}. אנא וודא שכל המידע הנדרש מסופק",
        DUPLICATE_STUDENT_NAMES: "נמצאו שמות תלמידים כפולים: {duplicates}. כל שם תלמיד חייב להיות ייחודי",
        STUDENT_NO_FRIENDS: "לתלמיד '{studentName}' אין חברים רשומים. כל תלמיד חייב לרשום לפחות חבר אחד כדי לאפשר שיבוץ כיתות אופטימלי",
        UNKNOWN_FRIEND: "תלמיד '{studentName}' רשם חבר לא מוכר '{friendName}'. כל החברים חייבים להיות ברשימת התלמידים",
        ISOLATED_STUDENTS: "תלמידים ללא קשרי חברות תקינים: {students}. ייתכן שזה בגלל חברויות חד-כיווניות. אנא וודא שהחברויות הן הדדיות",
        INVALID_CLASS_COUNT: "מספר הכיתות חייב להיות גדול מאפס. אנא ספק מספר כיתות תקין",
        INVALID_STUDENT_COUNT: "מספר התלמידים חייב להיות גדול מאפס",
        TOO_MANY_CLASSES: "לא ניתן ליצור {classCount} כיתות עם {studentCount} תלמידים בלבד. אנא הקטן את מספר הכיתות או הוסף תלמידים נוספים",
        CLASS_SIZE_TOO_SMALL: "גודל הכיתה יהיה קטן מדי ({minSize} תלמידים לכיתה). אנא הקטן את מספר הכיתות מ-{classCount} או הוסף תלמידים נוספים",
        ASSIGNMENT_FAILED: "שיבוץ התלמידים לכיתות נכשל. אנא נסה שוב",
        NO_SOLUTION_FOUND: "לא נמצא פתרון שיבוץ תקין. אנא בדוק את אילוצי התלמידים ונסה שוב",
        OPTIMIZATION_TIMEOUT: "אופטימיזציה של השיבוץ נכשלה בזמן קצוב. נסה עם פחות תלמידים, יותר כיתות, או פשט את האילוצים",
        UNSUPPORTED_LANGUAGE: "שפה '{language}' אינה נתמכת. שפות זמינות: אנגלית (en), עברית (he)",
        TEMPLATE_NOT_AVAILABLE: "תבנית הנתונים אינה זמינה. אנא נסה שוב מאוחר יותר",
        INTERNAL_SERVER_ERROR: "אירעה שגיאה בלתי צפויה. אנא נסה שוב",
      },
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
