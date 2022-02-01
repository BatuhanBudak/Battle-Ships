import { pubsub } from "./pubSub";

const width = 10;
const playerDomContainer = document.querySelector(".plyr-board-container");
const computerDomContainer = document.querySelector(".cmptr-board-container");
const rotateButton = document.querySelector("#rotate-button");

rotateButton.addEventListener("click", rotateShips);
function removeRotateButton(){
  rotateButton.remove();
}
let ships = document.querySelectorAll(".ship");

function rotateShips() {
  ships.forEach((ship) => {
    ship.classList.toggle("v");
    ship.classList.toggle("h");
  });
}

ships.forEach((ship) =>
  ship.addEventListener("dragstart", ship_dragstart_handler)
);

const createPlayerBoardCells = () => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      let cell = document.createElement("div");
      cell.dataset.index = `${i}${j}`;
      cell.classList.add("plyr-cell");
      cell.addEventListener("dragover", player_dragover_handler);
      cell.addEventListener("dragenter", player_dragenter_handler);
      cell.addEventListener("drop", player_drop_handler);
      playerDomContainer.appendChild(cell);
    }
  }
};
function ship_dragstart_handler(e) {
  e.dataTransfer.setData(
    "text/plain",
    `${e.target.classList},${e.target.dataset.length},${e.target.id}`
  );
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";
  console.log(e.target);
}

function player_dragenter_handler(e) {
  e.preventDefault();
}
function player_dragover_handler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}
function player_drop_handler(e) {
  e.preventDefault();
  let data = e.dataTransfer.getData("text/plain");
  if (data === null) return;
  let dataArr = data.split(",");
  if (dataArr[0].includes("ship v")) {
    pubsub.publish("shipDraggedVertically", [
      e.target.dataset.index,
      dataArr[1],
      dataArr[2],
    ]);
  } else if (dataArr[0].includes("ship h")) {
    pubsub.publish("shipDraggedHorizontally", [
      e.target.dataset.index,
      dataArr[1],
      dataArr[2],
    ]);
  }
}
function destroyShip(name){
  document.getElementById(name).remove();
}

pubsub.subscribe('shipPlacedOnBoard', destroyShip);
pubsub.subscribe('allShipsPlaced', removeRotateButton);



export { createPlayerBoardCells };
