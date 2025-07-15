import UploadFile from "./components/UploadFile.jsx";
import DownloadResults from "./components/DownloadResults.jsx";
import Preview from "./components/Preview.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Header from "./components/Header.jsx";
import React, { useEffect, useState } from "react";
import { getConfig } from "./configLoader";

function App() {
  const [serverUrls, setServerUrls] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [results, setResults] = useState(null);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    async function getConfigs() {
      const url = await getConfig();
      setServerUrls(url);
    }

    getConfigs();
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <>
      <Header
        serverUrls={serverUrls}
        showBackButton={true}
        onBackClick={() => setShowLanding(true)}
      />
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
