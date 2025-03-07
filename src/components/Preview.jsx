import React from 'react';
import ExcelViewer from './ExcelViewer';

function Preview({ file, setFile, isDragging, setIsDragging }) {
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