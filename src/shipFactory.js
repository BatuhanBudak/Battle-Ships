import { pubsub } from "./pubSub";

const shipFactory = (length, name) => {
    let hitPoints = length;
    let id = name;
    let isSunk = false;
    const hit = () => {
        hitPoints--;
        if (hitPoints <= 0){
            die();
        }
        //This returns true for testing purposes
        return true;
    }
    const die = () => {
        isSunk = true;
        pubsub.publish('shipSinked', id);
        
    }
    const isDead = () => isSunk;
    return {hit, isDead};
};

export {shipFactory};