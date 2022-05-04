/*
Group: Noah Hart, Leon Chen, Liam Kaldes
Game Title: Ghost Hunter
Date Completed: 5/2/22
Small edits made prior to submit date
Creative tilt - spooky theme where you can shoot ghost!
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 700},
            //debug: true
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
game.highscore = 0;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// jump, restart, fire keys
let keyW, keyR, keyF, keyM;