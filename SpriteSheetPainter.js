class SpriteSheetPainter {
    constructor(spriteSheet, pageFlipInterval, cells){
        this.spriteSheet = spriteSheet;
        this.pageFlipInterval = pageFlipInterval;
        this.cells = cells;
        this.currentCellIdx = 0;
        this.lastUpdateTime = 0;
        this.direction = 1;
    }

    reset() {
        this.currentCellIdx = 0;
        this.lastUpdateTime = 0;
    }

    update() {
        const timeInterval = Date.now() - this.lastUpdateTime;
        if(timeInterval >= this.pageFlipInterval) {
            this.currentCellIdx = 
                (this.currentCellIdx + 1)%this.cells.length;
            this.lastUpdateTime = Date.now();
        }
    }

    draw(sprite, ctx) {
        ctx.save();
        if(this.direction==-1){
            ctx.translate(sprite.x + sprite.w,0);
            ctx.scale(-1,1);
            ctx.drawImage(
                this.spriteSheet,
                this.cells[this.currentCellIdx].x,
                this.cells[this.currentCellIdx].y,
                this.cells[this.currentCellIdx].w,
                this.cells[this.currentCellIdx].h,
                0,
                sprite.y,
                sprite.w,
                sprite.h
                )
        } else {
            //console.log(`${sprite.x}-${sprite.y}-${sprite.w}-${sprite.h}`);
            //console.log(`${this.cells[this.currentCellIdx].x}-${this.cells[this.currentCellIdx].y}-${this.cells[this.currentCellIdx].w}-${this.cells[this.currentCellIdx].h}`)
            ctx.drawImage(
                this.spriteSheet, 
                this.cells[this.currentCellIdx].x,
                this.cells[this.currentCellIdx].y,
                this.cells[this.currentCellIdx].w,
                this.cells[this.currentCellIdx].h,
                sprite.x,
                sprite.y,
                sprite.w,
                sprite.h
                );
        }
        ctx.restore();
    }
}
