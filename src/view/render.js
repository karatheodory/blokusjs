import 'fabric';

// const wid = 20;
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

export class FigurePic {
    /**
     * 
     * @param {Figure} figure 
     * @param {fabric.Group} group 
     */
    constructor(figure, group) {
        this.figure = figure;
        this.group = group;
    }
}

export default class GameRenderer {
    /**
     * @param {Game} game 
     * @param {string} canvasId
     */
    constructor(game, canvasId, cellSize) {
        this.bagSize = 18;
        this._game = game;
        this.playerBag = [];
        this.canvas = new fabric.Canvas(canvasId);
        this._cellSize = cellSize;
        const that = this;
        this.canvas.observe('object:moving', function() {
            const activeObject = this.getActiveObject();
            that.checkIfCanPut(activeObject);
            
        })
    }

    checkIfCanPut(activeObject) {
        const x = Math.floor(activeObject.left/this._cellSize - this.bagSize);
        const y = Math.floor(activeObject.top/this._cellSize)
        console.log(x, y);
        const figure = this.playerBag.find(item => item.group === activeObject).figure;
        console.log(this._game.canPutFigure(x, y, figure));
    }

    renderGame() {
        this.renderGrid(this._game.fieldSize);
        this.renderField();
        this.playerBag = this.renderPlayerBag(this._game.players[0]);
        
    }

    /**
     * @param {Player} player 
     */
    renderPlayerBag(player) {
        const gap = Math.floor(this._cellSize/2);
        const bag = [];
        let y = gap;
        for (let i = 0; i < player.figures.length; i++) {
            const figureHeight = player.figures[i].figureArr.length;
            const figurepic = this.buildFigure(player.figures[i], this._cellSize * (i>9 ? 9 : 1), y);
            const figure = figurepic.group;
            this.canvas.add(figure);
            bag.push(figurepic);
            y += figureHeight * this._cellSize + gap;
            if (i === 9) { y = gap }
        }
        return bag;
    }


    /**
     * 
     * @param {Figure} figure
     * @param {number} x 
     * @param {number} y 
     */
    buildFigure(figure, x, y) {
        const pieces = [];
        const figureArray = figure.figureArr;
        for (let i = 0; i < figureArray.length; i++) {
            let row = figureArray[i];
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
        return new FigurePic(figure, new fabric.Group(pieces, {selectable: true, top: y, left: x}));
    }


    /**
     * 
     * @param {number} n 
     */
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
            left: 18 * this._cellSize,
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