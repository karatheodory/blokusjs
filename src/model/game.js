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
  const playerColor = playerNumber + 1;
  return FIGURES.map(figure => {
    const figureStr = figure.figureStr.replace(/1/g, '' + playerColor);
    return new Figure(figure.name, figureStr);
  });
}

class Player {
  constructor(name, figures) {
    this._figures = figures;
    this._name = name;
    this._isGaveUp = false;
    this._isFirstTurn = true;
  }

  get figures() {
    return this._figures;
  }

  get isFirstTurn() {
    return this._isFirstTurn;
  }

  set isFirstTurn(value) {
    if (this._isFirstTurn && !value) {
      this._isFirstTurn = value;
    } else {
      throw new Error('Unexpected first turn set.');
    }
  }

  get isGaveUp() {
    return this._isGaveUp;
  }

  set isGaveUp(value) {
    if (!value) {
      return;
    }

    if (!this._isGaveUp) {
      this._isGaveUp = true;
    } else {
      throw new Error('Inactive player tries to give up.')
    }
  }

  markFigureUsed(figure) {
    const idx = this._figures.indexOf(figure);
    if (idx !== -1) {
      this._figures.splice(idx, 1);
    } else {
      throw new Error(`Figure ${figure} is not available for player ${this._name}`);
    }
  }

  toString() {
    return `Player ${this._name}`;
  }
}

class Field {
  constructor(fieldSize) {
    this._fieldSize = fieldSize;
    this._field = createArray(fieldSize, () => createArray(fieldSize));
  }

  get fieldArray() {
    return this._field;
  }

  get fieldSize() {
    return this._fieldSize;
  }

  hasCornerOfSameColor(x, y, color) {
    return (this._field[x - 1][y - 1] === color)
      || (this._field[x - 1][y + 1] === color)
      || (this._field[x + 1][y - 1] === color)
      || (this._field[x + 1][y + 1] === color)
  }

  hasBorderOfSameColor(x, y, color) {
    return (this._field[x - 1][y] === color)
      || (this._field[x + 1][y] === color)
      || (this._field[x][y - 1] === color)
      || (this._field[x][y + 1] === color)
  }

  isEmpty(x, y) {
    return this._field[x][y] === 0;
  }

  /**
   * Find the points on the field where the figure wants to be placed.
   * */
  _getMappedPoints(x, y, figure) {
    return figure.figureArr.map((row, rowIndex) => row.map((color, colIndex) => ({
      x: x + rowIndex,
      y: y + colIndex,
      color
    })))
      .reduce((res, row) => res.concat(row), [])
      .filter(item => item.color);
  }

  canPutFigure(x, y, figure) {
    const mappedFigurePoints = this._getMappedPoints(x, y, figure);
    const pointParams = mappedFigurePoints.map((point) => (Object.assign({}, point, {
      hasCornerOfSameColor: this.hasCornerOfSameColor(point.x, point.y, point.color),
      hasBorderOfSameColor: this.hasBorderOfSameColor(point.x, point.y, point.color),
      isEmpty: this.isEmpty(point.x, point.y)
    })));

    return !!pointParams.filter(p => p.hasCornerOfSameColor)
      && !pointParams.filter(p => p.hasBorderOfSameColor)
      && !pointParams.filter(p => !p.isEmpty);
  }

  putFigure(x, y, figure) {
    if (!this.canPutFigure(x, y, figure)) {
      throw new Error(`Cannot put ${figure} into (${x}, ${y}).`);
    }
    const mappedFigurePoints = this._getMappedPoints(x, y, figure);
    mappedFigurePoints.forEach(({x, y, color}) => {
      this._field[x][y] = color;
    });
  }
}

export default class Game {
  /**
   * @param {Field} field
   * @param {Array<Player>} players
   * */
  constructor(field, players) {
    this._numOfPlayers = players.length;
    this._players = players;
    this._field = field;
    /**
     * @type Player
     * */
    this._activePlayer = players[0];
  }

  get fieldSize() {
    return this._field.fieldSize;
  }

  get fieldArray() {
    return this._field.fieldArray;
  }

  _activateNextPlayer() {
    const activePlayer = this._activePlayer;
    const activePlayers = this._players.filter(player => player.isActive || player === activePlayer);
    const currentPlayerIndex = activePlayers.indexOf(activePlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % activePlayers.length;
    const nextActivePlayer = activePlayers[nextPlayerIndex];
    console.log(`Changing active player from ${activePlayer} to ${nextActivePlayer}`);
    this._activePlayer = nextActivePlayer;
  }

  canPutFigure(x, y, figure) {
    return this._field.canPutFigure(x, y, figure);
  }

  putFigure(x, y, figure) {
    console.log(`Putting ${figure} to (${x}, ${y})`);
    this._field.putFigure(x, y, figure);
    this._activePlayer.markFigureUsed(figure);
    this._activateNextPlayer();
  }

  get activePlayer() {
    return this._activePlayer;
  }

  giveUpActivePlayer() {
    this._activePlayer.isGaveUp = true;
  }

  get activePlayerFigures() {
    return this._activePlayer.figures;
  }

  get playersFigures() {
    return this._players.reduce((res, player) => res.append(player.figures), [])
  }

  get isGameEnded() {
    return this._players.filter(player => !player.isGaveUp)
      .length === 0;
  }

  /**
   * @param {number} numOfPlayers
   * @param {number} [fieldSize=20]
   * */
  static createNew(numOfPlayers, fieldSize=20) {
    const field = new Field(fieldSize);
    const players = createArray(numOfPlayers, (index) => {
      const playerFigures = createPlayerFigures(index);
      return new Player(index, playerFigures, false);
    });
    return new Game(field, players);
  }
}
