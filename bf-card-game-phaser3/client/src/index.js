import Phaser from "phaser";
import Game from "./scenes/game";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);