// Drone instructions to build this room
var config = require('zelda/config'),
    blocks = require('blocks'),
    Drone  = require('drone');

function overworld_h_8() {
    this
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

        // make stairs to the cave
        .move('room')
        .up(3)
        .fwd(9)
        .right(4)

        .box(blocks.air, 1, 2, 1)
        .down()
        .box(blocks.stairs.stone + ':0') // left
        .left()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':0')
        .left()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':3') // toward
        .back()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1') // right
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1)
        .down()
        .box(blocks.stairs.stone + ':1')
        .right()

        .box(blocks.air, 1, 3, 1);

        // TODO: Add lighting, villager, sign, chest with wooden sword
}

Drone.extend('overworld_h_8', overworld_h_8);