class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('ghost', './assets/spaceship.png');
    }

    create(){
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize*3, game.config.width, borderUISize*3, 0xFFFFFF).setOrigin(0, 0);
        
        this.ghost01 = new GhostCharge(this, game.config.width + borderUISize*6, borderUISize*10, 'ghost', 0).setOrigin(0, 0);
    }

    update(){
        this.ghost01.update();
    }
}