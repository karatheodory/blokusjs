import 'fabric';

const canvas = new fabric.Canvas('field');
const rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'black',
  width: 20,
  height: 20,
  selectable: false
});
canvas.add(rect);
