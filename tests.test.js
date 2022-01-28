import { gameBoardFactory } from "./gameBoardFactory";
import { shipFactory } from "./shipFactory";
import { gameBoardNodeFactory } from "./gameBoardNodeFactory";
import {Player} from "./Player";
import {ComputerPlayer} from "./ComputerPlayer";

test("Can create ship on empty node", () => {
  let gFactory = gameBoardFactory(5, 5);
  expect(gFactory.createShipAtCoord(0, 0, 5)).toEqual(true);
});

test("Can check the coordinate that has been fired is empty correctly", () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  gFactory.receiveAttack(0, 1)
  expect(gFactory.getMissedShotCoordsArr()[0]).toHaveLength(2);
});
test("Can check the coordinate that has been fired is occupied correctly", () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  expect(gFactory.receiveAttack(4, 0)).toBe(true);
});
test("Can check the fired coordinate\'s status correctly", () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  gFactory.receiveAttack(4, 0);
  expect(gFactory.getBoardMatrix()[4][0].getNodeStatus()).toBe('hit');
});

test("Can check the unharmed coordinate\'s status correctly", () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  gFactory.receiveAttack(4, 0);
  expect(gFactory.getBoardMatrix()[3][0].getNodeStatus()).toBe('default');
});
test("Can check the missed coordinate\'s status correctly", () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  gFactory.receiveAttack(4, 1);
  expect(gFactory.getBoardMatrix()[4][1].getNodeStatus()).toBe('miss');
});

test("Can check the damage status of all ships on matrix", () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  gFactory.createShipAtCoord(0, 1, 4);
  gFactory.createShipAtCoord(0, 2, 3);
  gFactory.createShipAtCoord(0, 3, 2);
  expect(gFactory.checkDamageStatusOfShips()).toBe(false);
});
test("Can check whether an individual ship has sunked or not", () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  gFactory.receiveAttack(0, 0);
  gFactory.receiveAttack(1, 0);
  gFactory.receiveAttack(2, 0);
  gFactory.receiveAttack(3, 0);
  gFactory.receiveAttack(4, 0);
  expect(gFactory.checkDamageStatusOfShips()).toBe(true);
});
test('Player and computer can attack each other', () => {
    let gFactory = gameBoardFactory(5, 5);
    gFactory.createShipAtCoord(0, 0, 5);
    let cFactory = gameBoardFactory(5, 5);
    cFactory.createShipAtCoord(0, 0, 5);
    let computer = ComputerPlayer(cFactory);
    let player = Player(gFactory, computer);
    expect(player.attack(0,0)).toBe(true);    
    expect(computer.attack(player)).toBeDefined();    
});
test('Player can sunk computer\'s ship', () => {
  let gFactory = gameBoardFactory(5, 5);
  gFactory.createShipAtCoord(0, 0, 5);
  let cFactory = gameBoardFactory(5, 5);
  cFactory.createShipAtCoord(0, 0, 1);
  let computer = ComputerPlayer(cFactory);
  let player = Player(gFactory, computer);
  player.attack(0,0);
  expect(cFactory.checkDamageStatusOfShips()).toBe(true);    
});

