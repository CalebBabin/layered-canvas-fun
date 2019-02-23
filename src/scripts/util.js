
global.toDegrees = (radian) => {
    return radian * (180 / Math.PI);
}
global.toRadians = (angle) => {
    return angle * (Math.PI / 180);
}
global.get_angle = (arg1, arg2) => {
    return Math.atan2(arg2.y - arg1.y, arg2.x - arg1.x);
}
global.distance = (arg1, arg2) => {
    let a = arg1.x - arg2.x;
    let b = arg1.y - arg2.y;
    return Math.sqrt( a*a + b*b );
}

global.calcGravity = (object) => {
    /*
        object = {
            x: 5,
            y: 19,
            vx: 0.59232,
            vy: 0.73241,
            mass: 1.26
        }
    */
    const dir = get_angle(object,{x:0,y:0});
    const dist = distance(object,{x:0,y:0});
    const gravity = (object.mass) / dist*dist //(gravityconstant * mass1 * mass2) / distance*distance

    object.vy += Math.sin(dir)*gravity/10;
    object.vx += Math.cos(dir)*gravity/10;
}

global.offCanvas = document.createElement('canvas');
global.offContext = global.offCanvas.getContext('2d');