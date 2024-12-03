import { useEffect } from "react";
import Character from "./Character";
export default function Boat(props) {
  const boatProp = props.boat;
  const boatPassengers = props.characters.filter((char) => {
    return (
      (char.onBoat && !char.isAnimating) || (!char.onBoat && char.isAnimating)
    );
  });
  const conditionClass = {
    toRight:
      boatProp.move && boatProp.side === "left" && boatProp.isAnimating
        ? "boat-to-left"
        : "",
    toLeft:
      boatProp.move && boatProp.side === "right" && boatProp.isAnimating
        ? "boat-to-right"
        : "",
    stay:
      !boatProp.move && boatProp.side === "right" && !boatProp.isAnimating
        ? "stay-right"
        : "stay-left",
  };
  useEffect(() => {
    const b = document.querySelector(".boat");
    function animeEnd() {
      props.stopBoatMove();
    }
    b.addEventListener("animationend", animeEnd);
    return () => {
      b.removeEventListener("animationend", animeEnd);
    };
  }, [boatProp.move]);

  // obj to element
  const passengersElements = boatPassengers.map((char) => {
    return (
      <Character
        key={char.id}
        char={char}
        boatUnboat={props.boatUnboat}
        animeFinish={props.animeFinish}
      />
    );
  });
  return (
    <div
      className={`boat ${
        conditionClass.toRight +
        " " +
        conditionClass.toLeft +
        " " +
        conditionClass.stay
      }`}
    >
      {passengersElements}
    </div>
  );
}
