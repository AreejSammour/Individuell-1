import React from "react";
import "../css/game.css";

export const Score = ({ score }) => {
  return (
    <div className="hud-item">
      <p className="hud-prefix score-prefix">Score</p>
      <h1 className="hud-main-text" id="score">
        {score}
      </h1>
    </div>
  );
};
