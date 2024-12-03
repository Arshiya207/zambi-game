import React from "react";
import { nanoid } from "nanoid";
import Character from "./components/Character";
import Boat from "./components/Boat";
import Confetti from "react-confetti";

export default function App() {
  const [characters, setCharacters] = React.useState(generateChar(3, 3));
  const [boat, setBoat] = React.useState({
    side: "left",
    move: false,
    passengers: 0,
    isAnimating: false,
  });
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isLost, setIsLost] = React.useState(false);
  const isCharAnimationPending = characters.some((char) => char.isAnimating);

  //helper functions
  function generateChar(human, zambi) {
    const charArr = [];

    for (let i = 0; i < human; i++) {
      charArr.push({
        type: "human",
        onBoat: false,
        side: "left",
        id: nanoid(),
        src: "human",
        moveToRight: false,
        moveToLeft: false,
        isAnimating: false,
      });
    }
    for (let i = 0; i < zambi; i++) {
      charArr.push({
        type: "zambi",
        onBoat: false,
        side: "left",
        id: nanoid(),
        src: "zambi",
        moveToRight: false,
        moveToLeft: false,
        isAnimating: false,
      });
    }

    return charArr;
  }
  function addPassenger() {
    setBoat((prevBoat) => {
      return { ...prevBoat, passengers: prevBoat.passengers + 1 };
    });
  }
  function removePassenger() {
    setBoat((prevBoat) => {
      return { ...prevBoat, passengers: prevBoat.passengers - 1 };
    });
  }
  function animationFinsih() {
    setCharacters((prevCharacters) => {
      return prevCharacters.map((preChar) => {
        return {
          ...preChar,
          moveToLeft: false,
          moveToRight: false,
          isAnimating: false,
        };
      });
    });
  }
  function stopBoatMove() {
    setBoat((prevBoat) => {
      return { ...prevBoat, move: false, isAnimating: false };
    });
  }

  //end helper functions
  //event functions
  function boatUnboat(id) {
    if (isCharAnimationPending || boat.isAnimating || isGameOver) return;
    setCharacters((prevCharacters) => {
      return prevCharacters.map((preChar) => {
        if (preChar.id === id) {
          if (boat.side === "left" && preChar.onBoat) {
            // unboat to left
            removePassenger();
            return {
              ...preChar,
              onBoat: false,
              moveToLeft: true,
              moveToRight: false,
              isAnimating: true,
            };
          } else if (boat.side === "right" && preChar.onBoat) {
            //unboat to the right
            removePassenger();
            return {
              ...preChar,
              onBoat: false,
              moveToLeft: false,
              moveToRight: true,
              isAnimating: true,
            };
          } else if (!preChar.onBoat && preChar.side === "left") {
            // add to boat from left if passenger are 2 do nothing and return the obj
            if (boat.passengers === 2 || boat.side === "right") return preChar;
            addPassenger();
            return {
              ...preChar,
              onBoat: true,
              moveToRight: true,
              moveToLeft: false,
              isAnimating: true,
            };
          } else if (!preChar.onBoat && preChar.side === "right") {
            if (boat.passengers === 2 || boat.side === "left") return preChar;
            addPassenger();
            return {
              ...preChar,
              onBoat: true,
              moveToRight: false,
              moveToLeft: true,
              isAnimating: true,
            };
          }
        } else return preChar;
      });
    });
  }
  function moveBoat() {
    if (
      boat.isAnimating ||
      isCharAnimationPending ||
      isGameOver ||
      boat.passengers < 1
    )
      return;

    if (boat.side === "left") {
      setBoat((prevBoat) => {
        return { ...prevBoat, move: true, isAnimating: true, side: "right" };
      });
      setCharacters((prevCharacters) => {
        return prevCharacters.map((char) => {
          if (char.onBoat) {
            return { ...char, side: "right" };
          } else {
            return char;
          }
        });
      });
    } else {
      setBoat((prevBoat) => {
        return { ...prevBoat, move: true, isAnimating: true, side: "left" };
      });
      setCharacters((prevCharacters) => {
        return prevCharacters.map((char) => {
          if (char.onBoat) {
            return { ...char, side: "left" };
          } else {
            return char;
          }
        });
      });
    }
  }
  function reset() {
    setCharacters(generateChar(3, 3));
    setIsGameOver(false);
    setIsLost(false);
    setBoat({ side: "left", move: false, passengers: 0, isAnimating: false });
  }
  //end event functions
  // use effects

  // use effect to check for win or lose
  React.useEffect(() => {
    let humanLeft = 0;
    let humanRight = 0;
    let zambiLeft = 0;
    let zambiRight = 0;
    characters.forEach((char) => {
      if (char.side === "right" && char.type === "human") {
        humanRight++;
      } else if (char.side === "left" && char.type === "human") {
        humanLeft++;
      } else if (char.side === "left" && char.type === "zambi") {
        zambiLeft++;
      } else if (char.side === "right" && char.type === "zambi") {
        zambiRight++;
      }
    });

    const areAllHumanRight = humanRight === 3 ? true : false;
    if (boat.isAnimating) return;

    if (!boat.isAnimating && areAllHumanRight) {
      alert("you won");
      setIsGameOver(true);
      setIsLost(false);
    } else if (
      (zambiLeft > humanLeft && humanLeft > 0) ||
      (zambiRight > humanRight && humanRight > 0)
    ) {
      alert("zambis ate all the humans");
      setIsGameOver(true);
      setIsLost(true);
    }
  }, [boat]);
  // end use effects
  // obj to elemenet
  const charactersArrLeft = characters.map((char) => {
    if (
      (char.side === "left" && !char.onBoat && !char.isAnimating) ||
      (char.onBoat && char.isAnimating && char.side !== "right")
    ) {
      return (
        <Character
          key={char.id}
          char={char}
          boatUnboat={boatUnboat}
          animeFinish={animationFinsih}
        />
      );
    }
  });
  const charactersArrRight = characters.map((char) => {
    if (
      (char.side === "right" && !char.onBoat && !char.isAnimating) ||
      (char.onBoat && char.isAnimating && char.side !== "left")
    ) {
      return (
        <Character
          key={char.id}
          char={char}
          boatUnboat={boatUnboat}
          animeFinish={animationFinsih}
        />
      );
    }
  });
  //end obj to elemenet

  return (
    <div className="container">
      {isGameOver && !isLost && <Confetti />}
      <div className="characters-container" data-left>
        {charactersArrLeft}
      </div>
      <div className="river">
        <button className="btn" onClick={moveBoat}>
          move
        </button>
        <button className="btn" onClick={reset}>
          reset game
        </button>
        {
          <Boat
            boat={boat}
            characters={characters}
            boatUnboat={boatUnboat}
            animeFinish={animationFinsih}
            stopBoatMove={stopBoatMove}
          />
        }
      </div>
      <div className="characters-container" data-right>
        {charactersArrRight}
      </div>
    </div>
  );
}
