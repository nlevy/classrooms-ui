import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./LoadingSpinner";

const UploadFile = ({ uploadUrl, file, setFile, setResults }) => {
  const { t, i18n } = useTranslation();
  const [classesNumber, setClassesNumber] = useState("5");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [isFileValid, setIsFileValid] = useState(false);

  // Translation mapping for Excel headers
  const headerTranslations = {
    "שם התלמיד": "name",
    "בית ספר": "school",
    מגדר: "gender",
    לימודי: "academicPerformance",
    התנהגותי: "behavioralPerformance",
    הערות: "comments",
    "חבר 1": "friend1",
    "חבר 2": "friend2",
    "חבר 3": "friend3",
    "חבר 4": "friend4",
    "לא עם": "notWith",
    מקבץ: "clusterId",
  };

  // Translation mapping for values
  const valueTranslations = {
    זכר: "MALE",
    נקבה: "FEMALE",
    א: "HIGH",
    ב: "MEDIUM",
    ג: "LOW",
    // ... add other value translations
  };

  const translateData = (jsonData) => {
    return jsonData.map((row) => {
      const translatedRow = {};
      Object.entries(row).forEach(([key, value]) => {
        // Translate header
        const translatedKey = headerTranslations[key] || key;
        // Translate value if needed
        const translatedValue = valueTranslations[value] || value;
        translatedRow[translatedKey] = translatedValue;
      });
      return translatedRow;
    });
  };

  const translateResponseData = (data) => {
    if (i18n.language === "en") return data; // No translation needed for English

    const reverseTranslations = {
      name: "שם התלמיד",
      school: "בית ספר",
      gender: "מגדר",
      academicPerformance: "לימודי",
      behavioralPerformance: "התנהגותי",
      comments: "הערות",
      friend1: "חבר 1",
      friend2: "חבר 2",
      friend3: "חבר 3",
      friend4: "חבר 4",
      notWith: "לא עם",
      clusterId: "מקבץ",
      MALE: "זכר",
      FEMALE: "נקבה",
      HIGH: "א",
      MEDIUM: "ב",
      LOW: "ג",
      averageAcademicPerformance: "ממוצע לימודי",
      averageBehaviouralPerformance: "ממוצע התנהגותי",
      classNumber: "מספר כיתה",
      malesCount: "מספר בנים",
      studentsCount: "מספר תלמידים",
      unwantedMatches: "התאמות לא רצויות",
      withoutFriends: "תלמידים ללא חברים",
    };

    const translateObject = (obj) => {
      const translated = {};
      Object.entries(obj).forEach(([key, value]) => {
        const translatedKey = reverseTranslations[key] || key;
        const translatedValue = reverseTranslations[value] || value;
        translated[translatedKey] = translatedValue;
      });
      return translated;
    };

    return {
      classes: Object.fromEntries(
        Object.entries(data.classes).map(([key, students]) => [
          key,
          students.map(translateObject),
        ])
      ),
      summaries: data.summaries.map(translateObject),
    };
  };

  const handleValueChange = (event) => {
    setClassesNumber(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !isFileValid) return;

    try {
      setUploading(true);
      setUploadProgress(10);

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadProgress(30);
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        let jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        setUploadProgress(50);

        // Always translate input data to English for server
        if (i18n.language === "he") {
          jsonData = translateData(jsonData);
        }

        setUploadProgress(60);

        axios
          .post(uploadUrl, jsonData, {
            params: {
              classesNumber: classesNumber,
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                60 + (progressEvent.loaded / progressEvent.total) * 30
              );
              setUploadProgress(percentCompleted);
            },
          })
          .then((response) => {
            setUploadProgress(95);
            // Translate response data if needed
            const translatedResults = translateResponseData(response.data);
            setResults(translatedResults);
            setUploadProgress(100);
            setTimeout(() => {
              setUploading(false);
              setUploadProgress(0);
            }, 300);
          })
          .catch((error) => {
            console.error("Error uploading:", error);
            const errorMsg =
              error.response?.data?.message || error.message || "Upload failed";
            setErrorMessage(
              t("errorUploadFailed") || `Upload failed: ${errorMsg}`
            );
            setUploading(false);
            setUploadProgress(0);
          });
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error processing file:", error);
      setErrorMessage(
        t("errorProcessingFile") ||
          "Error processing file. Please ensure it's a valid Excel file."
      );
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Validate and count students when file changes
  React.useEffect(() => {
    if (!file) {
      setStudentCount(0);
      setErrorMessage("");
      setIsFileValid(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        // Validate data has rows
        if (!jsonData || jsonData.length === 0) {
          setErrorMessage(
            t("errorEmptyFile") ||
              "The file appears to be empty. Please check your file and try again."
          );
          setStudentCount(0);
          setIsFileValid(false);
          return;
        }

        setStudentCount(jsonData.length);

        // Validate required columns exist (accept both Hebrew and English)
        const requiredColumnsHe = [
          "שם התלמיד",
          "בית ספר",
          "מגדר",
          "לימודי",
          "התנהגותי",
          "הערות",
          "חבר 1",
          "חבר 2",
          "חבר 3",
          "חבר 4",
        ];
        const requiredColumnsEn = [
          "name",
          "school",
          "gender",
          "academicPerformance",
          "behavioralPerformance",
          "comments",
          "friend1",
          "friend2",
          "friend3",
          "friend4",
        ];

        const fileColumns = Object.keys(jsonData[0]).map((col) => col.trim());

        // Check if file has Hebrew columns
        const hasHebrewColumns = requiredColumnsHe.every((col) =>
          fileColumns.includes(col)
        );
        // Check if file has English columns
        const hasEnglishColumns = requiredColumnsEn.every((col) =>
          fileColumns.includes(col)
        );

        if (!hasHebrewColumns && !hasEnglishColumns) {
          // Detect which language the file is using
          const fileHasHebrewColumns = fileColumns.some((col) =>
            requiredColumnsHe.includes(col)
          );
          const fileHasEnglishColumns = fileColumns.some((col) =>
            requiredColumnsEn.includes(col)
          );

          // Determine which language columns are missing
          let missingColumns;
          if (fileHasHebrewColumns) {
            missingColumns = requiredColumnsHe.filter(
              (col) => !fileColumns.includes(col)
            );
          } else if (fileHasEnglishColumns) {
            missingColumns = requiredColumnsEn.filter(
              (col) => !fileColumns.includes(col)
            );
          } else {
            missingColumns = i18n.language === "he"
              ? requiredColumnsHe.filter((col) => !fileColumns.includes(col))
              : requiredColumnsEn.filter((col) => !fileColumns.includes(col));
          }

          const columnList = missingColumns.join(", ");
          setErrorMessage(`${t("errorMissingColumns")}: ${columnList}`);
          setIsFileValid(false);
          return;
        }

        // File is valid
        setErrorMessage("");
        setIsFileValid(true);
      } catch (error) {
        console.error("Error processing file:", error);
        setErrorMessage(
          t("errorProcessingFile") ||
            "Error processing file. Please ensure it's a valid Excel file."
        );
        setStudentCount(0);
        setIsFileValid(false);
      }
    };
    reader.readAsArrayBuffer(file);
  }, [file, i18n.language, t]);

  const values = Array.from({ length: 14 }, (_, i) => (i + 2).toString());

  return (
    <div>
      <div id="selections">
        {file && (
          <div
            className="file-info"
            dir={i18n.language === "he" ? "rtl" : "ltr"}
          >
            <div className="file-info-row">
              <span className="file-info-label">
                {i18n.language === "he"
                  ? `${t("file")} 📄:`
                  : `📄 ${t("file")}:`}
              </span>
              <span className="file-info-value">{file.name}</span>
            </div>
            <div className="file-info-row">
              <span className="file-info-label">
                {i18n.language === "he"
                  ? `${t("students")} 👥:`
                  : `👥 ${t("students")}:`}
              </span>
              <span className="file-info-value">{studentCount}</span>
            </div>
          </div>
        )}
        {errorMessage && <div className="error-message">⚠️ {errorMessage}</div>}
        <div id="classesNumber" dir={i18n.language === "he" ? "rtl" : "ltr"}>
          <label htmlFor="numberOfClasses">{t("numberOfClasses")}:</label>
          <select
            id="numberOfClasses"
            value={classesNumber}
            onChange={handleValueChange}
            disabled={uploading}
          >
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div id="uploadButton">
          <button onClick={handleUpload} disabled={uploading || !file || !isFileValid}>
            {uploading ? (
              <div className="button-loading">
                <LoadingSpinner size="small" />
                <span>{t("building")}</span>
              </div>
            ) : (
              t("buildClassrooms")
            )}
          </button>
        </div>
        {uploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="progress-text">{uploadProgress}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
