import React from "react";
import { nanoid } from "nanoid";
import Character from "./components/Character";
import Boat from "./components/Boat";

export default function App() {
  const [characters, setCharacters] = React.useState(generateChar(3, 3));
  const [boat, setBoat] = React.useState({
    side: "left",
    move: false,
    passengers: 0,
  });

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
      });
    }

    return charArr;
  }

  //end helper functions
  //event functions
  function boatUnboat(id) {
    setCharacters((prevCharacters) => {
      return prevCharacters.map((preChar) => {
        if (preChar.id === id) {
          if (boat.side === "left" && preChar.onBoat) {
            console.log("boat to unboat");
            removePassenger();
            return {
              ...preChar,
              onBoat: false,
              moveToLeft: true,
              moveToRight: false,
            };
          } else if (boat.side === "right" && preChar.onBoat) {
          } else if (!preChar.onBoat && preChar.side === "left") {
            if (boat.passengers === 2) return preChar;
            addPassenger();
            return {
              ...preChar,
              onBoat: true,
              moveToRight: true,
              moveToLeft: false,
            };
          } else {
          }
        } else return preChar;
      });
    });
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
        };
      });
    });
  }
  //end event functions
  // obj to elemenet
  const charactersArr = characters.map((char) => {
    if (!char.onBoat && !char.moveToLeft) {
      return (
        <Character
          key={char.id}
          char={char}
          boatUnboat={boatUnboat}
          animeFinish={animationFinsih}
        />
      );
    } else if (char.onBoat && char.moveToRight) {
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

  console.log(characters);
  return (
    <div className="container">
      <div className="characters-container">{charactersArr}</div>
      <div className="river">
        <button className="move-btn">move</button>
        {
          <Boat
            boat={boat}
            characters={characters}
            boatUnboat={boatUnboat}
            animeFinish={animationFinsih}
          />
        }
      </div>
    </div>
  );
}
