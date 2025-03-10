import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function ResultsViewer({ data, onDownload }) {
  const [activeTab, setActiveTab] = useState('1');
  const sheets = {
    ...data.classes,
    'Summary': data.summaries
  };

  const getGridData = (sheetData) => {
    if (!sheetData || !sheetData.length) return { columns: [], rows: [] };

    const columns = Object.keys(sheetData[0]).map(key => ({
      field: key,
      headerName: key,
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
      minWidth: 80,
      maxWidth: 150,
    }));

    return { columns, rows: sheetData };
  };

  return (
    <div className="results-viewer">
      <div className="results-header">
        <h2>Results Preview</h2>
        <button className="button" onClick={onDownload}>
          Download
        </button>
      </div>
      <div className="tabs">
        {Object.keys(sheets).map((sheetName) => (
          <button
            key={sheetName}
            className={`tab-button ${sheetName === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(sheetName)}
          >
            {sheetName === 'Summary' ? 'Summary' : `Class ${sheetName}`}
          </button>
        ))}
      </div>
      <div className="grid-container ag-theme-alpine">
        <AgGridReact
          columnDefs={getGridData(sheets[activeTab]).columns}
          rowData={getGridData(sheets[activeTab]).rows}
          domLayout="normal"
          defaultColDef={{
            resizable: true,
            sortable: true,
          }}
        />
      </div>
    </div>
  );
}

export default ResultsViewer; 