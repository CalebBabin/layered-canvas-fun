require('../styles/_main.scss');

require('./util.js');

const entities = {
    Cube: require('./entities/cube.js'),
    SmoothLine: require('./entities/smoothLine.js'),
}

const canvasArr = [];

const setCanvasLayer = (index, layer) => {
    canvasArr[index].canvas.style.zIndex = layer*100;
}

const createCanvas = (layer = -1)=>{
    if (layer < 0) {
        layer = canvasArr.length;
    }
    const index = canvasArr.length;
    const newC = {
        canvas: document.createElement('canvas'),
        layer: layer,
        entity: false,
    };
    newC.canvas.width = window.innerWidth;
    newC.canvas.height = window.innerHeight;
    newC.ctx = newC.canvas.getContext('2d');
    canvasArr.push(newC);
    setCanvasLayer(index, layer);
    document.body.appendChild(newC.canvas);
    return index;
}

const createGeneric = () => {
    const index = createCanvas();
    canvasArr[index].entity = new entities.SmoothLine(
        Math.random()*100-50,
        Math.random()*100-50,
        Math.random()*2-.5,
        Math.random()*2-.5,
        {
            hue: Math.floor(Math.random()*360),
            mass: Math.random(),
            size: Math.random(),
            hueShift: Math.random()/10,
            fadeout: 0.94,
        }
    );
}

const paint = () => {
        
    for (let index = 0; index < canvasArr.length; index++) {
        const element = canvasArr[index];
        
        entities[element.entity.type].tick(element.entity);
        entities[element.entity.type].draw(element.entity, element);
    }

    window.requestAnimationFrame(paint);
}

window.addEventListener('DOMContentLoaded', ()=>{
    createGeneric();
    createGeneric();
    createGeneric();
    createGeneric();
    paint();
});

const resize = ()=>{
    global.cScale = Math.min(window.innerWidth, window.innerHeight)/100;
    global.cCenter = {x: window.innerWidth/2, y: window.innerHeight/2};

    for (let index = 0; index < canvasArr.length; index++) {
        const element = canvasArr[index];
        element.canvas.width = window.innerWidth;
        element.canvas.height = window.innerHeight;
    }
}
window.addEventListener('resize', resize);
resize();