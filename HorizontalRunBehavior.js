class HorizontalRunBehavior{
    constructor(velocity, max, min, direction){
        this.velocity = velocity;
        this.max = max;
        this.min = min;
        this.direction = direction;
        this.enable = false;
    }

    execute(sprite) {
        if((this.direction==1 && (sprite.x+sprite.w)< this.max) || 
            (this.direction==-1 && sprite.x> this.min))
            sprite.x += this.direction*this.velocity;
    }
}
