import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";

const DownloadTemplate = ({ apiUrl }) => {
  const { t, i18n } = useTranslation();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      console.log(apiUrl);
      const response = await axios.get(apiUrl, {
        params: {
          lang: i18n.language,
        },
      });

      const jsonData = response.data;

      // Convert JSON data to an Excel file
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "DataSheet");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });

      // Create a Blob from the buffer and create a download link
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "classrooms-template.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
    } catch (error) {
      console.error("Error downloading data:", error);
      setDownloading(false);
    }
  };

  return (
    <div>
      <button id="template" onClick={handleDownload} disabled={downloading}>
        {downloading ? t("downloading") : t("downloadTemplate")}
      </button>
    </div>
  );
};

export default DownloadTemplate;
