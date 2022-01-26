const shipFactory = (length) => {
    let hitPoints = length;
    let isSunk = false;
    const hit = () => {
        if (hitPoints <= 0){
            die();
        }
        hitPoints--;
    }
    const die = () => isSunk = true;
    return {hit};
};

export {shipFactory};