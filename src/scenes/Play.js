class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('ghost', './assets/spaceship.png');
        this.load.image('runner', './assets/runner.png');
        this.load.image('spike', './assets/spike.png');
        this.load.image('background', './assets/background.png');
        this.load.image('ghostb','./assets/ghost.png');
    }

    create(){

        //added background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        this.ghostb = this.add.tileSprite(0, 0, 640, 480, 'ghostb').setOrigin(0, 0);

        // floor
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize*3, game.config.width, borderUISize*3, 0xFFFFFF).setOrigin(0, 0);
        
        this.runner01 = new Runner(this, game.config.width/2 - 200, borderUISize*10, 'runner', 0).setOrigin(0, 0);
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
        this.timer = this.add.text(game.config.width/2, borderUISize + borderPadding*2, this.tim / 1000, scoreConfig).setOrigin(0.5);

        if(this.gameover){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) for Menu', scoreConfig).setOrigin(0.5);
        }

    }

    update(){

        if(this.gameover && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene");
        }

        //move background
        this.background.tilePositionX += 4; 
        this.ghostb.tilePositionX += 2;

        if (!this.gameover){ 
            this.tim += 10;
            this.timer.text = parseInt(this.tim / 1000);
            this.ghost01.update();
            this.runner01.update();
            this.spike.update();
        }

        if(this.checkCollision(this.runner01, this.spike)){
            this.gameover = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', { font: '28px Press Start 2P', fill: '#ff0044'}).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) for menu', { font: '28px Press Start 2P', fill: '#ff0044' }).setOrigin(0.5);
        }

        if(this.checkCollision(this.runner01, this.ghost01)){
            this.gameover = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', { font: '28px Press Start 2P', fill: '#ff0044'}).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) for menu', { font: '28px Press Start 2P', fill: '#ff0044' }).setOrigin(0.5);
        }



    }

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