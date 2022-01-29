const shipFactory = (length) => {
    let hitPoints = length;
    let isSunk = false;
    const hit = () => {
        hitPoints--;
        if (hitPoints <= 0){
            die();
        }
        //This returns true for testing purposes
        return true;
    }
    const die = () => isSunk = true;
    const isDead = () => isSunk;
    return {hit, isDead};
};

export {shipFactory};