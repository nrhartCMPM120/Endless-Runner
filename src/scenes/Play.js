class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //this.load.image('ghost', './assets/spaceship.png');
        //this.load.image('runner', './assets/runner.png');
        this.load.image('spike', './assets/zombie1.png');
        this.load.image('background', './assets/nightground.png');
        this.load.image('ghostb','./assets/ghost.png');
        this.load.image('ground','./assets/ground.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('talltrees', './assets/talltrees.png');

        //zombie
        this.load.spritesheet('zombie', './assets/tomb.png', {frameWidth: 48, frameHeight: 28});
        //runner
        this.load.spritesheet('runner', './assets/runnerspritesheet.png', {frameWidth: 32, frameHeight: 64});
        
    }

    create(){

        //added background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        this.ghostb = this.add.tileSprite(0, 0, 640, 480, 'ghostb').setOrigin(0, 0);

        this.talltrees = this.add.tileSprite(0, 0, 640, 480, 'talltrees').setOrigin(0, 0);

        this.clouds = this.add.tileSprite(0, 0, 640, 480, 'clouds').setOrigin(0, 0);

        // floor
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.ground = this.physics.add.staticImage(400, 495, 'ground').setScale(2).refreshBody();
        
        this.runner = this.physics.add.sprite(100, 300, 'runner');
        this.ghost01 = new GhostCharge(this, game.config.width + borderUISize*6, borderUISize*11, 'ghost', 0).setOrigin(0, 0);
        //added spike
        this.spike = this.physics.add.sprite(700, 368, 'spike');
        this.spike.body.setAllowGravity(false);

        // defined keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


        // this.anims.create({
        //     key: 'move',
        //     frames: [
        //         {key: 'zombie1'},
        //         {key: 'zombie2', duration: 50}
        //     ],
        //     frameRate: 4,
        //     repeat: -1
        // });
        // this.spike.anims.play('move');

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('zombie', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.spike.anims.play('move');

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('runner', {start: 0, end: 5, first: 0}),
            frameRate: 16,
            repeat: -1
        });
        //this.runner.anims.play('run');


        // score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.hp = 3;                                    //Total Lives of runner {default: 3}
        this.iframe = false;
        this.tim = 0;
        this.gameover = false;
        this.loop = false;
        this.timer = this.add.text(game.config.width/2, borderUISize + borderPadding - 16, this.tim / 1000, scoreConfig).setOrigin(0.5);
        this.spawnSpike = false;
        this.groundcollide = this.physics.add.collider(this.runner, this.ground);
        this.physics.add.overlap(this.runner, this.spike, this.hit, null, this);
        this.lives = this.add.text(70, borderUISize + borderPadding - 16, this.iframe, scoreConfig).setOrigin(0.5);
    }

    update(){

        //animation
        //this.spike.anims.play("move");


        if(this.gameover && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene");
        }

        //move background
        //this.background.tilePositionX += 4; 
        //this.ghostb.tilePositionX += 2;
        

        if (!this.gameover){
            this.lives.text = this.hp;
            this.talltrees.tilePositionX += 3;
            this.clouds.tilePositionX += 2;
            if (Phaser.Input.Keyboard.JustDown(keyW) && this.runner.body.touching.down) {
                this.runner.setVelocityY(-360);
                this.runner.anims.stop('run');
            }
            if (this.runner.body.position.y < 300) this.runner.anims.play('run');
            if (this.iframe == true) {
                this.iframetime += 10;
                if (this.runner.alpha == 0) this.runner.alpha = 100;
                else this.runner.alpha = 0;
                if (this.iframetime >= 1000) {                      //invincibility time {default: 1000} (1 second)
                    this.iframe = false;
                    this.runner.alpha = 100;
                }
            }
            this.tim += 10;
            this.timer.text = parseInt(this.tim / 1000);
            // wrap around from left edge to right edge
            if (this.spike.body.position.x < -50) {
                this.spike.setVelocityX(0);
                this.spike.setX(700);
            }
            if (this.spike.body.position.x > 640 && Phaser.Math.Between(1, 100000) <= 400){
                this.spike.setVelocityX(-400);
            }
        }
    }

    hit() {
        if (this.iframe == false) {
            this.hp -= 1;
            if (this.hp == 0) {
                this.lives.text = this.hp;
                this.gameover = true;
                this.runner.anims.stop('run');
                this.physics.world.removeCollider(this.groundcollide);
                this.runner.setVelocityY(-300);
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', { font: '28px Press Start 2P', fill: '#ff0044'}).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) for menu', { font: '28px Press Start 2P', fill: '#ff0044' }).setOrigin(0.5);
            }
            else {
                this.iframe = true;
                this.iframetime = 0;
            }
        }
    }
}