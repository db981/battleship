function createBoards() {
  const playerBoard = document.querySelector('#playerBoard');
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      playerBoard.appendChild(cell);
    }
  }
  const aiBoard = document.querySelector('#aiBoard');
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      aiBoard.appendChild(cell);
    }
  }
}

window.addEventListener('load', (event) => {
  createBoards();
});
