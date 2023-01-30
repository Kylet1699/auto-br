import Phaser from 'phaser';

import { sceneEvents } from '../events/EventsCenter';

export default class GameUI extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'game-ui' })
  }

  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    })

    this.hearts.createMultiple({
      key: 'ui-heart-full',
      setXY: {
        x: 10, 
        y: 10,
        stepX: 16,
      },
      quantity: 3,
    })

    sceneEvents.on('player-health-changed', this.handlePlayerHealthChange, this)

    // remove event listener for clean up
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off('player-health-changed', this.handlePlayerHealthChange, this);
    })
  }

  private handlePlayerHealthChange(health: number) {
    this.hearts.children.each((gameObj, ind) => {
      const heart = gameObj as Phaser.GameObjects.Image;
      if (ind < health) {
        heart.setTexture('ui-heart-full');
      } else {
        heart.setTexture('ui-heart-empty');
      }
    })
  }
}