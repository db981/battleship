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

const Player = (isAi) => {
  const makeMove = () => {

  };
  return { isAi };
};

const myBoard = Gameboard();
const myShip = Ship(5);
myBoard.placeShip(0, 0, 0, 4, myShip);
console.log(myBoard.board);
myBoard.receiveAttack(0, 0);
myBoard.receiveAttack(0, 1);
myBoard.receiveAttack(0, 2);
myBoard.receiveAttack(0, 3);
console.log(myBoard.areAllSunk());
myBoard.receiveAttack(0, 4);
console.log(myBoard.areAllSunk());

// module.exports = { Ship, Gameboard };
