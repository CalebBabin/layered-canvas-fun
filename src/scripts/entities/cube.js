const defaults = {
    size: 1,
    hue: 0,
    mass: 1,
    hueShift: 0.1
};

class Cube {
    constructor (x, y, vx, vy, options = {}) {
        this.type = 'Cube';
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.toggle = true;

        const nOptions = defaults;
        Object.assign(nOptions, options);
        
        this.size = nOptions.size;
        this.mass = nOptions.mass;
        this.hue = nOptions.hue;
        this.hueShift = nOptions.hueShift;
    }

    static tick (entity) {
        calcGravity(entity);
        entity.x += entity.vx;
        entity.y += entity.vy;
        entity.hue+=entity.hueShift;
    }
    static draw (entity, canvasContainer) {
        entity.toggle = !entity.toggle;
        if (entity.toggle) {
            const x = entity.x*cScale;
            const y = entity.y*cScale;
            canvasContainer.ctx.fillStyle = 'hsl('+entity.hue+', 100%, 50%)';
            canvasContainer.ctx.fillRect(x+cCenter.x, y+cCenter.y, entity.size*cScale, entity.size*cScale);
        }
    }
}



module.exports = Cube;