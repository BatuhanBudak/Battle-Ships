import { pubsub } from "./pubSub";
const width = 10;
  const playerDomContainer = document.querySelector(".plyr-board-container");
  const computerDomContainer = document.querySelector(
    ".cmptr-board-container"
  );
  const rotateButton = document.querySelector('#rotate-button');

  rotateButton.addEventListener('click', rotateShips);
  let ships = document.querySelectorAll('.ship');

  function rotateShips(){
    ships.forEach(ship => {
      ship.classList.toggle('v');
      ship.classList.toggle('h');
    })
  }

  ships.forEach(ship => ship.addEventListener('dragstart', ship_dragstart_handler));

  function ship_dragstart_handler(e){
    e.dataTransfer.setData("text/plain", `${e.target.classList},${e.target.dataset.length},${e.target.id}`);
    e.dataTransfer.effectAllowed = "move";
    console.log(e.target);
  }






  computerDomContainer.addEventListener('click', (e) => {
    pubsub.publish('playerClickedOnCmptrcell', e.target.dataset.index);
  })
  
const createBoardCells = () => {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
          let cell = document.createElement('div');
          cell.dataset.index = `${i}${j}`;
          cell.classList.add('plyr-cell');
          cell.addEventListener('dragover', player_dragover_handler);
          cell.addEventListener('dragenter', e => {
            e.preventDefault()});
          cell.addEventListener('drop', player_drop_handler);

          playerDomContainer.appendChild(cell);
  
          let cell2 = document.createElement('div');
          cell2.dataset.index = `${i}${j}`;
          cell2.classList.add('cmptr-cell');
          computerDomContainer.appendChild(cell2);
      }
    }
  };
  
  function player_dragover_handler(e){
    console.log(e.target.dataset.index);
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
  };
  function player_drop_handler(e){
    console.log(e.target.dataset.index);
    const data = e.dataTransfer.getData("text/plain");
    if(data===null)return;
    let dataArr = data.split(',');
    if(dataArr[0].includes('v')){
      pubsub.publish('shipDraggedVertically', [e.target.dataset.index, dataArr[1],dataArr[2]]);
      
    }else if(dataArr[0].includes('h')){
      pubsub.publish('shipDraggedVertically', [e.target.dataset.index, dataArr[1],dataArr[2]]);
    }
    
  };

export {createBoardCells};
