import {gameBoardFactory} from './gameBoardFactory';
import {renderPlayerBoard} from './UIController';
import {createDomElements} from './createDomElements';
import { gameBoardNodeFactory } from "./gameBoardNodeFactory";
import { shipFactory } from "./shipFactory";

createDomElements();
let gFactory = gameBoardFactory(5, 5);
gFactory.createShipAtCoordVertically(0, 0, 5);

let cFactory = gameBoardFactory(5, 5);
cFactory.createShipAtCoordVertically(0, 0, 5);

let computer = ComputerPlayer(cFactory);
let player = Player(gFactory, computer);

let playerBoard = gFactory.getBoardMatrix();
let computerBoard = cFactory.getBoardMatrix();

renderPlayerBoard(playerBoard);

