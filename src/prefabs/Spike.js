// Spike prefab
class Spike extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        //scene.physics.add.existing(this);   // add to existing scene
        this.moveSpeed = 4;         // pixels per frame
        this.spawnSpike = false;
    }
    update() {
        // move spike
        if(this.spawnSpike){
            this.x -= this.moveSpeed;
        }
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            //this.reset();
            this.spawnSpike = false;
        }
    }
    // position reset
    reset() {
        if(!this.spawnSpike){
            this.x = game.config.width;
            this.spawnSpike = true;
        }
    }
}