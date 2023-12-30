import Phaser from "phaser";
import { Level } from "../../components/world";
import { Player } from "../../components/player";
import { keyCodes, animationFrame } from "../../constants";


export class Level_1_Scene_1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level_1_Scene_1" });
  }
  player;
  levelMap;
  keys;
  keyLeft;
  keyRight;
  keyUp;
  keyDown;
  terrainLayerMap;
  buildingsLayerMap;
  debugGraphics;
  showTiles;
  showCollidingTiles;
  showFaces;
  preload() {
    let sprites;
    let levelMap;

    const map = new URL(
      "assets/sprites/Modern_Exteriors_Complete_Tileset.png",
      import.meta.url
    );
    const mapTerrainCSV = new URL(
      "assets/sprites/phaser-test_Terrain.csv",
      import.meta.url
    );
    const mapBuildingsCSV = new URL(
      "assets/sprites/phaser-test_Buildings.csv",
      import.meta.url
    );

    const playerSpriteSheet = new URL(
      "assets/sprites/character_spriteSheet.png",
      import.meta.url
    );

    this.load.tilemapCSV("buildings", mapBuildingsCSV.toString());
    this.load.tilemapCSV("terrain", mapTerrainCSV.toString());

    this.load.spritesheet("playerSprite", playerSpriteSheet.toString(), {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.image("tiles", map.toString());
  }

  create() {
    const GameWorld = new Level(this, {});
    this.terrainLayerMap = this.make.tilemap({
      key: "terrain",
      tileWidth: 16,
      tileHeight: 16,
    });
    this.buildingsLayerMap = this.make.tilemap({
      key: "buildings",
      tileWidth: 16,
      tileHeight: 16,
    });

    this.buildingsLayerMap.setCollisionBetween(6342, 15323);
    const terrainTileset = this.terrainLayerMap.addTilesetImage("tiles");
    const buildingTileset = this.buildingsLayerMap.addTilesetImage("tiles");
    const terrainLayer = this.terrainLayerMap.createLayer(
      0,
      terrainTileset,
      0,
      0
    ); // layer index, tileset, x, y
    const buildingLayer = this.buildingsLayerMap.createLayer(
      "layer",
      buildingTileset,
      0,
      0
    ); // layer index, tileset, x, y
    terrainLayer.setScale(2);
    buildingLayer.setScale(2);

    
    this.debugGraphics = this.add.graphics();

    this.player = this.physics.add.sprite(100, 100, "playerSprite",1);
    this.physics.add.collider(this.player, this.buildingsLayerMap);
   

    this.keys = this.input.keyboard?.addKeys(
      "RIGHT, LEFT, UP, DOWN",
      true,
      true
    );

    this.anims.create({
      key: "idleRight",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("idle", 0),
        end: animationFrame("idle", 0),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "idleUp",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("idle", 1),
        end: animationFrame("idle", 1),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "idleLeft",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("idle", 2),
        end: animationFrame("idle", 2),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "idleDown",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("idle", 3),
        end: animationFrame("idle", 3),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walkRight",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("walking", 0),
        end: animationFrame("walking", 5),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walkUp",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("walking", 6),
        end: animationFrame("walking", 11),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walkLeft",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("walking", 12),
        end: animationFrame("walking", 17),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walkDown",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: animationFrame("walking", 18),
        end: animationFrame("walking", 23),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.add.existing(this.player);
    this.physics.add.collider(this.player, buildingLayer);
    this.cameras.main.setBounds(
      0,
      0,
      this.terrainLayerMap.widthInPixels,
      this.terrainLayerMap.heightInPixels
    );
    this.cameras.main.startFollow(this.player);
  }
  update(time, delta) {
    this.keyRight = this.keys.RIGHT.isDown;
    this.keyLeft = this.keys.LEFT.isDown;
    this.keyUp = this.keys.UP.isDown;
    this.keyDown = this.keys.DOWN.isDown;

    this.player.setVelocity(0);

    if (this.keyRight) {
      this.player.setVelocityX(100);
      this.player.anims.play("walkRight", true);
      
    }
    if (this.keyLeft) {
      this.player.setVelocityX(-100);
      this.player.anims.play("walkLeft", true);
    }
    if (this.keyUp) {
      this.player.setVelocityY(-100);
      this.player.anims.play("walkUp", true);
    }
    if (this.keyDown) {
      this.player.body.setVelocityY(100);
      this.player.anims.play("walkDown", true);
    }
  

    if (!this.keyRight && !this.keyLeft && !this.keyUp && !this.keyDown) {
      switch (this.keys.RIGHT.plugin.prevCode) {
        case keyCodes.right:
          this.player.anims.play("idleRight", true);
          break;
        case keyCodes.left:
          this.player.anims.play("idleLeft", true);
          break;
        case keyCodes.up:
          this.player.anims.play("idleUp", true);
          break;
        case keyCodes.down:
          this.player.anims.play("idleDown", true);
          break;
        default:
          break;
      
    }
    }
  }

  drawDebug() {
    const tileColor = new Phaser.Display.Color(105, 210, 231, 200);
    const colldingTileColor = new Phaser.Display.Color(243, 134, 48, 200);
    const faceColor = new Phaser.Display.Color(40, 39, 37, 255);

    this.debugGraphics.clear();

    // Pass in null for any of the style options to disable drawing that component
    this.buildingsLayerMap.renderDebug(this.debugGraphics, {
      tileColor: tileColor, // Non-colliding tiles
      collidingTileColor: colldingTileColor, // Colliding tiles
      faceColor: faceColor, // Interesting faces, i.e. colliding edges
    });
  }
}
