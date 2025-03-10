import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const UploadFile = ({ uploadUrl, file, setFile, setResults }) => {
  const [classesNumber, setClassesNumber] = useState("5");
  const [uploading, setUploading] = useState(false);

  const handleValueChange = (event) => {
    setClassesNumber(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) return;

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
            setResults(response.data);
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

  return (
    <div>
      <div id="selections">
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
