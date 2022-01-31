import {gameBoardFactory} from './gameBoardFactory';
import {renderPlayerBoard} from './UIController';
import {createBoardCells} from './createDomElements';
import {Player} from './Player';
import {ComputerPlayer} from './ComputerPlayer';
import './style.css';

createBoardCells();
let gFactory = gameBoardFactory(10, 10);
gFactory.createShipAtCoordVertically(0, 0, 5);

let cFactory = gameBoardFactory(10, 10);
cFactory.createShipAtCoordVertically(0, 0, 5);

let computer = ComputerPlayer(cFactory);
let player = Player(gFactory);




