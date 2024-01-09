import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import "../css/highScores.css";

export const Highscores = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "HighScores"));
        const scores = querySnapshot.docs.map((doc) => doc.data());
        // Sort scores in descending order based on the 'score' property
        scores.sort((a, b) => b.score - a.score);

        setHighScores(scores);
      } catch (error) {
        console.error("Error fetching high scores:", error.message);
      }
    };

    fetchHighScores();
  }, []); // Run this effect once when the component mounts

  return (
    <main className="container">
      <div id="highScores" className="flex-center flex-column">
        <h1 id="finalScore">High Scores</h1>
        <ul id="highScoresList" className="high-scores-list">
          {highScores.map((score, index) => (
            <li key={index} className="score-item">
              <span className="spanClass">{score.name}</span>
              <span className="spanClass">{score.score}</span>
            </li>
          ))}
        </ul>
        <a className="btn" href="index.html">
          Go Home
        </a>
      </div>
    </main>
  );
};

export default Highscores;
