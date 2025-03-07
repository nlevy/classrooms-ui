import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as XLSX from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function ExcelViewer({ file }) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        if (jsonData.length > 0) {
          const headers = jsonData[0];
          const columnDefs = headers.map((header) => ({
            field: header,
            headerName: header,
            sortable: true,
            filter: true,
            resizable: true,
            width: 100,
            minWidth: 80,
            maxWidth: 150,
            autoSize: true,
          }));

          const rows = jsonData.slice(1).map((row) => {
            const rowData = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index];
            });
            return rowData;
          });

          setColumnDefs(columnDefs);
          setRowData(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return (
    <div className="excel-viewer ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout="normal"
        style={{ height: "100%", width: "100%" }}
        defaultColDef={{
          resizable: true,
          sortable: true,
          width: 100,
          minWidth: 80,
          maxWidth: 150,
        }}
      />
    </div>
  );
}

export default ExcelViewer;
