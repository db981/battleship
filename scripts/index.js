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
      for (let y = startY; y <= endY; y++) {
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
        displayAttack(x, y, true);
        if (board[x][y].ship.isSunk()) {
          ships -= 1;
          // reportsunk to domcontroller
        }
      } else {
        displayAttack(x, y, false);
      }
      return true; // valid attack (hit or miss)
    }
    return false; // invalid attack (space already attacked)
  };
  const areAllSunk = () => ships <= 0;
  return {
    board, placeShip, receiveAttack, areAllSunk,
  };
};

const Player = () => {
  const makeMove = (e) => {
    if (playerTurn) {
      if (aiGameboard.receiveAttack(e.target.dataset.x, e.target.dataset.y)) {
        playerTurn = false;
        ai.makeMove();
      }
    }
  };
  return { makeMove };
};

const AI = () => {
  const makeMove = () => {
    const validCoords = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (playerGameboard.board[x][y].attacked === false) {
          validCoords.push([x, y]);
        }
      }
    }
    const randomCoords = validCoords[Math.floor(Math.random() * validCoords.length)];
    playerGameboard.receiveAttack(randomCoords[0], randomCoords[1]);
    playerTurn = true;
  };
  return { makeMove };
};

function createBoards(player) {
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
      cell.addEventListener('click', player.makeMove);
      aiBoard.appendChild(cell);
    }
  }
}

function displayPlayerShips(playerGameboard) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (playerGameboard.board[x][y].ship != null) {
        const shipCell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
        shipCell.style.backgroundColor = 'navy';
      }
    }
  }
}

function displayAttack(x, y, isHit) {
  const board = playerTurn ? document.querySelector('#aiBoard') : document.querySelector('#playerBoard');
  const cell = board.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
  cell.style.backgroundColor = isHit ? 'red' : 'gray';
}

let playerGameboard;
let aiGameboard;
let player;
let ai;
let playerTurn;

function createGame() {
  playerGameboard = Gameboard();
  aiGameboard = Gameboard();
  player = Player();
  makeShips();
  createBoards(player);
  displayPlayerShips(playerGameboard);

  ai = AI();
  playerTurn = true;
}

function makeShips() {
  const pShip1 = Ship(5);
  const pShip2 = Ship(4);
  const pShip3 = Ship(3);
  const pShip4 = Ship(5);
  const pShip5 = Ship(4);
  const pShip6 = Ship(2);
  const pShip7 = Ship(2);
  playerGameboard.placeShip(0, 4, 0, 0, pShip1);
  playerGameboard.placeShip(6, 9, 5, 5, pShip2);
  playerGameboard.placeShip(3, 3, 2, 4, pShip3);
  playerGameboard.placeShip(5, 5, 5, 9, pShip4);
  playerGameboard.placeShip(5, 8, 3, 3, pShip5);
  playerGameboard.placeShip(0, 0, 8, 9, pShip6);
  playerGameboard.placeShip(2, 2, 6, 7, pShip7);

  const aiShip1 = Ship(5);
  const aiShip2 = Ship(4);
  const aiShip3 = Ship(3);
  const aiShip4 = Ship(5);
  const aiShip5 = Ship(4);
  const aiShip6 = Ship(2);
  const aiShip7 = Ship(2);
  aiGameboard.placeShip(0, 4, 0, 0, aiShip1);
  aiGameboard.placeShip(6, 9, 5, 5, aiShip2);
  aiGameboard.placeShip(3, 3, 2, 4, aiShip3);
  aiGameboard.placeShip(5, 5, 5, 9, aiShip4);
  aiGameboard.placeShip(5, 8, 3, 3, aiShip5);
  aiGameboard.placeShip(0, 0, 8, 9, aiShip6);
  aiGameboard.placeShip(2, 2, 6, 7, aiShip7);
}

createGame();
