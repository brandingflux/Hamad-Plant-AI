import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Step = ({ icon, stepNumber, title, description }) => {
  return (
    <div className="step">
      <div className="step-header">
        <div className="stepnum">{stepNumber}</div>
        <FontAwesomeIcon icon={icon} className="icon" />
      </div>
      <h3 className="steptitle">{title}</h3>
      <p className="stepdes">{description}</p>
    </div>
  );
};

export default Step;