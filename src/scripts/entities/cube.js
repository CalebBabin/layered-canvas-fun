const defaults = {
    size: 1,
    color: '#fff',
    mass: 1,
};

class Cube {
    constructor (x, y, vx, vy, options = {}) {
        this.type = 'Cube';
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        const nOptions = applyDefaults(options, defaults);
        this.size = nOptions.size;
        this.mass = nOptions.mass;
        this.color = nOptions.color;
    }

    static tick (entity) {
        calcGravity(entity);
        entity.x += entity.vx;
        entity.y += entity.vy;
    }
    static draw (entity, canvasContainer) {
        const x = entity.x*cScale;
        const y = entity.y*cScale;
        canvasContainer.ctx.fillStyle = entity.color;
        canvasContainer.ctx.fillRect(x+cCenter.x, y+cCenter.y, entity.size*cScale, entity.size*cScale);
    }
}



module.exports = Cube;