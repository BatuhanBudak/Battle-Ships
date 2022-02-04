import {gameBoardFactory} from './gameBoardFactory';
import {createPlayerBoardCells} from './createDomElements';
import {Player} from './Player';
import {ComputerPlayer} from './ComputerPlayer';
import './style.css';
import { pubsub } from './pubSub';
import {render} from './UIController';


createPlayerBoardCells();
let playerBoard = gameBoardFactory('Player');
let player = Player(playerBoard);

const startGame = () => {
    
    let cmptrBoard = gameBoardFactory('Computer');
    let computer = ComputerPlayer(cmptrBoard);
    cmptrBoard.computerCreateShipAtCoordVertically(0, 0, 5,'carrier');
    cmptrBoard.computerCreateShipAtCoordVertically(0, 1, 4,'battleship');
    cmptrBoard.computerCreateShipAtCoordVertically(0, 2, 3,'destroyer');
    cmptrBoard.computerCreateShipAtCoordHorizontally(0, 3, 3,'submarine');
    cmptrBoard.computerCreateShipAtCoordHorizontally(0, 6, 2,'patrol-boat');
   
}

const endGame = (contestent) => {
    switch(contestent){
        case('Player'):{
            pubsub.publish("gameEnded", 'Computer');
            break;
        }
        case('Computer'):{
            pubsub.publish("gameEnded", 'Player');
            break;
        }
    }
}


pubsub.subscribe('allShipsPlaced', startGame);
pubsub.subscribe('allShipsSunked', endGame);







