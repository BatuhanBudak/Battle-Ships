import { gameBoardNodeFactory } from "./gameBoardNodeFactory";
import { pubsub } from "./pubSub";
import { shipFactory } from "./shipFactory";

const gameBoardFactory = (name) => {
  let gameBoardMatrix = [];
  let shipsArray = [];
  let boardName = name;
  const createGameBoardMatrix = () => {
    for (let i = 0; i < 10; i++) {
      gameBoardMatrix.push([]);
      gameBoardMatrix[i].push(new Array(10));
    }
  };

  const populateGameBoardMatrix = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        gameBoardMatrix[i][j] = gameBoardNodeFactory();
      }
    }
  };
  const isCoordEmpty = (x, y) => {
    return gameBoardMatrix[x][y].isNodeEmpty;
  };
  const checkLengthForVerticalShipPlacement = (row, shipLength) => {
    return row + shipLength <= gameBoardMatrix.length;
  };

  const chechkNodesForVerticalShipPlacement = (row, col, shipLength) => {
    for (row; row < shipLength; row++) {
      if (!isCoordEmpty(row, col)) {
        return false;
      }
    }
    return true;
  };

  const canCreateShipAtCoordsVertically = (row, col, shipLength) => {
    return (
      checkLengthForVerticalShipPlacement(row, shipLength) &&
      chechkNodesForVerticalShipPlacement(row, col, shipLength)
    );
  };

  const placeShipOnCoordsVertically = (row, col, length, ship) => {
    for (let i = row; i < row + length; i++) {
      gameBoardMatrix[i][col].changeNodeValueToShip(ship);
    }
  };

  const createShipAtCoordVertically = (data) => {
    let row = +data[0].slice(0, 1);
    let col = +data[0].slice(1);
    let length = +data[1];
    let name = data[2];
    if (canCreateShipAtCoordsVertically(row, col, length)) {
      const ship = shipFactory(length, name);
      placeShipOnCoordsVertically(row, col, length, ship);
      shipsArray.push(ship);
      pubsub.publish("playerBoardPopulated", JSON.stringify(gameBoardMatrix));
      pubsub.publish("shipPlacedOnBoard", name);
      haveShipsPlacedOnBoard();
      return true;
    }
    return false;
  };

  const checkLengthForHorizontalShipPlacement = (col, shipLength) => {
    return col + shipLength <= gameBoardMatrix[col].length;
  };

  const chechkNodesForHorizontalShipPlacement = (row, col, shipLength) => {
    for (col; col < shipLength; col++) {
      if (!isCoordEmpty(row, col)) {
        return false;
      }
    }
    return true;
  };
  const canCreateShipAtCoordsHorizontally = (row, col, shipLength) => {
    return (
      checkLengthForHorizontalShipPlacement(col, shipLength) &&
      chechkNodesForHorizontalShipPlacement(row, col, shipLength)
    );
  };
  const placeShipOnCoordsHorizontally = (row, col, length, ship) => {
    for (let i = col; i < col + length; i++) {
      gameBoardMatrix[row][i].changeNodeValueToShip(ship);
    }
  };

  const createShipAtCoordHorizontally = (data) => {
    let row = +data[0].slice(0, 1);
    let col = +data[0].slice(1);
    let length = +data[1];
    let name = data[2];
    if (canCreateShipAtCoordsHorizontally(row, col, length)) {
      const ship = shipFactory(length, name);
      placeShipOnCoordsHorizontally(row, col, length, ship);
      shipsArray.push(ship);
      pubsub.publish("playerBoardPopulated", JSON.stringify(gameBoardMatrix));
      pubsub.publish("shipPlacedOnBoard", name);
      haveShipsPlacedOnBoard();
      return true;
    }
    return false;
  };
  const computerCreateShipAtCoordVertically = (row, col, length, name) => {
    if (canCreateShipAtCoordsVertically(row, col, length)) {
      const ship = shipFactory(length, name);
      placeShipOnCoordsVertically(row, col, length, ship);
      shipsArray.push(ship);
      return true;
    }
    return false;
  };
  const computerCreateShipAtCoordHorizontally = (row, col, length, name) => {
    if (canCreateShipAtCoordsHorizontally(row, col, length)) {
      const ship = shipFactory(length, name);
      placeShipOnCoordsHorizontally(row, col, length, ship);
      shipsArray.push(ship);
      return true;
    }
    return false;
  };

  const checkCoordinatesForPossibleHit = (row, col) => {
    return gameBoardMatrix[row][col].isNodeEmpty();
  };

  const receiveAttack = (row, col) => {
    if (checkCoordinatesForPossibleHit(row, col)) {
      gameBoardMatrix[row][col].changeNodeStatusToMiss();
      pubsub.publish("cmptrMissed", [row, col]);
      pubsub.publish(
        "cmptrAttackFinished",
        JSON.stringify(gameBoardMatrix[row][col]),
        row,
        col
      );
      return false;
    } else {
      gameBoardMatrix[row][col].changeNodeStatusHit();
      pubsub.publish(
        "cmptrAttackFinished",
        JSON.stringify(gameBoardMatrix[row][col]),
        row,
        col
      );
      return gameBoardMatrix[row][col].getNodeValue().hit();
    }
  };
  const receiveAttackComputer = (row, col) => {
    if (checkCoordinatesForPossibleHit(row, col)) {
      gameBoardMatrix[row][col].changeNodeStatusToMiss();
      pubsub.publish(
        "playerAttackFinished",
        JSON.stringify(gameBoardMatrix[row][col]),
        row,
        col
      );
      return false;
    } else {
      gameBoardMatrix[row][col].changeNodeStatusHit();
      pubsub.publish(
        "playerAttackFinished",
        JSON.stringify(gameBoardMatrix[row][col]),
        row,
        col
      );
      return gameBoardMatrix[row][col].getNodeValue().hit();
    }
  };
  const checkDamageStatusOfShips = () => {
    if (shipsArray.every((ship) => ship.isDead())) {
      pubsub.publish("allShipsSunked", boardName);
    }
  };
  const haveShipsPlacedOnBoard = () => {
    if (shipsArray.length === 5) {
      pubsub.publish("allShipsPlaced", null);
    }
  };

  createGameBoardMatrix();
  populateGameBoardMatrix();

  pubsub.subscribe("shipDraggedVertically", createShipAtCoordVertically);
  pubsub.subscribe("shipDraggedHorizontally", createShipAtCoordHorizontally);
  pubsub.subscribe("shipSinked", checkDamageStatusOfShips);

  return {
    createShipAtCoordVertically,
    receiveAttack,
    checkDamageStatusOfShips,
    receiveAttackComputer,
    computerCreateShipAtCoordVertically,
    computerCreateShipAtCoordHorizontally,
  };
};
export { gameBoardFactory };
