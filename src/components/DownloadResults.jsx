import React from "react";
import * as XLSX from "xlsx";

const DownloadResults = ({ results, setResults, setFile }) => {
  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();

    Object.keys(results.classes).forEach((index) => {
      const data = results.classes[index];
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Class ${index}`);
    });
    const summary = XLSX.utils.json_to_sheet(results.summaries);
    XLSX.utils.book_append_sheet(workbook, summary, `Summary`);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "classrooms.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setResults(null);
    setFile(null);
  };

  return (
    <div>
      <div id="selections">
        <div className="download-buttons">
          <button className="button" onClick={handleDownload}>
            Download Results
          </button>
          <button className="button secondary" onClick={handleClear}>
            Clear Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadResults; 