const Player = (board, computer) => {
    let playerBoard = board;
    let enemy = computer;

    const receiveAttack = (row, col) => {
       return playerBoard.receiveAttack(row, col);
    }

    const attack = (row, col) => {
        return enemy.receiveAttack(row, col);
        
    }
    const getBoardOfPlayer = () => playerBoard;
    return {attack, receiveAttack, getBoardOfPlayer};
}
export {Player};