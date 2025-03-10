import DownloadTemplate from "./components/DownloadTemplate.jsx";
import UploadFile from "./components/UploadFile.jsx";
import DownloadResults from "./components/DownloadResults.jsx";
import Preview from "./components/Preview.jsx";
import React, { useEffect, useState } from "react";
import { getConfig } from "./configLoader";

function App() {
  const [serverUrls, setServerUrls] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    async function getConfigs() {
      const url = await getConfig();
      setServerUrls(url);
    }

    getConfigs();
  }, []);

  return (
    <>
      <div id="title">
        <h1>Classrooms Builder</h1>
        <DownloadTemplate apiUrl={serverUrls.template} />
      </div>
      <div id="center">
        <Preview
          file={file}
          setFile={setFile}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          results={results}
        />
        <div id="main">
          {results ? (
            <DownloadResults
              results={results}
              setResults={setResults}
              setFile={setFile}
            />
          ) : (
            <UploadFile
              uploadUrl={serverUrls.upload}
              file={file}
              setFile={setFile}
              setResults={setResults}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
