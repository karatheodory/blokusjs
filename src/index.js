import 'fabric';
import GameRenderer from './view/render.js';
import Game from './model/game';

const mockFigure1 = [
  [0, 1, 0],
  [0, 1, 1],
  [0, 0, 1],
  [0, 0, 1]
];

const mockFigure2 = [
  [0, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
  [1, 1, 1]
];



// let canvas = render.initCanvas();
// render.drawFigure(mockFigure1, [0, 0], 'blue', canvas);
// render.drawFigure(mockFigure2, [80, 0], 'green', canvas);
// render.drawField(15, canvas);

const g = Game.createNew(4);
const renderer = new GameRenderer(g, 'field', 20);
renderer.renderGame();
window.game = g;
