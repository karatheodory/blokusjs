import 'fabric';
import Game from './model/game';

const canvas = new fabric.Canvas('field');
const rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'black',
  width: 20,
  height: 20,
});
canvas.add(rect);
const g = Game.createNew(4);
window.game = g;
