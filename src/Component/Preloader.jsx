import React from "react";
import "../Styles/preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loader">
        <div className="spinner outer"></div>
        <div className="spinner middle"></div>
        <div className="spinner inner"></div>
      </div>
    </div>
  );
};

export default Preloader;
