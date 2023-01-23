import Phaser from 'phaser';

const createBobAnims = ( anims: Phaser.Animations.AnimationManager ) => {
  anims.create({
    key: 'bob-idle',
    frameRate: 10,
    frames: anims.generateFrameNumbers('bob', { start: 41, end: 45 }),
    repeat: -1,
    duration: 2000,
  })

  anims.create({
    key: 'bob-run-right',
    frameRate: 10,
    frames: anims.generateFrameNumbers('bob', { start: 46, end: 51 }),
    repeat: -1,
  })

  anims.create({
    key: 'bob-run-up',
    frameRate: 10,
    frames: anims.generateFrameNumbers('bob', { start: 52, end: 57 }),
    repeat: -1,
    // duration: 2000,
  })

  anims.create({
    key: 'bob-run-left',
    frameRate: 10,
    frames: anims.generateFrameNumbers('bob', { start: 58, end: 63 }),
    repeat: -1,
    // duration: 2000,
  })

  anims.create({
    key: 'bob-run-down',
    frameRate: 10,
    frames: anims.generateFrameNumbers('bob', { start: 64, end: 68 }),
    repeat: -1,
    // duration: 2000,
  })
}

export {
  createBobAnims
}