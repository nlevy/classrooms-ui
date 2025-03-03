import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const UploadFile = ({ uploadUrl, file, setFile }) => {
  const [classesNumber, setClassesNumber] = useState("2");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleValueChange = (event) => {
    setClassesNumber(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        axios
          .post(uploadUrl, jsonData, {
            params: {
              classesNumber: classesNumber,
            },
          })
          .then((response) => {
            console.log("Upload successful:", response);
            downloadFile(response.data);
            setUploading(false);
          })
          .catch((error) => {
            console.error("Error uploading:", error);
            setUploading(false);
          });
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error processing file:", error);
      setUploading(false);
    }
  };

  const values = Array.from({ length: 14 }, (_, i) => (i + 2).toString());

  const downloadFile = (jsonData) => {
    const workbook = XLSX.utils.book_new();

    Object.keys(jsonData.classes).forEach((index) => {
      const data = jsonData.classes[index];
      console.log(`Data for index ${index}:`, data);
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Classroom ${index}`);
    });
    const summary = XLSX.utils.json_to_sheet(jsonData.summaries);
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

  return (
    <div>
      <div id="selections">
        <div id="fileChooser">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{ marginBottom: "1rem" }}
          />
        </div>
        <div id="classesNumber">
          <label htmlFor="numberOfClasses">Number of Classes:</label>
          <select
            id="numberOfClasses"
            value={classesNumber}
            onChange={handleValueChange}
          >
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div id="uploadButton">
          <button onClick={handleUpload} disabled={uploading || !file}>
            {uploading ? "Building..." : "Build Classrooms"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
