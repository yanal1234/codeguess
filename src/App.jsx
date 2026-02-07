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


export default function App() {

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
function renderGameStatus(){
  if(gameover){
    if(gamewim){
      return (
        <>
          <h1>you win!</h1>
          <p>well done 🎉</p>
        </>
      )
    }else{
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 🥲</p>
        </>
      )
    }
  }
  else{
if(islastguessedLetters && wrongGuessesArray.length-1>=0){
    const languageschois=languages[wrongGuessesArray.length-1].name;
    return (
      <p className="farewell-message">{getFarewellText(languageschois)}</p>
    )
  }
  else{
  return null
}

  }

}

function chooseDifficulty(level){
setDifficulty(level);
setchipsworld(getRandomWord(level));
}

function resetGame(){
setDifficulty(null);
setchipsworld("again");
setGuessedLetters([]);
setStats(function(prev){
  if(gamewim){
    return{...prev,win:prev.win+1,streak:prev.streak+1}
  }
  else if(gamelost){
    return{...prev,losse:prev.losse+1,streak:0}
  }
})

}

const [screenSize, setScreenSize] = useState({
  w: window.innerWidth,
  h: window.innerHeight
});

const [showModal,setShowModal] = useState(false);

const [stats,setStats] = useState(function(){
  const saved=localStorage.getItem("endgame_stats");
  if(saved){
    return JSON.parse(saved);
  }
  else{
    return{win:0,losse:0,streak:0};
  }
});

const [difficulty, setDifficulty] = useState(null);

const [chips,setchips]=useState(languages);

const [guessedLetters, setGuessedLetters] = useState([])

const [chipsworld,setchipsworld]=useState("Welcome");

const [shake, setShake] = useState(false);

useEffect(() => {
  function onResize() {
    setScreenSize({ w: window.innerWidth, h: window.innerHeight });
  }
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);


const wrongGuessesArray =guessedLetters.filter(function(prev){
  if(!chipsworld.includes(prev)){
    return prev;
  }
})

const gamewim = chipsworld.split("").every(prev =>
  guessedLetters.includes(prev) 
);

const gamelost= wrongGuessesArray.length>=languages.length-1;

const gameover= gamewim|| gamelost;

const lastguessedLetters=guessedLetters[guessedLetters.length-1];

const islastguessedLetters= lastguessedLetters&& !chipsworld.includes(lastguessedLetters);

const numGuessesLeft = languages.length -1;

useEffect(() => {
  if (!gamewim) return;

  setShake(true);
  const t = setTimeout(() => setShake(false), 500);

  return () => clearTimeout(t);
}, [gamewim]);

useEffect(()=>{
  localStorage.setItem("endgame_stats",JSON.stringify(stats))
},[stats])

function addguessedLetters(letter){
   if (difficulty === null) return;
  setGuessedLetters(function(prevletter){
if(prevletter.includes(letter)){
  return prevletter
}
else{
  return [...prevletter,letter]
}
  })
}

function resetwindow(){
  setShowModal(false);
}

const chips_bouton=chips.map(function(prev,index){
  const islanguageslost= index< wrongGuessesArray.length;
  const classname = clsx("chip", islanguageslost && "lost")
  return <span className={classname} style={{background:`${prev.backgroundColor}`,color:`${prev.color}`}}>{prev.name}</span>;
})

const chipsworld_bouton=chipsworld.split("").map(function(prev){
  const shouldRevealLetter= gamelost;
  const letterClassname=clsx("is",gamelost &&!guessedLetters.includes(prev) && "lost",gamewim && "win")
  return <span className={letterClassname}>{shouldRevealLetter || difficulty===null?(prev.toUpperCase()):(guessedLetters.includes(prev)?prev.toUpperCase():" ")}</span>;
})

const key_borad=alphabet.split("").map(function(prev){
  const isGuessed = guessedLetters.includes(prev);
  const isCorrect = isGuessed && chipsworld.includes(prev);
  const isWrong =isGuessed && !isCorrect;
  const classname=clsx({correct:isCorrect,wrong:isWrong})
  return <button aria-label={`Letter ${prev}`} aria-disabled={guessedLetters.includes(prev)} disabled={gameover} className={classname} onClick={()=>addguessedLetters(prev)}>{prev.toUpperCase()}</button>
})

const classnamegame_state=clsx("game-state",gamewim  && "win",gamelost && "lost",islastguessedLetters&& !gamelost &&!gamewim  && "farewell");

const winAudio = useRef(new Audio(winSound));
const loseAudio = useRef(new Audio(loseSound));
  useEffect(()=>{
if(gameover){
 if(gamewim){
  winAudio.current.play();
 }
 else{
  loseAudio.current.play()
 }
}
  },[gameover])


 useEffect(()=>{
  if(gameover){
    setShowModal(true);
    
  }
},[gameover]);


const dangerLevel = wrongGuessesArray.length / (languages.length-1);

  return (
    <main 
className={clsx(shake && "shake")} 
style={{
  boxShadow: `inset 0 0 ${dangerLevel*120}px rgba(255,0,0,${dangerLevel})`
}}
>


{showModal && gamewim && (
  <div className="modal-overlay open" role="dialog" aria-modal="true">
    <div className="modal win">
      <h2>🎉 You Win!</h2>
      <p>Well done! Keep going 🔥</p>
      <button className="modal-btn" onClick={()=>resetwindow()}>Play Again</button>
    </div>
  </div>
)}

{showModal && gamelost && (
  <div className="modal-overlay open" role="dialog" aria-modal="true">
    <div className="modal lose">
      <h2>💀 Game Over!</h2>
      <p>The word was: <b>{chipsworld.toUpperCase()}</b></p>
      <button className="modal-btn" onClick={()=>resetwindow()}>Try Again</button>
    </div>
  </div>
)}



    {gamewim && <Confetti width={screenSize.w} height={screenSize.h} />}

  <header>
    <h1>Assembly: Endgame</h1>
    <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
  <div className="score-box">
  <h3>Score</h3>
  <p>Wins:{stats.win} </p>
  <p>Losses: {stats.losse}</p>
  <p>Streak: {stats.streak}</p>
</div>
  </header>
  <section role="status" aria-live="polite" className={classnamegame_state}>
    {renderGameStatus()}
  </section>
  <section className="languages-chips">
    {chips_bouton}
  </section>
  <section className="word">
    {chipsworld_bouton}
  </section>

  {/* Combined visually-hidden aria-live region for status updates */}
 
  <section className="sr-only" role="status" aria-live="polite" >
    <p>
  {chipsworld.includes(lastguessedLetters) ?
    `Correct! The letter ${lastguessedLetters} is in the word.` :
    `Sorry, the letter ${lastguessedLetters} is not in the word.`
  }
  You have {numGuessesLeft} attempts left.
</p>

    <p>
Current word: {chipsworld.split("").map(letter =>
  guessedLetters.includes(letter) ? letter + "." : "blank."
  )
  .join(" ")}
</p>

  </section>
  <section className="keyboard">
    {key_borad}
  </section>

{difficulty === null && (
  <div className="difficulty-box">
  <h3>Difficulty</h3>

  <button onClick={() => chooseDifficulty("easy")}>Easy</button>
  <button onClick={() => chooseDifficulty("medium")}>Medium</button>
  <button onClick={() => chooseDifficulty("hard")}>Hard</button>
</div>

)}

  {difficulty!=null && gameover&& <button onClick={resetGame} id="New-Game">New Game</button>}
    </main>
  );
}
