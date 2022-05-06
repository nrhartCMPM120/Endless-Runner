class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload(){
        this.load.audio('sfx_select', './assets/Playerdeathsfx.wav');
        this.load.image('title', './assets/TitleScreen.png');
    }

    create(){

        this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0, 0);

        this.hiscoreword = this.add.text(300, borderUISize + borderPadding - 16, 'High Score: ', { font: '28px Impact', fill: '#f73636'}).setOrigin(0.5);
        this.hiscore = this.add.text(410, borderUISize + borderPadding - 16, parseInt(game.highscore / 1000), { font: '28px Impact', fill: '#f73636'}).setOrigin(0.5);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
    }

}