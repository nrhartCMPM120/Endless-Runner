class GhostCharge extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        //this.points = pointValue;   // store pointValue
        this.moveSpeed = 3;        // pixels per frame
    }

    update() {
        // move left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // poistion reset
    reset() {
        this.x = game.config.width;
    }
}