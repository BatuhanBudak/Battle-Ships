import {gameBoardFactory} from './gameBoardFactory';

const playerDomContainer = document.querySelector(".plyr-board-container");
const computerDomContainer = document.querySelector(
  ".cmptr-board-container"
);

export const renderPlayerBoard = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let cell = document.querySelector(`.plyr-cell[data-index=${i}${j}]`);
            let nodeStatus = arr[i][j].getNodeStatusFromBoard();
            if(arr[i][j].getNodeValueFromBoard()){
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