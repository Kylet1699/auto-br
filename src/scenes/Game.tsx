import Phaser from 'phaser'

import { debugDraw } from '../utils/debug';
import { createBobAnims } from '../anims/BobAnims'
import Bot from '../characters/Bot';

import '../characters/Bob';
import Bob from '../characters/Bob';

export default class Game extends Phaser.Scene {

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private bob!: Bob;

  constructor() {
    super('game')
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // Create animation for bob
    createBobAnims(this.anims)

    const map = this.make.tilemap({ key: 'room' });
    const tileset = map.addTilesetImage('room', 'tiles');

    map.createLayer('ground', tileset);;
    const wallsLayer = map.createLayer('walls', tileset);

    // create collision for wallslayer
    // can be adjusted in Tiled
    wallsLayer.setCollisionByProperty({ collides: true });

    // Debug: show collision tiles
    // debugDraw(wallsLayer, this);

    // @ts-ignore
    this.bob = this.add.bob(64, 64, 'bob')

    // add bob sprite
    // this.bob = this.physics.add.sprite(64, 64, 'bob');

    // set size of hitbox
    // this.bob.body.setSize(16, 20, false)

    // this.cameras.main.startFollow(this.bob, true);

    const bots = this.physics.add.group({
      classType: Bot,
      createCallback: (gameObj) => {
        const botObj = gameObj as Bot;
        botObj.body.onCollide = true;
      }
    })

    bots.get(200, 200, 'bob')

    // Add collider for bob to collide into walls
    this.physics.add.collider(this.bob, wallsLayer);
    this.physics.add.collider(bots, wallsLayer);

    this.physics.add.collider(this.bob, bots, this.handlePlayerCollision, undefined, this)
  }

  private handlePlayerCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const bot = obj2 as Bot;
    
    const dx = this.bob.x - bot.x;
    const dy = this.bob.y - bot.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

    this.bob.handleDamage(dir);
  }

  update(t: number, dt: number) {
    if (this.bob) {
      this.bob.update(this.cursors)
    }

  }
}
