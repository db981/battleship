const { Ship, Gameboard } = require('./index');

test('create Ship object of length 5 expect not to be sunk', () => {
  expect(Ship(5).isSunk()).toBe(false);
});

test('create Ship object of length 0 expect to be sunk', () => {
  expect(Ship(0).isSunk()).toBe(true);
});

test('make testShip of length 1, expect isSunk to be false, call testShip.hit(), expect isSunk to be true', () => {
  const testShip = Ship(1);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
