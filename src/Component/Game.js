import React, { useState, useEffect } from "react";
import "../css/game.css";
import { GameQuestions } from "./GameQuestions";
import { ProgressBar } from "./ProgressBar";
import { Score } from "./Score";
import { End } from "./End";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../firebase";

export const Game = () => {
  const [score, setScore] = useState(100); // Initial score
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); // Initial totalQuestions state
  const [finalScore, setFinalScore] = useState(null); // New state for the final score
  const [gameOver, setGameOver] = useState(false); // New state to track game over

  // Fetch the quiz data from Firebase and set the totalQuestions state
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "quiz"), (snapshot) => {
      setTotalQuestions(snapshot.size); // Set the totalQuestions based on the number of documents in the "quiz" collection
    });

    // Cleanup the Firestore listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to update the score based on correctness
  const updateScore = (isCorrect) => {
    setScore((prevScore) =>
      isCorrect ? Math.max(prevScore - 1, 0) : Math.max(prevScore - 10, 0)
    );
  };

  // Save the final score for the player
  const saveScore = () => {
    const finalScore = score; // Store the final score
    setFinalScore(finalScore); // Set the final score in the state
    console.log("Final Score:", finalScore);
  };

  // Update the score every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setScore((prevScore) => Math.max(prevScore - 1, 0));
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="container">
      {!gameOver && (
        <div id="game" className="justify-center flex-column">
          <div id="hud">
            <ProgressBar
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
            />
            <Score score={score} />
          </div>
          <GameQuestions
            updateScore={updateScore}
            saveScore={saveScore}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            setGameOver={setGameOver}
          />
        </div>
      )}
      {gameOver && <End finalScore={finalScore} />}{" "}
    </main>
  );
};