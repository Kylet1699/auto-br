import Phaser from 'phaser';
import dungeon_tiles from '../tiles/dungeon_tiles.png';
import dungeon_01 from '../tiles/dungeon-01.json';


export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', dungeon_tiles)
    this.load.tilemapTiledJSON('dungeon', dungeon_01)

    this.load.atlas('zombie', '../characters/zombie.png', '../characters/zombie.json')
  }

  create() {
    this.scene.start('game');
  }
}