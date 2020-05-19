import { Renderer2D } from '@inwebo/render.js';

export default class RendererGrid extends Renderer2D {

    /**
     * @param {number} gridSizeX
     * @param {number} gridSizeY
     * @param {number} padding
     * @param {string} color
     */
    setGrid(gridSizeX = 40, gridSizeY = 40, padding = 0, color = "black") {
        this._gridSizeX = gridSizeX;
        this._gridSizeY = gridSizeY;
        this._padding = padding;
        this._color = color;

        return this;
    }

    _draw(...subject) {
        const c = this.getCtx();

        for (let x = 0; x <= c.canvas.width; x += this._gridSizeX) {
            c.moveTo(0.5 + x + this._padding, this._padding);
            c.lineTo(0.5 + x + this._padding, c.canvas.height + this._padding);
        }

        for (let x = 0; x <= c.canvas.height; x += this._gridSizeY) {
            c.moveTo(this._padding, 0.5 + x + this._padding);
            c.lineTo(c.canvas.width + this._padding, 0.5 + x + this._padding);
        }
        c.strokeStyle = this._color;
        c.stroke();

        return this;
    }
}