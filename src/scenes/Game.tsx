import Phaser from 'phaser'

import { debugDraw } from '../utils/debug';
import { createBobAnims } from '../anims/BobAnims'
import Bot from '../characters/Bot';

export default class Game extends Phaser.Scene {

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private bob!: Phaser.Physics.Arcade.Sprite;

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
    debugDraw(wallsLayer, this);

    // add bob sprite
    this.bob = this.physics.add.sprite(64, 64, 'bob');

    // set size of hitbox
    this.bob.body.setSize(16, 20, false)

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
  }

  update(t: number, dt: number) {
    if (!this.cursors || !this.bob) return

    const speed = 100;

    if (this.cursors.left?.isDown) {
      this.bob.setVelocity(-speed, 0);
      this.bob.anims.play('bob-run-right', true);

      this.bob.scaleX = -1;
      this.bob.body.offset.x = 16;
    } else if (this.cursors.right?.isDown) {
      this.bob.setVelocity(speed, 0);
      this.bob.anims.play('bob-run-right', true);

      this.bob.scaleX = 1;
      this.bob.body.offset.x = 0;
    } else if (this.cursors.up?.isDown) {
      this.bob.setVelocity(0, -speed);
      this.bob.anims.play('bob-run-up', true);
    } else if (this.cursors.down?.isDown) {
      this.bob.setVelocity(0, speed);
      this.bob.anims.play('bob-run-down', true);
    } else {
      this.bob.anims.play('bob-idle');
      this.bob.setVelocity(0, 0)
    }
  }
}
