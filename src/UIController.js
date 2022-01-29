import {gameBoardFactory} from './gameBoardFactory';


export const renderPlayerBoard = (factory) => {
    let board = factory.getBoardMatrix();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let cell = document.querySelector(`.plyr-cell[data-index="${i}${j}"]`);
            
            let nodeStatus = factory.getNodeStatusFromBoard(i,j);
            if(factory.getNodeValueFromBoard(i,j)){
                switch(nodeStatus){
                    case('default'):{
                        cell.style.backgroundColor = 'green';
                        break;
                    }
                    case('hit'):{
                        cell.style.backgroundColor = 'red';
                        break;
                    }
                }
            }else{
               if(nodeStatus==='miss'){
                cell.style.backgroundColor = 'yellow';
               }
            }
        }
        
    }
}