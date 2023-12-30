import  Phaser  from "phaser";
import GameWindow from "./constants.js";
import Scenes from "./scenes/index.js";

const config = {
  type: Phaser.AUTO,
  width: GameWindow.width,
  height: GameWindow.height,
  scene: Scenes,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
};

const game = new Phaser.Game(config);

export default game;