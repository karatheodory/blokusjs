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
    this._isGaveUp = false;
    this._name = name;
  }

  get figures() {
    return this._figures;
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
      throw new Error(`Figure ${figure} is not available for player ${this._playerNumber}`);
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

  canPutFigure() {
    throw new Error('Not implemented');
  }

  putFigure() {
    throw new Error('Not implemented');
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
