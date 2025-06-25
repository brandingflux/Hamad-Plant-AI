import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IssueContainer from "./IssueContainer";
import CTA from "../Homepage/CTA";
import loader from "../../assets/images/loader.gif";

const ResultPage = ({ image, getDiseases, onTryAnotherClick, onClose }) => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setDiseases(await getDiseases());
      setLoading(false);
    };
    fetchData();
  }, [getDiseases]);

  return (
    <div className="resultpage glass-card">
      <FontAwesomeIcon className="close-button" icon="window-close" onClick={onClose} />
      <div className="result-image-container">
        <img src={image} alt="Plant" id="plant-photo" className="result-image" />
      </div>
      {loading ? (
        <div className="loader-container">
          <img src={loader} alt="Loader" className="loader" />
        </div>
      ) : (
        <>
          <IssueContainer diseases={diseases} />
          <CTA icon="cloud-upload-alt" text="Test Another" onClick={onTryAnotherClick} />
          <a href="https://forms.gle/bCNf3rMeKg71U95U9" className="cta feedback-cta">
            <FontAwesomeIcon icon="comments" />
            <p>Submit Feedback</p>
          </a>
        </>
      )}
    </div>
  );
};

export default ResultPage;
