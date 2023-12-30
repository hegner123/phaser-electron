import Phaser from "phaser";
import {MenuButton, TextField} from "../components/userInterface";
import {GameWindow} from "../constants";



export class StartScreen extends Phaser.Scene {
  constructor() {
    super({ key: "StartScreen" });
  }
  preload() {}

  create() {
    const screenTitle = new Phaser.GameObjects.Text(
      this,
      GameWindow.xCenter,
      100,
      "Start Screen",
      {
        color: "#ffffff",
      }
    );

    screenTitle.setOrigin(0.5, 0.5);

    const newGameButton = new MenuButton(
      this,
      GameWindow.xCenter,
      150,
      100,
      50,
      0x3b4c72,
      0x3b4c02,
      1,
      "New Game",
      "NewGame"
    );
    const level1 = new MenuButton(
      this,
      GameWindow.xCenter,
      300,
      100,
      50,
      0x3b4c72,
      0x3b4c02,
      1,
      "Level 1",
      "Level_1_Scene_1"
    );
    const loadGameButton = new MenuButton(
      this,
      GameWindow.xCenter,
      208,
      100,
      50,
      0x3b4c72,
      0x3b4c02,
      1,
      "Load Game",
      "LoadGame"
    );

    this.add.existing(screenTitle);
    this.add.existing(newGameButton);
    this.add.existing(loadGameButton);
  }
}

export class NewGame extends Phaser.Scene {
  constructor() {
    super({ key: "NewGame" });
  }
  preload() {}

  create() {
    const gameName = new TextField(
      this,
      GameWindow.xCenter,
      100,
      250,
      75,
      0x3b4c72,
      1
    );

    this.add.existing(gameName);
  }
}
