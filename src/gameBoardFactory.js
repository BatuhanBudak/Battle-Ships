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

  const createShipAtCoordVertically = (row, col, length) => {
    if (canCreateShipAtCoordsVertically(row, col, length)) {
      const ship = shipFactory(length);
      placeShipOnCoordsVertically(row, col, length, ship);
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
      gameBoardMatrix[row][column].changeNodeStatusToMiss();
      missedShotArray.push([row, column]);
      return false;
    } else {
      gameBoardMatrix[row][column].changeNodeStatusHit();
      return gameBoardMatrix[row][column].getNodeValue().hit();
    }
  };
  const checkDamageStatusOfShips = () => {
    return shipsArray.every((ship) => ship.isDead());
  };
  const getMissedShotCoordsArr = () => missedShotArray;

  const getBoardMatrix = () => gameBoardMatrix;
  const getNodeValueFromBoard = (row, col) => gameBoardMatrix[row][col].getNodeValue(); 
  const getNodeStatusFromBoard = (row, col) => gameBoardMatrix[row][col].getNodeStatus(); 


  createGameBoardMatrix(row, column);
  populateGameBoardMatrix(row, column);

  return {
    createShipAtCoordVertically,
    receiveAttack,
    checkDamageStatusOfShips,
    getMissedShotCoordsArr,
    getBoardMatrix,
    getNodeValueFromBoard,
    getNodeStatusFromBoard
  };
};
export { gameBoardFactory };
