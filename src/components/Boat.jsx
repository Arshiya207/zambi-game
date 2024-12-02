import Character from "./Character";
export default function Boat(props) {
  const boatPassengers = props.characters.filter((char) => {
    if (char.onBoat) {
      return char.onBoat && !char.moveToRight && !char.moveToLeft;
    } else {
      return char.moveToRight || char.moveToLeft;
    }
  });
  // const characterMoveReset=boatPassengers.map(pass=>{
  //     return {...pass,moveToRight:false}
  // })

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
  return <div className="boat">{passengersElements}</div>;
}
