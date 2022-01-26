const gameBoardNodeFactory = () => {
    let nodeValue = {};
    const changeNodeValue = (ship) => {
        nodeValue = ship;
    }
    const isNodeEmpty = () => {
        if(this.value === {}){
            return true;
        }
        return false;
    }
    
    return {changeNodeValue, isNodeEmpty};
};
export {gameBoardNodeFactory};