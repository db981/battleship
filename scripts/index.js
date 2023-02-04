const Ship = (length) => {
  let hits = 0;
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => hits >= length;
  return { hit, isSunk };
};

const Gameboard = () => {
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
  };
  const receiveAttack = (x, y) => {
    if (board[x][y].attacked === false) {
      board[x][y].attacked = true;
      if (board[x][y].ship) {
        board[x][y].ship.hit();
        // reporthit
      } else {
        // reportmiss
      }
      return true; // valid attack (hit or miss)
    }
    return false; // invalid attack (space already attacked)
  };
  return { board, placeShip, receiveAttack };
};

const myBoard = Gameboard();
const myShip = Ship(5);
myBoard.placeShip(0, 0, 0, 4, myShip);
console.log(myBoard.board);
console.log(myBoard.receiveAttack(0, 4));
console.log(myBoard.board);

module.exports = { Ship, Gameboard };
