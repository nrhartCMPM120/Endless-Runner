class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.audio('sfx_select', './assets/Playerdeathsfx.wav');
        this.load.image('Title', './assets/TitleScreen.png');
    }

    create(){

        this.add.tileSprite(0, 0, 640, 480, 'Title').setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ENDLESS RUNNER', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2, 'Press (W) to Play', menuConfig).setOrigin(0.5);
        this.hiscoreword = this.add.text(170, borderUISize + borderPadding - 16, 'High Score: ', { font: '28px Press Start 2P', fill: '#8742f5', strokeThickness: '4'}).setOrigin(0.5);
        this.hiscore = this.add.text(110, borderUISize + borderPadding - 16, game.highscore / 1000, { font: '28px Press Start 2P', fill: '#8742f5', strokeThickness: '4'}).setOrigin(0.5);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
    }

}