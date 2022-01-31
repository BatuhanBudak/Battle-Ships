import { pubsub } from "./pubSub";
const ComputerPlayer = (board) => {
  let computerBoard = board;
  let takenShotsCoordinatesArray = [];
  let missedShotsArr = [];

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const generateRandomShootCoords = () => {
    let row = randomIntFromInterval(0, 9);
    let col = randomIntFromInterval(0, 9);
    return [row, col];
  };

  const receiveAttack = (coords) => {
    return computerBoard.receiveAttackComputer(+coords[0], +coords[1]);
  };
  function attack() {
    let [row, col] = generateRandomShootCoords();
    while (
      missedShotsArr.includes([row, col]) ||
      takenShotsCoordinatesArray.includes([row, col])
    ) {
      [row, col] = generateRandomShootCoords();
    }
    takenShotsCoordinatesArray.push([row, col]);
    pubsub.publish("cmptrAttacks", [row, col]);
  }
  const cmptrAttacks = () => setTimeout(attack, 1000);
  const addToMissedShotsArr = (coords) => missedShotsArr.push(coords);

  pubsub.subscribe("playerAttacks", receiveAttack);
  pubsub.subscribe("cmptrBoardRenderFinished", cmptrAttacks);
  pubsub.subscribe("cmptrMissed", addToMissedShotsArr);
};
export { ComputerPlayer };
