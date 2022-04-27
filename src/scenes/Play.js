class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('ghost', './assets/spaceship.png');
        this.load.image('runner', './assets/runner.png');
        this.load.image('spike', './assets/spike.png');
        this.load.image('background', './assets/nightground.png');
        this.load.image('ghostb','./assets/ghost.png');
        this.load.image('ground','./assets/ground.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('talltrees', './assets/talltrees.png');
        
    }

    create(){

        //added background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        this.ghostb = this.add.tileSprite(0, 0, 640, 480, 'ghostb').setOrigin(0, 0);

        this.clouds = this.add.tileSprite(0, 0, 640, 480, 'clouds').setOrigin(0, 0);

        this.talltrees = this.add.tileSprite(0, 0, 640, 480, 'talltrees').setOrigin(0, 0);

        // floor
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.ground = this.physics.add.staticImage(400, 495, 'ground').setScale(2).refreshBody();
        
        this.runner = this.physics.add.sprite(100, 300, 'runner');
        this.ghost01 = new GhostCharge(this, game.config.width + borderUISize*6, borderUISize*11, 'ghost', 0).setOrigin(0, 0);
        //added spike
        this.spike = new Spike(this, game.config.width+300 + borderUISize*6, borderUISize*11, 'spike', 0).setOrigin(0, 0);

        // defined keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
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
        this.tim = 0;
        this.gameover = false;
        this.timer = this.add.text(game.config.width/2, borderUISize + borderPadding - 16, this.tim / 1000, scoreConfig).setOrigin(0.5);

        this.physics.add.collider(this.runner, this.ground);
        //this.physics.add.collider(this.runner, this.spike);
    }

    update(){

        if(this.gameover && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene");
        }

        //move background
        //this.background.tilePositionX += 4; 
        //this.ghostb.tilePositionX += 2;
        this.talltrees.tilePositionX += 3;
        this.clouds.tilePositionX += 2;

        if (!this.gameover){ 
            if (Phaser.Input.Keyboard.JustDown(keyW) && this.runner.body.touching.down) {
                this.runner.setVelocityY(-360);
            }
            this.tim += 10;
            this.timer.text = parseInt(this.tim / 1000);
            //this.ghost01.update();
            this.runner.update();
            this.spike.update();
            if(Phaser.Math.Between(1, 100000) <= 500){
                this.spike.reset();
            }
        }
        //this.physics.add.overlap(this.runner, this.spike, this.gameOver, null, this);
        if(this.checkCollision(this.runner, this.spike)){
            this.gameover = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', { font: '28px Press Start 2P', fill: '#ff0044'}).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) for menu', { font: '28px Press Start 2P', fill: '#ff0044' }).setOrigin(0.5);
        }
        

        if(this.checkCollision(this.runner, this.ghost01)){
            this.gameover = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', { font: '28px Press Start 2P', fill: '#ff0044'}).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) for menu', { font: '28px Press Start 2P', fill: '#ff0044' }).setOrigin(0.5);
        }



    }

    /*gameOver() {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) for Menu', scoreConfig).setOrigin(0.5);
        this.gameover = true;
    }*/

    checkCollision(runner, obstacle){
        if(runner.x < obstacle.x + obstacle.width && 
            runner.x + runner.width > obstacle.x &&
            runner.y < obstacle.y + obstacle.height &&
            runner.height + runner.y > obstacle.y){
                return true;
        }else{
                return false;
        }
    }
}