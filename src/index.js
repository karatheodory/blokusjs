import 'fabric';
import * as render from './view/render.js';

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



let canvas = render.initCanvas();
render.drawFigure(mockFigure1, [0, 0], 'blue', canvas);
render.drawFigure(mockFigure2, [80, 0], 'green', canvas);
render.drawField(15, canvas);
