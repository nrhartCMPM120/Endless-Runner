class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('ghost', './assets/spaceship.png');
        this.load.image('runner', './assets/rocket.png');
    }

    create(){
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize*3, game.config.width, borderUISize*3, 0xFFFFFF).setOrigin(0, 0);
        this.runner = new Runner(this, game.config.width/2 - 200, borderUISize*10, 'runner', 0).setOrigin(0, 0);
        this.ghost01 = new GhostCharge(this, game.config.width + borderUISize*6, borderUISize*10, 'ghost', 0).setOrigin(0, 0);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(){
        this.ghost01.update();
        this.runner.update();
    }
}