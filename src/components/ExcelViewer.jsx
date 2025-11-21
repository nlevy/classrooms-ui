import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as XLSX from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import LoadingSpinner from "./LoadingSpinner";

function ExcelViewer({ file, data }) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
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
              minWidth: 120,
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
        } catch (error) {
          console.error("Error reading file:", error);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (data) {
      setLoading(true);
      // Handle direct data input
      try {
        const columns = Object.keys(data[0] || {}).map((key) => ({
          field: key,
          headerName: key,
          sortable: true,
          filter: true,
          resizable: true,
          minWidth: 120,
        }));

        setColumnDefs(columns);
        setRowData(data);
      } catch (error) {
        console.error("Error processing data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [file, data]);

  return (
    <div className="excel-viewer ag-theme-alpine">
      {loading ? (
        <div className="loading-overlay">
          <LoadingSpinner size="medium" message="Loading data..." />
        </div>
      ) : (
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          domLayout="normal"
          style={{ height: "100%", width: "100%" }}
          defaultColDef={{
            resizable: true,
            sortable: true,
            flex: 1,
            minWidth: 120,
          }}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      )}
    </div>
  );
}

export default ExcelViewer;
