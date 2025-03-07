import DownloadTemplate from "./components/DownloadTemplate.jsx";
import UploadFile from "./components/UploadFile.jsx";
import Preview from "./components/Preview.jsx";
import React, { useEffect, useState } from "react";
import { getConfig } from "./configLoader";

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
        />
        <div id="main">
          <UploadFile
            uploadUrl={serverUrls.upload}
            file={file}
            setFile={setFile}
            showFileInput={false}
          />
        </div>
      </div>
    </>
  );
}

export default App;
