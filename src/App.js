import "./css/App.css";
import React, { useState } from "react";
import { Game } from "./Component/Game"
import { Highscores } from "./Component/Highscores"

export function App() {
  const [activePage, setActivePage] = useState("Home");
  
  const changeActivePage = (newPage) => {
    setActivePage(newPage);
    document.getElementById("h1Id").style.visibility = "hidden";
    document.getElementById("btn1").style.visibility = "hidden";
    document.getElementById("btn2").style.visibility = "hidden";
  };

  return (
    <main className="container">
      <div id="home" className="flex-center flex-column">
        <h1 id="h1Id">Javascript Quiz</h1>
        <button className="btn" id="btn1" onClick={() => changeActivePage("Game")}>
          Play
        </button>
        <button className="btn" id="btn2" onClick={() => changeActivePage("Highscores")}>
          High Scores
        </button>
        <div>
          {  activePage === 'Game' && <Game />  }
          {  activePage === 'Highscores' && <Highscores />  }
        </div>
      </div>
    </main>
  );
}

export default App;
