import DownloadTemplate from "./components/DownloadTemplate.jsx";
import UploadFile from "./components/UploadFile.jsx";
import React, { useEffect, useState } from "react";
import { getConfig } from "./configLoader";
import ExcelViewer from "./components/ExcelViewer.jsx";

function App() {
  const [serverUrls, setServerUrls] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    async function getConfigs() {
      const url = await getConfig();
      setServerUrls(url);
    }

    getConfigs();
  }, []);

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

  return (
    <>
      <div id="title">
        <h1>Classrooms Builder</h1>
        <DownloadTemplate apiUrl={serverUrls.template} />
      </div>
      <div id="center">
        <div
          className={`excel-viewer-container ${!file ? "empty" : ""} ${
            isDragging ? "dragging" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2>
            {isDragging
              ? "Drop Excel File Here"
              : file
              ? "Preview"
              : "Drop Excel File Here"}
          </h2>
          {file && <ExcelViewer file={file} />}
        </div>
        <div id="main">
          <h2>Build Classes</h2>
          <UploadFile
            uploadUrl={serverUrls.upload}
            file={file}
            setFile={setFile}
          />
        </div>
      </div>
    </>
  );
}

export default App;
