import React from "react";
import zambi from "../images/zambi.gif";
import human from "../images/human.gif";

export default function Character(props) {
  const classCondition = {
    toRight:
      props.char.moveToRight && props.char.side === "left"
        ? "to-boat-to-right"
        : "",
    onBoat: props.char.onBoat ? "onBoat" : "",
    toLeft:
      props.char.moveToLeft && props.char.side === "left"
        ? "to-boat-to-left"
        : "",
    enterance:
      !props.char.moveToRight && !props.char.moveToLeft ? "charEnterance " : "",
  };
  //use effects
  React.useEffect(() => {
    const characters = document.querySelectorAll(".character-container");

    characters.forEach((char) => {
      char.addEventListener("animationend", animeEnd);
    });

    function animeEnd() {
      props.animeFinish();
    }
    return () => {
      characters.forEach((char) => {
        char.removeEventListener("animationend", animeEnd);
      });
    };
  }, [props.char]);

  return (
    <div
      className={`character-container ${classCondition.enterance} ${classCondition.toRight} ${classCondition.toLeft} ${classCondition.onBoat}`}
      onClick={() => props.boatUnboat(props.char.id)}
    >
      <img
        src={props.char.src === "human" ? human : zambi}
        alt="character"
        className="character"
      />
    </div>
  );
}
