class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.audio('sfx_select', './assets/SFX1.wav');
    }

    create(){
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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ENDLESS RUNNER', menuConfig).setOrigin(0.5);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
    }

}