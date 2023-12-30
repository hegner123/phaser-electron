import Phaser from 'phaser';



export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    x,
    y,
    texture,
    frame
  ) {
    super(scene, x, y, texture, frame);
  }

}
