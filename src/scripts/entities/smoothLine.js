const defaults = {
    size: 1,
    hue: 0,
    mass: 1,
    hueShift: 0.1,
    fadeout: false,
};

class SmoothLine {
    constructor (x, y, vx, vy, options = {}) {
        this.type = 'SmoothLine';
        this.x = x;
        this.y = y;
        this.lastX = this.x;
        this.lastY = this.y;
        this.vx = vx;
        this.vy = vy;

        const nOptions = defaults;
        Object.assign(nOptions, options);

        this.size = nOptions.size;
        this.mass = nOptions.mass;
        this.hue = nOptions.hue;
        this.hueShift = nOptions.hueShift;
        this.fadeout = nOptions.fadeout;
    }

    static tick (entity) {
        calcGravity(entity);
        entity.lastX = entity.x;
        entity.lastY = entity.y;
        entity.x += entity.vx;
        entity.y += entity.vy;
        entity.hue+=entity.hueShift;
    }
    static draw (entity, canvasContainer) {
        const x = entity.x*cScale;
        const y = entity.y*cScale;
        const lastX = entity.lastX*cScale;
        const lastY = entity.lastY*cScale;

        if (entity.fadeout && entity.fadeout > 0) {
            offCanvas.width = canvasContainer.canvas.width;
            offCanvas.height = canvasContainer.canvas.height;
            offContext.drawImage(canvasContainer.canvas,0,0);
            canvasContainer.ctx.clearRect(0,0,canvasContainer.canvas.width,canvasContainer.canvas.height);
            canvasContainer.ctx.globalAlpha = entity.fadeout;
            canvasContainer.ctx.drawImage(offCanvas,0,0);
        }

        canvasContainer.ctx.strokeStyle = 'hsl('+entity.hue+', 100%, 50%)';

        canvasContainer.ctx.lineCap = "round";

        canvasContainer.ctx.lineWidth = Math.ceil(entity.size*cScale);
        canvasContainer.ctx.beginPath();
        canvasContainer.ctx.moveTo(lastX+cCenter.x,lastY+cCenter.y);
        canvasContainer.ctx.lineTo(x+cCenter.x,y+cCenter.y);
        canvasContainer.ctx.stroke();
    }
}



module.exports = SmoothLine;