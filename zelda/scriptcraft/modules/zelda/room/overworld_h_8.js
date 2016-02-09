// Drone instructions to build this room
var config   = require('zelda/config'),
    blocks   = require('blocks'),
    entities = require('entities'),
    items    = require('items'),
    spawn    = require('zelda/spawn'),
    utils    = require('utils');

function overworld_h_8() {
    var drone = this;

    drone
        // checkpoint the start of the room
        .chkpt('room')

        // clear the area
        .box(blocks.air, config.ROOM_WIDTH, config.ROOM_HEIGHT, config.ROOM_DEPTH)

        // bedrock foundation
        .box(blocks.bedrock,config.ROOM_WIDTH, 1, config.ROOM_DEPTH)

        // build moss_stone wall parts
        .up()
        .box(blocks.moss_stone, 2, 6, 5)
        .right(2)
        .box(blocks.moss_stone, 14, 6, 2)
        .right(12)
        .fwd(2)
        .box(blocks.moss_stone, 2, 6, 3)
        .fwd(4)
        .left(5)
        .box(blocks.moss_stone, 7, 6, 5)
        .move('room')
        .up()
        .fwd(6)
        .box(blocks.moss_stone, 2, 6, 1)
        .fwd(1)
        .box(blocks.moss_stone, 3, 6, 1)
        .fwd(1)
        .box(blocks.moss_stone, 4, 6, 1)
        .fwd(1)
        .box(blocks.moss_stone, 7, 6, 2)

        // build smooth sandstone floor parts
        .move('room')
        .up()
        .fwd(5)
        .box(blocks.double_slab.smooth_sandstone, 2, 2, 1)
        .right(2)
        .back(3)
        .box(blocks.double_slab.smooth_sandstone, 7, 2, 5)
        .right(7)
        .box(blocks.double_slab.smooth_sandstone, 5, 2, 4)
        .right(5)
        .fwd(3)
        .box(blocks.double_slab.smooth_sandstone, 2, 2, 1)
        .move('room')
        .up()
        .fwd(7)
        .right(3)
        .box(blocks.double_slab.smooth_sandstone, 6, 2, 1)
        .fwd()
        .right()
        .box(blocks.double_slab.smooth_sandstone, 5, 2, 1)
        .fwd()
        .right(3)
        .box(blocks.double_slab.smooth_sandstone, 2, 2, 2)

        // clear the underground
        .move('room')
        .down(config.ROOM_HEIGHT)
        .chkpt('underground')
        .box(blocks.air, config.ROOM_WIDTH, config.ROOM_HEIGHT, config.ROOM_DEPTH)

        // bedrock box
        .box0(blocks.bedrock,config.ROOM_WIDTH, config.ROOM_HEIGHT, config.ROOM_DEPTH)
        .box(blocks.bedrock,config.ROOM_WIDTH, 1, config.ROOM_DEPTH)

        // dirt walls
        .up()
        .fwd()
        .right()
        .box0(blocks.dirt,config.ROOM_WIDTH - 2, config.ROOM_HEIGHT - 1, config.ROOM_DEPTH - 2)
        .fwd()
        .right()
        .box0(blocks.dirt,config.ROOM_WIDTH - 4, config.ROOM_HEIGHT - 1, config.ROOM_DEPTH - 4)
        .box(blocks.dirt,config.ROOM_WIDTH - 4, 1, config.ROOM_DEPTH - 4)

        // make ladder to the cave
        .move('room')
        .up(3)
        .fwd(9)
        .right(4)
        .down(12)
        .box(blocks.air, 1, 14, 1)
        .ladder(12)

        // make the torches and chest in cave
        .back()
        .box(blocks.air, 1, 2, 1)
        .back(3)
        .box(blocks.torch)
        .right(3)
        .box(blocks.chest + ':1')
        .right()
        .box(blocks.chest + ':1')
        .chkpt('chest')
        .right(3)
        .box(blocks.torch)
        .left(2)
        .back(2)
        .box(blocks.fence.oak)
        .fwd()
        .box(blocks.fence.oak)
        .left()
        .box(blocks.fence.oak)
        .left()
        .box(blocks.fence.oak)
        .left()
        .box(blocks.fence.oak)
        .back()
        .box(blocks.fence.oak)
        .fwd()
        .up()
        .chkpt('sign')
        .turn(2)
        .signpost(["It's dangerous", "to go alone!", "", "Take this."])
        .turn(2)
        .then(function() {
            drone.move('chest');
            var chest = utils.blockAt( drone.getLocation() ).getState();
            chest.getInventory().addItem(items.woodSword(1));
            chest.update(true);
        })
        .then(function() {
            drone.move('chest').back(2);
            var villager = spawn( 'villager', drone.getLocation() );
        });
}

Drone.extend('overworld_h_8', overworld_h_8);