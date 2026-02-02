export default function Die(prope) {
  var style1;

  if (prope.isHeld === true) {
    style1 = { backgroundColor: "#59E391" };
  } else {
    style1 = { backgroundColor: "#f5f5f5" };
  }

  return (
    <div>
      <button
        style={style1}
          aria-pressed={prope.isHeld}
          aria-label={"Die with value " + prope.value + ", " + (prope.isHeld ? "held" : "not held")}
        onClick={function () {
          prope.fun(prope.id);
        }}
        className="dice-containeron"
        
      >
        {prope.value}
      </button>
    </div>
  );
}
