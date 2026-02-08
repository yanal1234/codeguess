import Die from "./die";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti"
import { languages } from "./languages"
import { clsx } from "clsx"
import {getFarewellText} from "./utils"
import {getRandomWord} from "./utils"
import winSound from "./assets/win.mp3"
import loseSound from "./assets/game_over.mp3"
import correctSound from "./assets/correct_sound.mp3"
import errorSound from "./assets/error_sound.mp3"
import gamemenuselect from "./assets/game_menu_select.mp3"
import Assembly from "./AssemblyGame";

export default function App() {

const [showHome, setShowHome] = useState(false);

const [HowToPlay, setHowToPlay] = useState(false);

function howToPlay(){
setHowToPlay(function(prev){
  return !prev;
})
}
function startToPlay(){
setShowHome(function(prev){
  return !prev;
})
}

  return (
    <main>
   {!HowToPlay&&!showHome&&<header className="Home">
<a href="http://localhost:5173/codeguess/">
  <img className="logo" src="image1.png" />
</a>

    </header>}
    {!HowToPlay&&!showHome&&
  <div className="home">
  <div className="home-card">
    <img className="logo" src="image.png" alt="CodeGuess" />

    <h1 className="home-title">CodeGuess</h1>
    <p className="home-subtitle">Assembly: Endgame</p>

    <button onClick={()=>startToPlay()} className="start-btn">▶ Start Game</button>

    <div className="home-actions">
      <button onClick={()=>howToPlay()} className="ghost-btn">How to Play</button>
      <button className="ghost-btn">Leaderboard</button>
    </div>
  </div>
</div>}
{HowToPlay && (
  <div className="howto-overlay" role="dialog" aria-modal="true">
    <div className="howto-card">
      <div className="howto-head">
        <h2>How to Play</h2>
        <button className="howto-close" onClick={() => howToPlay()}>
          ✕
        </button>
      </div>

      <ol className="howto-list">
        <li><b>Choose a difficulty</b> (Easy / Medium / Hard).</li>
        <li><b>Guess letters</b> using the keyboard on the screen.</li>
        <li><b>Correct letters</b> appear in the word.</li>
        <li><b>Wrong letters</b> remove a “language chip”.</li>
        <li><b>Win</b> by revealing the full word before you run out of tries.</li>
        <li><b>Tip:</b> Use the hint if it’s available.</li>
      </ol>

      <div className="howto-actions">
        <button className="howto-main" onClick={() => howToPlay()}>
          Got it!
        </button>
      </div>
    </div>
  </div>
)}
   {showHome && <Assembly
   fun={startToPlay}
   />}
</main>
  );
}
