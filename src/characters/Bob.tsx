import Phaser from 'phaser';

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      bob(x: number, y: number, texture: string, frame?: string | number): Bob
    }
  }
}

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD,
}

export default class Bob extends Phaser.Physics.Arcade.Sprite {
  private healthState = HealthState.IDLE;
  private damageTime = 0;
  private _health = 3;

  get health() { 
    return this._health;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number ) {
    super(scene, x, y, texture, frame);

    this.anims.play('bob-idle')
    // this.anims.play('bob-sit-right')

  }

  handleDamage(dir: Phaser.Math.Vector2) {
    // if alr damaged, don't damage again
    if (this._health === 0) {
      return; 
    }
    if (this.healthState === HealthState.DAMAGE) {
      return;
    }

    --this._health;

    if (this._health <= 0) { 
      this.healthState = HealthState.DEAD;
      this.anims.play('bob-sit-right')
    } else {
      this.setVelocity(dir.x, dir.y);

      this.setTint(0xff0000)
  
      this.healthState = HealthState.DAMAGE
      this.damageTime = 0;
  
    }
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);
    
    switch (this.healthState) {
      case HealthState.IDLE:
        break
      case HealthState.DAMAGE:
        this.damageTime += dt;
        if (this.damageTime >= 250) {
          this.healthState = HealthState.IDLE;
          this.setTint(0xffffff)
          this.damageTime = 0;
        }
        break
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) { 
    if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD ) return
    if (!cursors) return

    const speed = 100;

    if (cursors.left?.isDown) {
      this.setVelocity(-speed, 0);
      this.anims.play('bob-run-right', true);

      this.scaleX = -1;
      this.body.offset.x = 16;
    } else if (cursors.right?.isDown) {
      this.setVelocity(speed, 0);
      this.anims.play('bob-run-right', true);

      this.scaleX = 1;
      this.body.offset.x = 0;
    } else if (cursors.up?.isDown) {
      this.setVelocity(0, -speed);
      this.anims.play('bob-run-up', true);
    } else if (cursors.down?.isDown) {
      this.setVelocity(0, speed);
      this.anims.play('bob-run-down', true);
    } else {
      // this.anims.play('bob-idle');
      this.setVelocity(0, 0)
    }
  }

}

Phaser.GameObjects.GameObjectFactory.register('bob', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
  var sprite = new Bob(this.scene, x, y, texture, frame);

  this.displayList.add(sprite);
  this.updateList.add(sprite);

  this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

  sprite.body.setSize(16, 20, false)


  return sprite;
}) 