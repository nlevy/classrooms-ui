import React, { useState, useEffect } from "react";
import ExcelViewer from "./ExcelViewer";

function Preview({ file, setFile, isDragging, setIsDragging, results }) {
  const [activeView, setActiveView] = useState(null);

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
    if (droppedFile && droppedFile.name.endsWith(".xlsx")) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setFile(selectedFile);
    }
  };

  const handleClear = () => {
    setFile(null);
  };

  const getViewData = () => {
    if (!results || !activeView) return null;
    if (activeView === "summary") return results.summaries;
    const classNum = activeView.replace("class", "");
    return results.classes[classNum];
  };

  if (results) {
    const viewData = getViewData();
    if (!viewData) return null; // Add safety check

    return (
      <div className="excel-viewer-container">
        <div className="preview-header">
          <h2>Results Preview</h2>
        </div>
        <div className="tabs">
          {Object.keys(results.classes).map((classNum) => (
            <button
              key={`class${classNum}`}
              className={`tab-button ${
                activeView === `class${classNum}` ? "active" : ""
              }`}
              onClick={() => setActiveView(`class${classNum}`)}
            >
              Class {classNum}
            </button>
          ))}
          <button
            className={`tab-button ${activeView === "summary" ? "active" : ""}`}
            onClick={() => setActiveView("summary")}
          >
            Summary
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
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="preview-header">
        <h2>
          {isDragging
            ? "Drop Excel File Here"
            : file
            ? "Preview"
            : "Drop Excel File Here"}
        </h2>
        {file && (
          <button className="button" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
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
          <label htmlFor="file-input">Choose File</label>
        </div>
      )}
    </div>
  );
}

export default Preview;
