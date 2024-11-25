import React from "react";
import "./Loading.css"; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-text"><b>Loading, please wait</b></div>
      <div className="loading-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Loading;
