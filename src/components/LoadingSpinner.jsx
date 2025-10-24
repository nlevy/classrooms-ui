import React from "react";
import "../styles/LoadingSpinner.css";

const LoadingSpinner = ({ size = "medium", message = "" }) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner ${size}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
