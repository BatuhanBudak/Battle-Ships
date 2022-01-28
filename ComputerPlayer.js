
const ComputerPlayer = (board) => {
    let computerBoard = board;
    let hasPlayed = false;
    let takenShotsCoordinatesArray = [];

    const changePlayStatus = () => hasPlayed = !hasPlayed;

    const randomIntFromInterval= (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    const generateRandomShootCoords = () => {
        let row = randomIntFromInterval(0, 4); // This numbers will be changed after giving the matrix fixed size for setup
        let col = randomIntFromInterval(0, 4); // This numbers will be changed after giving the matrix fixed size for setup
        return [row, col];
    }
     
    const receiveAttack = (row, col) => {
        return computerBoard.receiveAttack(row, col);
    }
    const attack = (enemy) => {
        if(!hasPlayed){
            changePlayStatus();
            let missedShotsArr = enemy.getBoardOfPlayer().getMissedShotCoordsArr();
            let [row, col] = generateRandomShootCoords();
            while(missedShotsArr.includes([row,col]) || takenShotsCoordinatesArray.includes([row, col])){
                [row,col] = generateRandomShootCoords();
            }
            takenShotsCoordinatesArray.push([row, col]);
            return enemy.receiveAttack(row, col);
        }
    }
    return {attack, receiveAttack};
}
export {ComputerPlayer};