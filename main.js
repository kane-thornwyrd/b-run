requirejs.config({
    baseUrl: 'node_modules',
    paths: {
        app        : '../app',
        phaser     : '../app/phaser-b-run',
        jquery     : 'jquery/dist/jquery.min',
        underscore : 'underscore/underscore-min'
    },
    shim:{
      phaser : { exports: 'Phaser' }
    }
});

require(['jquery', 'underscore', 'phaser'], function($, _, Ph){

  var
    game = new Ph.Game(800, 355, Phaser.AUTO, '', { preload: preload, create: create, update: update }),
    cursors,
    platforms,
    ground,
    player,
    _delayIdle, _playIdle
  ;

function preload() {
  console.log('Phaser preload');

  game.load.spritesheet('axelIdle', '/assets/graphics/axel/idle.png', 46, 86, 6, 0, 0);
  game.load.spritesheet('big', '/assets/graphics/Genesis32XSCD - Art of Fighting - Mr Big.png', 74, 110);
  game.load.image('background', '/assets/graphics/back.jpg');
  game.load.image('ground', '/assets/graphics/ground.jpg');

  game.load.audio('bossBackground', '/assets/musics/Incompetech/Steel Rods.mp3');
  game.load.audio('factoryBackground', '/assets/musics/Incompetech/Club Diver.mp3');
  game.load.audio('stillBackground', '/assets/musics/Incompetech/Blown Away - No Percussion.mp3');
  game.load.audio('intrusionBackground', '/assets/musics/Incompetech/In a Heartbeat.mp3');
  game.load.audio('genericBackground', '/assets/musics/Incompetech/Ouroboros.mp3');


}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursors = game.input.keyboard.createCursorKeys();
  console.log('Phaser create');

  game.add.sprite(0, 0, 'background');

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  // Here we create the ground.
  ground = platforms.create(0, game.world.height - 40, 'ground');

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  // ground.scale.setTo(2, 2);

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;



  player = game.add.sprite(32, game.world.height - 200, 'axelIdle');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 0;
  player.body.collideWorldBounds = true;
  player.body.velocity.x = 0;
  player.animations.add('idle', [0, 1, 2, 3], 15, true);


  game.physics.arcade.collide(player, platforms);
}

function update() {
 //  Reset the players velocity (movement)
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (cursors.left.isDown) {
    //  Move to the left
    player.body.velocity.x = -150;

    //player.animations.play('left');
  } else if (cursors.right.isDown) {
    //  Move to the right
    player.body.velocity.x = 150;

    //player.animations.play('right');
  } else {
    //  Stand still
    //player.animations.stop();
    if(typeof _delayIdle === 'undefined'){

    }
    player.animations.play('idle');

    //player.frame = 4;
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown) {
    player.body.velocity.y = -150;
  } else if (cursors.down.isDown) {
    //  Move to the right
    player.body.velocity.y = 150;

    //player.animations.play('right');
  }
}



});
