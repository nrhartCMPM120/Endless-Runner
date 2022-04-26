// Runner prefab
class Runner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isJumping = false;
        this.isFalling = false;
        this.moveSpeed = 3;
    }

    update() {
        // jump button
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.setVelocityY(-360);
        }
        // if jumping, move up and down
        /*if (this.isJumping && this.y > borderUISize*10 - 100) {
            this.y -= this.moveSpeed;
        }
        if (this.y <= borderUISize*10 - 100) {
            this.isFalling = true;
        }
        if (this.y != borderUISize*10 && this.isFalling) {
            this.y += this.moveSpeed;
            this.isJumping = false;
        }
        if (this.y == borderUISize*10) {
            this.isFalling = false;
        }*/
    }

    // reset rocket to "ground"
    reset() {
        this.isJumping = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}