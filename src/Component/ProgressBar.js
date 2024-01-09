import React from "react";
import "../css/game.css";

export const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
  // Calculate completion percentage
  const completionPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="hud-item">
      {/* <!-- Question title --> */}
      <p id="progressText" className="hud-prefix">
        {`(${currentQuestionIndex + 1}/${totalQuestions})`}
      </p>

      {/* <!-- Progress bar --> */}
      <div id="progressBar">
        <div
          id="progressBarFull"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
