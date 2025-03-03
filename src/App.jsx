import DownloadTemplate from "./components/DownloadTemplate.jsx"
import UploadFile from "./components/UploadFile.jsx"
import React, { useEffect, useState } from 'react';
import { getConfig } from './configLoader';


function App() {
    const [serverUrls, setServerUrls] = useState('');

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
          </div>
          <div id="center">
              <div id="main">
                  <UploadFile uploadUrl={serverUrls.upload}/>
                  <DownloadTemplate apiUrl={serverUrls.template}/></div>
          </div>
      </>
  )
}

export default App
