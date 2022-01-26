import { gameBoardNodeFactory } from "./gameBoardNodeFactory";
import { shipFactory } from "./shipFactory";

const gameBoardFactory = () => {
  let gameBoardMatrix = [];

  const createGameBoardMatrix = (row, column) => {
    for (let i = 0; i < row; i++) {
      gameBoardMatrix.push([]);
      gameBoardMatrix[i].push(new Array(column));
    }
  };

  const populateGameBoardMatrix = () => {
    for (let i = 0; i < gameBoardMatrix.length; i++) {
      for (let j = 0; j < gameBoardMatrix[i].length; j++) {
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
    for (row; row < row + length; row++) {
      gameBoardMatrix[row][col].changeNodeValue(ship);
    }
  };

  const createShipAtCoord = (row, col, length) => {
    if (canCreateShipAtCoords(row, col, length)) {
      const ship = shipFactory(length);
      placeShipOnCoords(ship);
      return true;
    }
    return false;
  };

  const checkCoordinates = (row, column) => {};
  const receiveAttack = (row, column) => {};

  createGameBoardMatrix();
  populateGameBoardMatrix();
};
