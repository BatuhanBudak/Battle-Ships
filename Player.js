const Player = (board, computer) => {
    let playerBoard = board;
    let hasPlayed = false;
    let enemy = computer;

    const changePlayStatus = () => hasPlayed = !hasPlayed;

    const receiveAttack = (row, col) => {
       return playerBoard.receiveAttack(row, col);
    }
    
    const attack = (row, col) => {
        if(!hasPlayed){
            changePlayStatus();
            return enemy.receiveAttack(row, col);
        }
    }
    const getBoardOfPlayer = () => playerBoard;
    return {attack, receiveAttack, getBoardOfPlayer};
}
export {Player};