import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ExcelViewer from "./ExcelViewer";

function Preview({ file, setFile, isDragging, setIsDragging, results }) {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState(null);
  const [fileError, setFileError] = useState("");

  // When results change, set the initial active view
  useEffect(() => {
    if (results && Object.keys(results.classes).length > 0) {
      setActiveView(`class${Object.keys(results.classes)[0]}`);
    }
  }, [results]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.name.endsWith(".xlsx")) {
        setFile(droppedFile);
        setFileError("");
      } else {
        setFileError(t("errorInvalidFileType") || "Invalid file type. Please upload an Excel file (.xlsx)");
        setTimeout(() => setFileError(""), 5000);
      }
    }
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".xlsx")) {
        setFile(selectedFile);
        setFileError("");
      } else {
        setFileError(t("errorInvalidFileType") || "Invalid file type. Please upload an Excel file (.xlsx)");
        setTimeout(() => setFileError(""), 5000);
      }
    }
  };

  const handleClear = () => {
    setFile(null);
  };

  const getViewData = () => {
    if (!results || !activeView) return null;
    if (activeView === "summary") {
      // Format numeric values in summary to 3 decimal places
      return results.summaries.map(row => {
        const formattedRow = {};
        Object.keys(row).forEach(key => {
          const value = row[key];
          // Check if value is a number and not an integer
          if (typeof value === 'number' && !Number.isInteger(value)) {
            formattedRow[key] = Number(value.toFixed(3));
          } else {
            formattedRow[key] = value;
          }
        });
        return formattedRow;
      });
    }
    const classNum = activeView.replace("class", "");
    return results.classes[classNum];
  };

  if (results) {
    const viewData = getViewData();
    if (!viewData) return null; // Add safety check

    return (
      <div className="excel-viewer-container">
        <div className="preview-header">
          <h2>{t("resultsPreview")}</h2>
        </div>
        <div className="tabs">
          {Object.keys(results.classes).map((classNum) => {
            const studentCount = results.classes[classNum]
              ? results.classes[classNum].length
              : 0;

            return (
              <button
                key={`class${classNum}`}
                className={`tab-button ${
                  activeView === `class${classNum}` ? "active" : ""
                }`}
                onClick={() => setActiveView(`class${classNum}`)}
              >
                {t("class")} {classNum} <span className="student-count">({studentCount})</span>
              </button>
            );
          })}
          <button
            className={`tab-button summary-tab ${activeView === "summary" ? "active" : ""}`}
            onClick={() => setActiveView("summary")}
          >
            📊 {t("summary")}
          </button>
        </div>
        <ExcelViewer data={viewData} />
      </div>
    );
  }
  return (
    <div
      className={`excel-viewer-container ${!file ? "empty" : ""} ${
        isDragging ? "dragging" : ""
      } ${fileError ? "error" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="preview-header">
        <h2>
          {isDragging ? t("dropHere") : file ? t("preview") : t("dropHere")}
        </h2>
        {file && (
          <button className="button" onClick={handleClear}>
            {t("clear")}
          </button>
        )}
      </div>
      {fileError && (
        <div className="file-error-banner">
          ⚠️ {fileError}
        </div>
      )}
      {file ? (
        <ExcelViewer file={file} />
      ) : (
        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileSelect}
            id="file-input"
          />
          <label htmlFor="file-input">{t("chooseFile")}</label>
        </div>
      )}
    </div>
  );
}

export default Preview;
