const Ship = (length) => {
  let hits = 0;
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => hits >= length;
  return { hit, isSunk };
};

const Gameboard = () => {
  let ships = 0;
  const board = [];
  for (let x = 0; x < 10; x++) {
    board[x] = [];
    for (let y = 0; y < 10; y++) {
      board[x].push({ ship: null, attacked: false });
    }
  }
  const placeShip = (startX, endX, startY, endY, ship) => {
    for (let x = startX; x <= endX; x++) {
      console.log('test');
      for (let y = startY; y <= endY; y++) {
        console.log('test');
        board[x][y].ship = ship;
      }
    }
    ships += 1;
  };
  const receiveAttack = (x, y) => {
    if (board[x][y].attacked === false) {
      board[x][y].attacked = true;
      if (board[x][y].ship) {
        board[x][y].ship.hit();
        // reporthit to domcontroller
        if (board[x][y].ship.isSunk()) {
          ships -= 1;
          // reportsunk to domcontroller
        }
      } else {
        // reportmiss to domcontroller
      }
      return true; // valid attack (hit or miss)
    }
    return false; // invalid attack (space already attacked)
  };
  const areAllSunk = () => ships <= 0;
  return {
    board, ships, placeShip, receiveAttack, areAllSunk,
  };
};

const Player = () => {
  const makeMove = () => {
    console.log('test');
  };
  return { makeMove };
};

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
