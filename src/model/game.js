import {FIGURES, Figure} from './figures';

/**
 * @callback IndexMapper
 * @param {number} index
 * */

/**
 * @param {number} numOfItems
 * @param {IndexMapper} [itemMapper=null]
 * */
function createArray(numOfItems, itemMapper=null) {
  let arr = Array(numOfItems).fill(0);
  if (itemMapper) {
    arr = arr.map((_, index) => itemMapper(index));
  }
  return arr;
}

/**
 * @param {number} playerNumber
 * */
function createPlayerFigures(playerNumber) {
  return FIGURES.map(figure => {
    const figureStr = figure.figureStr.replace(/1/g, '' + playerNumber);
    return new Figure(figure.name, figureStr);
  });
}

export default class Game {
  /**
   * @param {number} numOfPlayers
   * @param {number} [fieldSize=20]
   * */
  constructor(numOfPlayers, fieldSize=20) {
    this.numOfPlayers = numOfPlayers;
    this.playerFigures = createArray(numOfPlayers, (index) => createPlayerFigures(index + 1));
    this.field = createArray(fieldSize, () => createArray(fieldSize));
  }
}
