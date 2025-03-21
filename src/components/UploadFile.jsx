import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";

const UploadFile = ({ uploadUrl, file, setFile, setResults }) => {
  const { t, i18n } = useTranslation();
  const [classesNumber, setClassesNumber] = useState("5");
  const [uploading, setUploading] = useState(false);

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
    if (!file) return;

    try {
      setUploading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        let jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        // Always translate input data to English for server
        if (i18n.language === "he") {
          jsonData = translateData(jsonData);
        }

        axios
          .post(uploadUrl, jsonData, {
            params: {
              classesNumber: classesNumber,
            },
          })
          .then((response) => {
            // Translate response data if needed
            const translatedResults = translateResponseData(response.data);
            setResults(translatedResults);
            setUploading(false);
          })
          .catch((error) => {
            console.error("Error uploading:", error);
            setUploading(false);
          });
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error processing file:", error);
      setUploading(false);
    }
  };

  const values = Array.from({ length: 14 }, (_, i) => (i + 2).toString());

  return (
    <div>
      <div id="selections">
        <div id="classesNumber">
          <label htmlFor="numberOfClasses">{t("numberOfClasses")}:</label>
          <select
            id="numberOfClasses"
            value={classesNumber}
            onChange={handleValueChange}
          >
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div id="uploadButton">
          <button onClick={handleUpload} disabled={uploading || !file}>
            {uploading ? t("building") : t("buildClassrooms")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
