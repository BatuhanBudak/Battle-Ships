
  const playerDomContainer = document.querySelector(".plyr-board-container");
  const computerDomContainer = document.querySelector(
    ".cmptr-board-container"
  );
  
const createBoardCells = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
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
    

  //  playerDomContainer.addEventListener('click')

export {createBoardCells};
