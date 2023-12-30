import Phaser from 'phaser';
import GameWindow, { physicsConfig } from "../constants";

export class Level extends Phaser.Physics.Arcade.World {
  constructor(scene, config) {
    super(scene, {
      ...config,
      ...physicsConfig,
      width: GameWindow.width,
      height: GameWindow.height,
      checkCollision: { up: true, down: true, left: true, right: true },
    });
  }
}
