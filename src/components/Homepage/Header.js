import React from "react";
import NavBar from "./NavBar";
import CTA from "./CTA";

const Header = ({onTryNowClick, modelError, isLoading}) => {
  return (
    <div className="header">
      <div className="header-content">
        <NavBar onTryNowClick={onTryNowClick}/>
        <div className="header-main">
          <h1 className="header-text">
            <span className="gradient-text">AI-Powered</span>
            <br />
            Plant Disease Detection
          </h1>
          <p className="header-subtitle">
            Upload a plant photo for instant diagnosis
          </p>
          {isLoading ? (
            <div className="cta loading">
              <div className="loader"></div>
              <p>Loading AI model...</p>
            </div>
          ) : modelError ? (
            <div className="cta error">
              <p>Error: {modelError}</p>
            </div>
          ) : (
            <CTA icon="cloud-upload-alt" text="Try Now" onClick={onTryNowClick}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
