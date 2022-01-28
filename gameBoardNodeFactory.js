const gameBoardNodeFactory = () => {
  let nodeValue = null;
  let nodeStatus = "default";

  const changeNodeValueToShip = (ship) => {
    nodeValue = ship;
  };
  const changeNodeStatusToMiss = () => {
    nodeStatus = "miss";
  };
  const changeNodeStatusHit = () => {
    nodeStatus = "hit";
  };

  const isNodeEmpty = () => {
    if (nodeValue === null) {
      return true;
    }
    return false;
  };
  const getNodeValue = () => nodeValue;
  const getNodeStatus = () => nodeStatus;

  return {
    changeNodeValueToShip,
    isNodeEmpty,
    getNodeValue,
    changeNodeStatusToMiss,
    getNodeStatus,
    changeNodeStatusHit,
  };
};
export { gameBoardNodeFactory };
