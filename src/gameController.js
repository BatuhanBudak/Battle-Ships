import {gameBoardFactory} from './gameBoardFactory';
import {createPlayerBoardCells} from './createDomElements';
import {Player} from './Player';
import {ComputerPlayer} from './ComputerPlayer';
import './style.css';
import { pubsub } from './pubSub';
import {render} from './UIController'


createPlayerBoardCells();
let gFactory = gameBoardFactory('player');
let player = Player(gFactory);

const startGame = () => {
    
    let cFactory = gameBoardFactory('computer');
    let computer = ComputerPlayer(cFactory);
    cFactory.computerCreateShipAtCoordVertically(0,0, 5,'carrier');
      
}

const endGame = (contestent) => {
    switch(contestent){
        case('player'):{
            pubsub.publish("gameEnded", 'computer');
        }
        case('computer'):{
            pubsub.publish("gameEnded", 'player');
        }
    }
}

pubsub.subscribe('allShipsPlaced', startGame);
pubsub.subscribe('allShipsSunked', endGame);





