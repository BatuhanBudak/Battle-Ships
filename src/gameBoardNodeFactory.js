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
  const toJSON = function toJSON() {
    return {
      nodeValue,
      nodeStatus
    };
  };

  return {
    changeNodeValueToShip,
    isNodeEmpty,
    getNodeValue,
    changeNodeStatusToMiss,
    getNodeStatus,
    changeNodeStatusHit,
    toJSON
  };
};
export { gameBoardNodeFactory };
