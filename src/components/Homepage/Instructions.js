import React from "react";
import Step from "./Step";

const Instructions = () => {
  return (
    <div className="instructions" id="instructions">
      <h2 className="instruction-heading">How It Works</h2>
      <div className="step-container">
        <Step
          icon="mobile-alt"
          stepNumber="1"
          title="Take Picture"
          description="capture or upload an existing photo of sick plant"
        />
        <Step
          icon="cloud-upload-alt"
          stepNumber="2"
          title="Upload Image"
          description="Our AI will analyze the image using advanced machine learning techniques"
        />
        <Step
          icon="list"
          stepNumber="3"
          title="Get Results"
          description="Receive instant diagnosis and treatment recommendations for your plant"
        />
      </div>
      <div className="features">
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <h3>Fast Analysis</h3>
          <p>Get results in seconds</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-brain"></i>
          </div>
          <h3>AI Powered</h3>
          <p>Advanced machine learning</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-leaf"></i>
          </div>
          <h3>38+ Plants</h3>
          <p>Wide range of species</p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;