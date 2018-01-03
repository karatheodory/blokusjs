import 'fabric';

const wid = 20;

export function initCanvas() {
    return  new fabric.Canvas('field');
}

export function drawFigure(figure, coords, color, canvas) {
    const pieces = [];
    for (let i = 0; i < figure.length; i++) {
        const row = figure[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j]) {
                const rect = new fabric.Rect({
                    left: j*wid,
                    top: i*wid,
                    fill: color,
                    width: wid,
                    height: wid,
                    selectable: false
                });
                pieces.push(rect);
            }
        }
        
    }
    const group = new fabric.Group(pieces, {
        left: coords[0],
        top: coords[1],
        angle: 0
    });
    canvas.add(group);
}

export function drawField(size, canvas) {
    const fullSize = size * wid;
    const lines = [];
    for (let i = 0; i < size + 1; i++) {
        const hLine = new fabric.Line([wid * i, 0, wid * i, fullSize], {fill: 'black', stroke: 'black'});
        const vLine = new fabric.Line([0, wid * i, fullSize, wid * i], {fill: 'black', stroke: 'black'});
        lines.push(hLine);
        lines.push(vLine);
    }
    const group = new fabric.Group(lines, {
        left: 0,
        top: 0,
        selectable: false
    });
    canvas.add(group);
}

export class GameRenderer {
    constructor(game) {
        this._game = game;
    }

    renderPlayerBag(playerFigures) {

    }

    renderGrid() {

    }

    renderField() {
        
    }


}