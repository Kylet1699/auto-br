import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private zombie!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super('game')
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');

    map.createLayer('ground', tileset);;
    const wallsLayer = map.createLayer('walls', tileset);

    wallsLayer.setCollisionByProperty({ collides: true });

    // Debug: show collision tiles
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 25)
    })

    this.zombie = this.physics.add.sprite(64, 64, 'zombie', '../characters/frames/big_zombie_run_anim_f3.png');
    // set size of hitbox
    // this.zombie.body.setSize(this.zombie.width * 0.5, this.zombie.height * 1)

    this.anims.create({
      key: 'zombie-run-right',
      frames: this.anims.generateFrameNames('zombie', { start: 0, end: 3, prefix: '../characters/frames/big_zombie_run_anim_f', suffix: '.png'}),
      frameRate: 12,
      // duration: 2000,
      repeat: -1,
    })

    this.anims.create({
      key: 'zombie-idle',
      frames: this.anims.generateFrameNames('zombie', { start: 0, end: 3, prefix: '../characters/frames/big_zombie_idle_anim_f', suffix: '.png'}),
      frameRate: 12,
      // duration: 2000,
      repeat: -1,
    })

    this.zombie.anims.play('zombie-idle')

    this.physics.add.collider(this.zombie, wallsLayer)

    // this.cameras.main.startFollow(this.zombie, true);
  }

  update(t: number, dt: number) {
    if (!this.cursors || !this.zombie) return

    const speed = 100;

    if (this.cursors.left?.isDown) {
      this.zombie.setVelocity(-speed, 0);
      this.zombie.anims.play('zombie-run-right', true);

      this.zombie.scaleX = -1;
      this.zombie.body.offset.x = 32;
    } else if (this.cursors.right?.isDown) {
      this.zombie.setVelocity(speed, 0);
      this.zombie.anims.play('zombie-run-right', true);

      this.zombie.scaleX = 1;
      this.zombie.body.offset.x = 0;
    } else {
      this.zombie.anims.play('zombie-idle');
      this.zombie.setVelocity(0, 0)
    }
  }
}
