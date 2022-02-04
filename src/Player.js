import { pubsub } from "./pubSub";

const Player = (board) => {
    let playerBoard = board;
    let canAttack = true;
    
    const receiveAttack = (coords) => {
       canAttack = true;
       pubsub.publish("attackFinished", 'Computer');
       return playerBoard.receiveAttack(+coords[0], +coords[1]);
    }
    const attack = (coords) => {
        if(canAttack){
            pubsub.publish('playerAttacks', coords);
        }
        canAttack = false;
    }
    pubsub.subscribe('playerClickedOnCmptrcell', attack );
    pubsub.subscribe('cmptrAttacks', receiveAttack );
   
}
export {Player};