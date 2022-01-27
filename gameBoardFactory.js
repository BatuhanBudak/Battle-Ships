import { gameBoardNodeFactory } from "./gameBoardNodeFactory";
import { shipFactory } from "./shipFactory";

const gameBoardFactory = (row, column) => {
  let gameBoardMatrix = [];
  let shipsArray = [];
  let missedShotArray = [];

  const createGameBoardMatrix = (row, column) => {
    for (let i = 0; i < row; i++) {
      gameBoardMatrix.push([]);
      gameBoardMatrix[i].push(new Array(column));
    }
  };

  const populateGameBoardMatrix = (row, column) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        gameBoardMatrix[i][j] = gameBoardNodeFactory();
      }
    }
  };
  const isCoordEmpty = (x, y) => {
    return gameBoardMatrix[x][y].isNodeEmpty;
  };
  const checkLengthForShipPlacement = (row, shipLength) => {
    return row + shipLength <= gameBoardMatrix.length;
  };

  const chechkNodesForShipPlacement = (x, y, shipLength) => {
    for (x; x < shipLength; x++) {
      if (!isCoordEmpty(x, y)) {
        return false;
      }
    }
    return true;
  };

  const canCreateShipAtCoords = (row, col, shipLength) => {
    return (
      checkLengthForShipPlacement(row, shipLength) &&
      chechkNodesForShipPlacement(row, col, shipLength)
    );
  };

  const placeShipOnCoords = (row, col, length, ship) => {
    for (let i = row; i < row + length; i++) {
      gameBoardMatrix[i][col].changeNodeValueToShip(ship);
    }
  };

  const createShipAtCoord = (row, col, length) => {
    if (canCreateShipAtCoords(row, col, length)) {
      const ship = shipFactory(length);
      placeShipOnCoords(row, col, length, ship);
      shipsArray.push(ship);
      return true;
    }
    return false;
  };

  const checkCoordinatesForPossibleHit = (row, column) => {
    return gameBoardMatrix[row][column].isNodeEmpty();
  };

  const receiveAttack = (row, column) => {
    if (checkCoordinatesForPossibleHit(row, column)) {
      gameBoardMatrix[row][column].changeNodeValueToMiss();
      missedShotArray.push([row,column]);
      return false;
    } else {
      return gameBoardMatrix[row][column].getNodeValue().hit();
    }
  };
  const checkDamageStatusOfShips = () => {
    return shipsArray.every((ship) => ship.isDead());
  };
  const getMissedShotCoordsArr = () => missedShotArray;


  createGameBoardMatrix(row, column);
  populateGameBoardMatrix(row, column);

  return {
    createShipAtCoord,
    receiveAttack,
    checkDamageStatusOfShips,
    getMissedShotCoordsArr
  };
};
export { gameBoardFactory };
