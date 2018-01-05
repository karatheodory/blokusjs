import 'fabric';

const wid = 20;
const colors = ['red', 'green', 'blue', 'black']

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

export default class GameRenderer {
    /**
     * @param {Game} game 
     * @param {string} canvasId
     */
    constructor(game, canvasId, cellSize) {
        this._game = game;
        this.canvas = new fabric.Canvas(canvasId);
        this._cellSize = cellSize;
    }


    renderGame() {
        this.renderGrid(this._game.fieldSize);
        this.renderField();
    }

    /**
     * @param {Player} player 
     */
    renderPlayerBag(player, id) {
        const left = id * 1; // unfinished
        for (let i = 0; i < player.figures.length; i++) {
             
        }
    }

    renderGrid(n) {
        const fullSize = n * this._cellSize;
        const lines = [];
        for (let i = 0; i < n + 1; i++) {
            const hLine = new fabric.Line([this._cellSize * i, 0, this._cellSize * i, fullSize], {fill: 'black', stroke: 'black'});
            const vLine = new fabric.Line([0, this._cellSize * i, fullSize, this._cellSize * i], {fill: 'black', stroke: 'black'});
            lines.push(hLine);
            lines.push(vLine);
        }
        const group = new fabric.Group(lines, {
            left: 200,
            top: 0,
            selectable: false
        });
        this.canvas.add(group);
    }

    renderField() {
        const pieces = [];
        for (let i = 0; i < this._game.fieldSize; i++) {
            const row = this._game.fieldArray[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j]) {
                    const rect = new fabric.Rect({
                        left: j*this._cellSize + 2,
                        top: i*this._cellSize + 2,
                        fill: colors[row[j] - 1],
                        width: this._cellSize - 1,
                        height: this._cellSize - 1,
                        selectable: false
                    });
                    pieces.push(rect);
                }
            }
        }
        const group = new fabric.Group(pieces, {selectable: false, top: 0, left: 200});
        this.canvas.add(group);
    }


}