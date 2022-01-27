const Player = (board) => {
    let playerBoard = board;
    let doesPlayed = false;

    const changePlayStatus = () => doesPlayed = true;

    const receiveAttack = (row, col) => {
       return playerBoard.receiveAttack(row, col);
    }
    const attack = (row, col, enemy) => {
        changePlayStatus();
        return enemy.receiveAttack(row, col);
    }
    const getBoardOfPlayer = () => playerBoard;
    return {attack, receiveAttack, getBoardOfPlayer};
}
export {Player};