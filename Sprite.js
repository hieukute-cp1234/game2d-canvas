class Sprite {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.painterIdx = 0; //1 jump
        this.painters = [];
        this.behaviors = [];        
    }

    draw(ctx) {
        this.painters[this.painterIdx].draw(this, ctx);
    }

    update() {
       this.behaviors.forEach((behavior)=> {
            if(behavior.enable) behavior.execute(this);
        })
    }
}
