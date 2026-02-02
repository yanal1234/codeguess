import Die from "./die";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti"

export default function App() {
const [die,setdie]=useState(()=>greaterrandomeNumber());
const gameWon=die.every(d=>d.isHeld===true&& d.value===die[0].value);
const [tenzies,settenzies]=useState(false);
const boutoonref=useRef(null);
useEffect(()=>{
  if(gameWon){
  boutoonref.current.focus();
  settenzies(true);
  }
  else{
    settenzies(false);
  }
},[gameWon])
  function greaterrandomeNumber(){
   return new Array(10).fill(0).map(function(x,index) {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id:index
    };
  });
  }
    function RoallDie(){
   setdie(die.map(function(prev){
    if(gameWon===false){
    if(prev.isHeld==true){
      return {...prev}
    }
    else{
      return {...prev,value:Math.ceil(Math.random() * 6)}
    }}
    else{
      return {...prev,value:Math.ceil(Math.random() * 6),isHeld:false}
    }
   }));
  }
function ChangeStyle(p){
setdie(die.map(function(prev){
  if(p===prev.id){
    return{...prev,isHeld:!prev.isHeld}
  }
  else{
    return {...prev}
  }
}))
}
  const dieelement=die.map(p=><Die value={p.value}  isHeld={p.isHeld} fun={ChangeStyle} id={p.id} />)
  return (
    <main>
    {tenzies&& <Confetti />}
      <div className="titel">
        <h1>Tenzies</h1>
        <h4>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
      </div>
      <div className="dice-container">
        {dieelement}
      </div>
      <button ref={boutoonref} className="RoallDie" onClick={RoallDie}>{gameWon?"New Game":"Roal"}</button>
    </main>
  );
}
