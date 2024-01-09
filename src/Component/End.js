import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import { Game } from "./Game";
import { Highscores } from "./Highscores";
import { App } from "../App";

export const End = ({ finalScore }) => {
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleUsernameChange = (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
    setButtonDisabled(enteredUsername.trim() === "");
  };

  const handleSaveScore = async () => {
    if (username.trim() === "") {
      alert("Please enter a username before saving.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "HighScores"), {
        name: username,
        score: finalScore,
      });

      alert("Score saved successfully with ID: " + docRef.id);

      // Reset state after successful save
      setUsername("");
      setButtonDisabled(true);
      setActiveComponent(null);
    } catch (error) {
      console.error("Error saving score:", error.message);
    }
  };

  const handleShow = (component) => {
    setActiveComponent(component);
  };

  return (
    <main className="container">
      <div
        className={`flex-center flex-column ${activeComponent ? "hidden" : ""}`}
      >
        <h2>Final Score</h2>
        <h1 id="finalScore">{finalScore}</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <button
          type="button"
          className="btn"
          id="saveScoreBtn"
          onClick={handleSaveScore}
          disabled={isButtonDisabled}
        >
          Save
        </button>
        <button className="btn" onClick={() => handleShow("Highscores")}>
          Highscores
        </button>
        <button className="btn" onClick={() => handleShow("Game")}>
          Play Again
        </button>
        <button className="btn" onClick={() => handleShow("App")}>
          Go Home
        </button>
      </div>
      {activeComponent === "Highscores" && <Highscores />}
      {activeComponent === "Game" && <Game />}
      {activeComponent === "App" && <App />}
    </main>
  );
};

export default End;
