import React from 'react';
import "./Registration.css";

const RegistrationInstructions = () => {
  return (
    <div className="form-group col-md-12 col-sm-12 col-xs-12">
      <div className="alert alert-warning" style={{ marginTop: "20px" }}>
        <div className="panel-heading" style={{ color: "#7a1212" }}>
          <h4 className="panel-title" style={{ fontWeight: "bold" }}>
            <i className="bi bi-megaphone"> </i> Instructions
          </h4>
          <ul style={{ textAlign: "justify" }}>
            <li style={{ margin: "5px 0px 0px 0px" }}>
              Please use Firefox, Chrome, and Edge browsers on desktop only.
            </li>
            <li style={{ margin: "5px 0px 0px 0px" }}>
              The Name should be the same as given in Degree Certificate /
              Govt issued ID Card.
            </li>
            <li style={{ margin: "5px 0px 0px 0px" }}>
              Please verify email id as it will be used to send registration
              details.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegistrationInstructions;
