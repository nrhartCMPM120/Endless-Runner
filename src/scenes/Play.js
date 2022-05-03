class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('background', './assets/nightground.png');
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('ghostb','./assets/ghost.png');
        this.load.image('ground','./assets/ground.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.audio('jump', './assets/jumpsfx.wav');
        this.load.image('talltrees', './assets/talltrees.png');
        //this.load.image('ghostcharge', './assets/ghostenemy.png');
        this.load.image('ghostshoot', './assets/ghostenemy.png');
        this.load.audio('hit', './assets/playerdamagesfx.wav');
        this.load.audio('death', './assets/Playerdeathsfx.wav');
        this.load.audio('kill', './assets/EnemyDeathsfx.wav');
        this.load.audio('fire', './assets/shootingsfx.wav');

        //tomb
        this.load.spritesheet('tomb', './assets/tomb.png', {frameWidth: 48, frameHeight: 28});
        //runner
        this.load.spritesheet('runner', './assets/runnerspritesheet.png', {frameWidth: 32, frameHeight: 64});

        this.load.spritesheet('ghostcharge', './assets/ghostsprite.png', {frameWidth: 64, frameHeight: 32});
        
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
        this.groundScroll = this.add.tileSprite(0, game.config.height-95, game.config.width, 95, 'ground').setOrigin(0);
        
        this.runner = this.physics.add.sprite(100, 300, 'runner');
        
        //added sprites
        this.tomb = this.physics.add.sprite(700, 368, 'tomb');
        this.tomb.body.setAllowGravity(false);

        this.ghostcharge = this.physics.add.sprite(700, 350, 'ghostcharge');
        this.ghostcharge.body.setAllowGravity(false);

        this.ghostshoot = this.physics.add.sprite(700, 400, 'ghostshoot');
        this.ghostshoot.body.setAllowGravity(false);

        this.hpup = this.physics.add.sprite(700, 350, '');
        this.hpup.body.setAllowGravity(false);

        this.gun = this.physics.add.sprite(700, 350, '');
        this.gun.body.setAllowGravity(false);

        // defined keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('tomb', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.tomb.anims.play('move');

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('runner', {start: 0, end: 4, first: 0}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'wiggle',
            frames: this.anims.generateFrameNumbers('ghostcharge', {start: 0, end: 1, first: 0}),
            frameRate: 8,
            repeat: -1
        });
        this.ghostcharge.anims.play('wiggle');


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
        this.timecounter = 0;
        this.scorecounter = 0;
        this.diff = 0;
        this.gameover = false;
        this.loop = false;
        this.score = this.add.text(game.config.width/2, borderUISize + borderPadding - 16, this.scorecounter / 1000, scoreConfig).setOrigin(0.5);
        
        this.spawntomb = false;
        this.groundcollide = this.physics.add.collider(this.runner, this.ground);
        
        this.physics.add.overlap(this.runner, this.tomb, this.hit, null, this);
        this.physics.add.overlap(this.runner, this.ghostcharge, this.hit, null, this);

        this.lives = this.add.text(70, borderUISize + borderPadding - 16, this.iframe, scoreConfig).setOrigin(0.5);

        // check if ghostshoot is going up
        this.isfloating = true;

        this.bullets = this.physics.add.group();
        this.bulletsghost = this.physics.add.group();
        this.isfiring = true;
        this.ghostfiring = true;
        this.upgrade = false;

        this.physics.add.overlap(this.bullets, this.ghostshoot, this.ghostshootdeath, null, this);
        this.physics.add.overlap(this.bullets, this.ghostcharge, this.ghostchargedeath, null, this);
        this.physics.add.overlap(this.bulletsghost, this.runner, this.hit, null, this);
        this.physics.add.overlap(this.hpup, this.runner, this.health, null, this);
        this.physics.add.overlap(this.gun, this.runner, this.guns, null, this);
    }

    update(){

        if(this.gameover && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene");
        }

        if (!this.gameover){
            this.lives.text = this.hp;

            // background scroll
            this.talltrees.tilePositionX += 3 + this.diff;
            this.clouds.tilePositionX += 2 + this.diff;
            this.ghostb.tilePositionX += 0.5 + this.diff;
            this.groundScroll.tilePositionX += 2 + this.diff;
            
            // jumping
            if (Phaser.Input.Keyboard.JustDown(keyW) && this.runner.body.touching.down) {
                this.runner.setVelocityY(-360);
                this.runner.anims.stop('run');
                this.sound.play('jump');
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
            this.timecounter += 10;
            this.scorecounter += 10;
            this.score.text = parseInt(this.scorecounter / 1000);

            // tombstone spawn and mechanics
            if (this.tomb.body.position.x < -50) {
                this.tomb.setVelocityX(0);
                this.tomb.setX(700);
            }
            if (this.tomb.body.position.x > 640 && Phaser.Math.Between(1, 100000) <= 400){
                this.tomb.setVelocityX(-400 - this.diff);
            }

            // ghostcharge spawn and mechanics
            if (this.ghostcharge.body.position.x < -50) {
                this.ghostcharge.setVelocityX(0);
                this.ghostcharge.setX(700);
            }
            if (this.ghostcharge.body.position.x > 640 && Phaser.Math.Between(1, 100000) <= 150){
                this.ghostcharge.setVelocityX(-500 - this.diff);
            }

            //HP Power Up spawn
            if (this.hpup.body.position.x < -50) {
                this.hpup.setVelocityX(0);
                this.hpup.setX(700);
            }
            if (this.hp < 3 && this.hpup.body.position.x > 640 && Phaser.Math.Between(1, 100000) <= 10){
                this.hpup.setVelocityX(-50);
            }

            //Gun Power Up spawn
            if (this.gun.body.position.x < -50) {
                this.gun.setVelocityX(0);
                this.gun.setX(700);
            }
            if (this.gun.body.position.x > 640 && Phaser.Math.Between(1, 100000) <= 100){
                this.gun.setVelocityX(-50);
            }

            // ghostshoot spawn and mechanics
            if (this.ghostshoot.body.position.x < 550) {
                this.ghostshoot.setVelocityX(0);
                if(this.ghostfiring){
                    this.ghostfiring = false;
                    this.ghostbullet();
                    this.time.addEvent({ delay: 3000, callback: () => {this.ghostfiring = true}, callbackScope: this})
                }
            }

            // if at max hight go down
            if (this.ghostshoot.body.position.y < 270 && this.isfloating) {
                this.ghostshoot.setVelocityY(50);
            }
            if (this.ghostshoot.body.position.y > 350 && this.isfloating) {
                this.isfloating = false;
            }
            // if at min hight go up
            if (this.ghostshoot.body.position.y > 350 && !this.isfloating) {
                this.ghostshoot.setVelocityY(-50);
            }
            if (this.ghostshoot.body.position.y < 270 && !this.isfloating) {
                this.isfloating = true;
            }

            if (this.ghostshoot.body.position.x > 640 && Phaser.Math.Between(1, 100000) <= 75){
                this.ghostshoot.setVelocityX(-150);
            }

            if(keyF.isDown && this.isfiring){
                if (thhis.upgrade = false) this.isfiring = false;
                this.firebullet();
                this.time.addEvent({ delay: 1500, callback: ()=> {this.isfiring = true; }, callbackScope: this});
            }
        }
    }

    hit() {
        if (this.iframe == false) {
            this.hp -= 1;
            if (this.hp == 0) {
                this.sound.play('death');
                this.lives.text = this.hp;
                this.gameover = true;
                this.ghostcharge.setVelocityX(0);
                this.tomb.setVelocityX(0);
                this.ghostshoot.setVelocityX(0);
                this.ghostshoot.setVelocityY(0);
                this.runner.anims.stop('run');
                this.tomb.anims.stop('move');
                this.ghostshoot.anims.stop('wiggle');
                this.ghostcharge.anims.stop('wiggle');
                this.physics.world.removeCollider(this.groundcollide);
                this.runner.setVelocityY(-300);
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', { font: '28px Press Start 2P', fill: '#ff0044'}).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) for menu', { font: '28px Press Start 2P', fill: '#ff0044' }).setOrigin(0.5);
            }
            else {
                this.sound.play('hit');
                this.iframe = true;
                this.iframetime = 0;
            }
        }
    }
    firebullet(){
        this.sound.play('fire');
        this.bulletcreate = this.bullets.create(this.runner.x + 15, this.runner.y + 3, 'bullet');
        this.bulletcreate.setScale(2);
        this.bulletcreate.body.setAllowGravity(false);
	    this.bullets.setVelocityX(300);
        //this.time.delayedCall(3000, () => {this.bulletcreate.destroy()}, null, this);
    }

    ghostbullet(){
        this.sound.play('fire');
        this.bulletghostcreate = this.bulletsghost.create(this.ghostshoot.x, this.ghostshoot.y, 'bullet');
        this.bulletghostcreate.setScale(2);
        this.bulletghostcreate.body.setAllowGravity(false);
	    this.bulletsghost.setVelocityX(-300);
    }

    ghostshootdeath(){
        this.sound.play('kill');
        this.scorecounter += 1000;
        this.ghostshoot.setX(700);
        this.bulletcreate.destroy();
    }

    ghostchargedeath(){
        this.sound.play('kill');
        this.scorecounter += 1000;
        this.ghostcharge.setX(-50);
        this.bulletcreate.destroy();
    }

    health() {
        this.hpup.setVelocityX(0);
        this.hpup.setX(700);
        this.hp += 1;
    }

    guns() {
        this.gun.setVelocityX(0);
        this.gun.setX(700);
        this.upgrade = true;
        this.time.delayedCall(10000, () => {this.upgrade = false}, null, this);
    }
}