import { pubsub } from "./pubSub";

export const render = (() => {
  const computerDomContainer = document.querySelector(".cmptr-board-container");
  const restartButton = document.querySelector(".restart-button.hidden");
  const infoHeader = document.querySelector(".info-header");
  const shipHeader = document.querySelector(".ship-header");
  const hitHeader = document.querySelector('.hit-status');

  restartButton.addEventListener("click", () => {
    window.location.reload();
  });

  const showCantPlaceShipMessage = (index) =>{
    shipHeader.textContent = `Can't place ship on coordinates ${index[0]}-${index[1]}!`;
    setTimeout(clearSunkShipInfo,3000);
  }
  const showGameStartedMessage = () => {
    shipHeader.textContent = `Game has started!`;
    setTimeout(clearSunkShipInfo,3000);
  }

  const shotHitStatus = (hitInfo) => {
    if(hitInfo === 'hit'){
      hitHeader.textContent = 'BOOM!It\'s a hit!';
    }else{
      hitHeader.textContent = 'Oops you missed!';
    }
    setTimeout(() => {
      hitHeader.textContent = "";
    },2000);
  }

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
  }

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

  const createComputerBoardCells = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell2 = document.createElement("div");
        cell2.dataset.index = `${i}${j}`;
        cell2.classList.add("cmptr-cell");
        cell2.addEventListener("click", sendCoordinateInfo);
        computerDomContainer.appendChild(cell2);
      }
    }
  };

  const renderComputerBoardForStart = () => {
    createComputerBoardCells();

    computerDomContainer.classList.toggle("hidden");
  };

  const sendCoordinateInfo = (e) => {
    pubsub.publish("playerClickedOnCmptrcell", e.target.dataset.index);
  };

  const renderAttackedComputerNode = (...boardNode) => {
    let node = JSON.parse(boardNode[0]);
    let cell = document.querySelector(
      `.cmptr-cell[data-index="${boardNode[1]}${boardNode[2]}"]`
    );
    cell.removeEventListener("click", sendCoordinateInfo);
    cell.classList.add("clicked");
    checkNodeValueAndStatus(node, cell);
    pubsub.publish("cmptrBoardRenderFinished", "");
  };

  const destroyPlacementBoard = () => {
    infoHeader.textContent = `Players's turn`;
    let shipContainer = document.querySelector(".ship-container");
    shipContainer.remove();
  };
  const showCurrentPlayer = (contestent) => {
    switch (contestent) {
      case "Player": {
        infoHeader.textContent = `Computer's Turn`;
        break;
      }
      case "Computer": {
        infoHeader.textContent = `Player's Turn`;
        break;
      }
    }
  };

  const showSunkShipInfo = (data) => {
    let currentPlayer;
    data[0] === 'Player'? currentPlayer='Computer': currentPlayer='Player';
    shipHeader.textContent = `${currentPlayer} has sunked ${data[0]}'s ${data[1]}`;
    setTimeout(clearSunkShipInfo,3000);
   
  }
  function clearSunkShipInfo(){
    shipHeader.textContent='';
  }
  const setEndGameUI = (winner) => {
    infoHeader.textContent = `Game Over! ${winner} has won!`;
    let [...computerCells] = computerDomContainer.childNodes;
    computerCells.forEach((cell) => {
      cell.removeEventListener("click", sendCoordinateInfo);
      cell.classList.toggle("gameEnd");
    });
    restartButton.classList.toggle("hidden");
  };

  pubsub.subscribe("playerBoardPopulated", renderPlayerBoardForStart);
  pubsub.subscribe("playerAttackFinished", renderAttackedComputerNode);
  pubsub.subscribe("cmptrAttackFinished", renderPlayerBoardNode);
  pubsub.subscribe("allShipsPlaced", renderComputerBoardForStart);
  pubsub.subscribe("allShipsPlaced", destroyPlacementBoard);
  pubsub.subscribe("attackFinished", showCurrentPlayer);
  pubsub.subscribe('emitShipAndPlayerName', showSunkShipInfo);
  pubsub.subscribe("gameEnded", setEndGameUI);
  pubsub.subscribe("cantPlaceShipOnNode", showCantPlaceShipMessage);
  pubsub.subscribe("allShipsPlaced", showGameStartedMessage);
  pubsub.subscribe("sendHitStatus", shotHitStatus);

})();
