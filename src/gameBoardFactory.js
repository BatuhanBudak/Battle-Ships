import { gameBoardNodeFactory } from "./gameBoardNodeFactory";
import { pubsub } from "./pubSub";
import { shipFactory } from "./shipFactory";

const gameBoardFactory = (row, column) => {
  let gameBoardMatrix = [];
  let shipsArray = [];
  

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

  const createShipAtCoordVertically = (data) => {
    let row = +data[0].slice(0,1);
    let col = +data[0].slice(1);
    let length = +data[1];
    let name = data[2];
    if (canCreateShipAtCoordsVertically(row, col, length)) {
      const ship = shipFactory(length);
      placeShipOnCoordsVertically(row, col, length, ship);
      shipsArray.push(ship);
      pubsub.publish('playerBoardPopulated', JSON.stringify(gameBoardMatrix));
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
      pubsub.publish('cmptrMissed',[row,col]);
      pubsub.publish('cmptrAttackFinished', JSON.stringify(gameBoardMatrix[row][col]),row, col);
      return false;
    } else {
      gameBoardMatrix[row][col].changeNodeStatusHit();
      pubsub.publish('cmptrAttackFinished', JSON.stringify(gameBoardMatrix[row][col]),row, col);
      return gameBoardMatrix[row][col].getNodeValue().hit();
    }
  };
  const receiveAttackComputer = (row, col) => {
    
    if (checkCoordinatesForPossibleHit(row, col)) {
      gameBoardMatrix[row][col].changeNodeStatusToMiss();
      pubsub.publish('playerAttackFinished', JSON.stringify(gameBoardMatrix[row][col]),row, col);
      return false;
    } else {
      gameBoardMatrix[row][col].changeNodeStatusHit();
      pubsub.publish('playerAttackFinished', JSON.stringify(gameBoardMatrix[row][col]),row, col);
      return gameBoardMatrix[row][col].getNodeValue().hit();
    }
  };
  const checkDamageStatusOfShips = () => {
    return shipsArray.every((ship) => ship.isDead());
  };
  

  createGameBoardMatrix(row, column);
  populateGameBoardMatrix(row, column);

  pubsub.subscribe('shipDraggedVertically', createShipAtCoordVertically);
  pubsub.subscribe('shipDraggedHorizontally', ) 

  return {
    createShipAtCoordVertically,
    receiveAttack,
    checkDamageStatusOfShips,
    receiveAttackComputer
  };
};
export { gameBoardFactory };
