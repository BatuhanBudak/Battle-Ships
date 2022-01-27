const gameBoardNodeFactory = () => {
    let nodeValue = null;

    const changeNodeValueToShip = (ship) => {
        nodeValue = ship;
    }
    const changeNodeValueToMiss = () => {
        nodeValue = 'miss';
    }
   
    const isNodeEmpty = () => {
        if(nodeValue === null){
            return true;
        }
        return false;
    }
    const getNodeValue = () => nodeValue;
    
    return {changeNodeValueToShip, isNodeEmpty, getNodeValue, changeNodeValueToMiss};
};
export {gameBoardNodeFactory};