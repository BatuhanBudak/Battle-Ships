import { pubsub } from "./pubSub";
const width = 10;
  const playerDomContainer = document.querySelector(".plyr-board-container");
  const computerDomContainer = document.querySelector(
    ".cmptr-board-container"
  );
  computerDomContainer.addEventListener('click', (e) => {
    pubsub.publish('playerClickedOnCmptrcell', e.target.dataset.index);
  })
  
const createBoardCells = () => {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
          let cell = document.createElement('div');
          cell.dataset.index = `${i}${j}`;
          cell.classList.add('plyr-cell');
          playerDomContainer.appendChild(cell);
  
          let cell2 = document.createElement('div');
          cell2.dataset.index = `${i}${j}`;
          cell2.classList.add('cmptr-cell');
          computerDomContainer.appendChild(cell2);
      }
    }
  };
    



export {createBoardCells};
