import { pubsub } from "./pubSub";

export const renderPlayerBoard = (() => {
  const renderPlayerBoardForStart = (data) => {
    let board = JSON.parse(data);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let cell = document.querySelector(`.plyr-cell[data-index="${i}${j}"]`);
        let node = board[i][j];
        checkNodeValueAndStatus(node, cell);
      }
    }
  
  };
  const renderPlayerBoardNode = (...boardNode) => {
    let cell = document.querySelector(
        `.plyr-cell[data-index="${boardNode[1]}${boardNode[2]}"]`
      );
        let node = JSON.parse(boardNode[0]);
        checkNodeValueAndStatus(node, cell);
        
  };
  const renderComputerBoard = (...boardNode) => {
    let node = JSON.parse(boardNode[0]);
    let cell = document.querySelector(
      `.cmptr-cell[data-index="${boardNode[1]}${boardNode[2]}"]`
    );

    checkNodeValueAndStatus(node, cell);
    pubsub.publish("cmptrBoardRenderFinished", "finished");
  };

  pubsub.subscribe("playerBoardPopulated", renderPlayerBoardForStart);
  pubsub.subscribe("playerAttackFinished", renderComputerBoard);
  pubsub.subscribe("cmptrAttackFinished", renderPlayerBoardNode);


function checkNodeValueAndStatus(node, cell) {
  let nodeStatus = node.nodeStatus;
  if (node.nodeValue) {
    switch (nodeStatus) {
      case "default": {
        cell.style.backgroundColor = "green";
        break;
      }
      case "hit": {
        cell.style.backgroundColor = "red";
        break;
      }
    }
  } else {
    if (nodeStatus === "miss") {
      cell.style.backgroundColor = "yellow";
    }
  }
}})();
