class VerticalJumpBehavior{
    constructor(velocity, duration){
        this.velocity = velocity;
        this.duration = duration;
        this.startTime = 0;
        this.enable = false;
        this.ydefault = 0;
    }

    execute(sprite) {
        if(Date.now()-this.startTime <= this.duration/2) { //up
            sprite.y -= this.velocity;
        } else {//down
            if(sprite.y < this.ydefault) sprite.y += this.velocity;
        }

        if(Date.now() - this.startTime > this.duration) {//stop
            this.enable = false;

            //set default posititon
            sprite.y = this.ydefault;
            sprite.painterIdx = 0;
            sprite.painters[0].reset();
        }
    }
}