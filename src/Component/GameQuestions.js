import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../firebase";
import "../css/game.css";

export const GameQuestions = ({
  updateScore,
  saveScore,
  setCurrentQuestionIndex,
  currentQuestionIndex,
  totalQuestions,
  setGameOver,
}) => {
  const [quiz, setQuestions] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "quiz"), (snapshot) => {
      setQuestions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < totalQuestions - 1 ? prevIndex + 1 : prevIndex
    );
    if (currentQuestionIndex === totalQuestions - 1) {
      setGameOver(true);
      saveScore(); // Save the score when the game is over
    }
    setSelectedChoice(null);
    setAnswerStatus(null);
  };

  const handleChoiceClick = (choice) => {
    if (selectedChoice === null) {
      const isCorrect = choice === quiz[currentQuestionIndex].answer;
      setSelectedChoice(choice);
      setAnswerStatus(isCorrect ? "correct" : "wrong");

      // Update the score based on correctness
      updateScore(isCorrect);
    }
  };

  return (
    <div>
      {quiz.length > 0 && (
        <div key={quiz[currentQuestionIndex].id}>
          <h2 id="question">{quiz[currentQuestionIndex].question}</h2>
          {["choice1", "choice2", "choice3", "choice4"].map((choice, index) => (
            <div
              key={index}
              className={`choice-container ${
                selectedChoice === choice && answerStatus === "correct"
                  ? "correct" : ""
              } ${
                selectedChoice === choice && answerStatus === "wrong"
                  ? "wrong" : ""
              }`}
            >
              <p className="choice-prefix">{String.fromCharCode(65 + index)}</p>
              <p
                className={`choice-text ${
                  selectedChoice === choice ? "selected" : ""
                }`}
                data-number={index + 1}
                onClick={() => handleChoiceClick(choice)}
              >
                {quiz[currentQuestionIndex][choice]}
              </p>
            </div>
          ))}
          {answerStatus === "correct" && (
            <div className="correct-answer">
              Correct answer: {quiz[currentQuestionIndex].answer}
            </div>
          )}
          {answerStatus === "wrong" && (
            <div className="correct-answer">
              Correct answer: {quiz[currentQuestionIndex].answer}
            </div>
          )}
          <button className="nextBtn" onClick={handleNextQuestion}>
            {currentQuestionIndex === totalQuestions - 1
              ? "End"
              : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
};
