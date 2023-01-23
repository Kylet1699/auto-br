import Phaser from 'phaser';
// import dungeon_tiles from '../tiles/dungeon_tiles.png';
import room_tiles from '../tiles/Room_Builder_free_16x16.png'
import map from '../tiles/map.json';
// import dungeon_01 from '../tiles/dungeon-01.json';


export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', room_tiles)
    this.load.tilemapTiledJSON('room', map)

    // this.load.atlas('zombie', '../characters/zombie.png', '../characters/zombie.json')
    this.load.spritesheet('bob', '../characters/bob.png',  { frameWidth: 16, frameHeight: 32 })
  }

  create() {
    this.scene.start('game');
  }
}