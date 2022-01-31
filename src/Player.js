import { pubsub } from "./pubSub";

const Player = (board) => {
    let playerBoard = board;
    
    const receiveAttack = (coords) => {
       return playerBoard.receiveAttack(+coords[0], +coords[1]);
       
    }
    const attack = (coords) => {
        pubsub.publish('playerAttacks', coords);
    }
    pubsub.subscribe('playerClickedOnCmptrcell', attack );
    pubsub.subscribe('cmptrAttacks', receiveAttack );
   
}
export {Player};