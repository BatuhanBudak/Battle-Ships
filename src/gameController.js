import {gameBoardFactory} from './gameBoardFactory';
import {renderPlayerBoard} from './UIController';
import {createBoardCells} from './createDomElements';
import {Player} from './Player';
import {ComputerPlayer} from './ComputerPlayer';
import './style.css';

createBoardCells();
let gFactory = gameBoardFactory(5, 5);
gFactory.createShipAtCoordVertically(0, 0, 5);

let cFactory = gameBoardFactory(5, 5);
cFactory.createShipAtCoordVertically(0, 0, 5);

let computer = ComputerPlayer(cFactory);
let player = Player(gFactory, computer);

let computerBoard = cFactory.getBoardMatrix();

renderPlayerBoard(gFactory);

