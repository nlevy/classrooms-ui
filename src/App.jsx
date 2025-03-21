import DownloadTemplate from "./components/DownloadTemplate.jsx";
import UploadFile from "./components/UploadFile.jsx";
import DownloadResults from "./components/DownloadResults.jsx";
import Preview from "./components/Preview.jsx";
import React, { useEffect, useState } from "react";
import { getConfig } from "./configLoader";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const { t } = useTranslation();
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
        <h1>{t("title")}</h1>
        <div className="title-buttons">
          <DownloadTemplate apiUrl={serverUrls.template} />
          <LanguageSwitcher />
        </div>
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
