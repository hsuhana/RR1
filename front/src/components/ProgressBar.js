import React from "react";
import "../App.css";

const ProgressBar = ({ step }) => {
  const steps = [
    { label: "Pick Date", number: 1 },
    { label: "Pick Time", number: 2 },
    { label: "Pick Table", number: 3 },
    { label: "Requests", number: 4 },
  ];

  return (
    <div className="progress-bar">
      {steps.map((s, index) => (
        <div key={index} className="progress-step">
          {/* Circle */}
          <div className={`circle ${step >= s.number ? "completed" : ""}`}>
            {s.number}
          </div>
          {/* Label */}
          <p className={`label ${step >= s.number ? "active" : ""}`}>
            {s.label}
          </p>
          {/* Connector */}
          {index < steps.length - 1 && (
            <div
              className={`connector ${
                step > s.number ? "completed" : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
