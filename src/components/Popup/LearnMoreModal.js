import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const summaries = [
  {
    title: "Your plants need you!",
    summary: "Global food demand is rising, but plant diseases cause major crop losses. Early detection is crucial for food security."
  },
  {
    title: "Act before it's too late",
    summary: "Smartphones empower farmers worldwide to diagnose plant diseases quickly, helping prevent devastating losses."
  },
  {
    title: "AI Engine built for Nigeria",
    summary: "AI-powered diagnosis brings expert plant care to Nigerian farmers, overcoming barriers of access and climate challenges."
  }
];

const LearnMoreModal = ({ onClose }) => (
  <div className="popup glass-card learnmore-modal">
    <FontAwesomeIcon className="close-button" icon="window-close" onClick={onClose} />
    <h2 className="learnmore-title">Learn More</h2>
    <div className="learnmore-list">
      {summaries.map((item, idx) => (
        <div className="learnmore-card" key={idx}>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  </div>
);

export default LearnMoreModal; 