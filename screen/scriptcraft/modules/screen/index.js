var blocks = require('blocks');

/*
 * Screen
 *
 * Parameters:
 *  x      - x coordinate of bottom left corner block
 *  y      - y coordinate of bottom left corner block
 *  z      - z coordinate of bottom left corner block
 *  width  - screen width
 *  height - screen height
 */
var Screen = function (x, y, z, width, height, sender) {
    var self = {};
    self.errors = [];

    self.error = function(msg) {
        self.errors.push(msg);
        console.error('modules/screen - ' + msg);
    };

    if (typeof x !== "number") {
        self.error('x is required and should be a number');
    }

    if (typeof y !== "number") {
        self.error('y is required and should be a number');
    }

    if (typeof z !== "number") {
        self.error('z is required and should be a number');
    }

    if (typeof width !== "number") {
        self.error('width is required and should be a number');
    }

    if (typeof width !== "number") {
        self.error('width is required and should be a number');
    }

    console.log(sender.toString().match(/Player/) ? 'yes' : 'no');
    console.log(typeof sender);
    console.log(getWorld());

    if (self.errors.length > 0) {
        return self;
    }

    self.render = function() {
        var world = getWorld();

        console.log(blocks.wool.black);

        //putBlock(0, 6, 0, blocks.wool.black, null, world, false);
        var block = world.getBlockAt( 0, 6, 0 );

        block.setType(Packages.org.bukkit.Material.WOOL);
    };

    /* get the world no matter the context */
    function getWorld() {
        if (sender.toString().match(/Player/)) {
            return sender.world;
        }
        else {
            return sender.getServer().getWorlds().get(0);
        }
    }

    /*
    low-level function to place a block in the world - all drone methods which
    place blocks ultimately invoke this function.
   */
    function putBlock( x, y, z, blockId, metadata, world, update ) {
        if ( typeof metadata == 'undefined' ) {
            metadata = 0;
        }
        var block = world.getBlockAt( x, y, z );

        if (__plugin.canary) {
            var BlockType = Packages.net.canarymod.api.world.blocks.BlockType;
            block.type = BlockType.fromId(blockId);
            var applyProperties = require('blockhelper').applyProperties;
            applyProperties(block, metadata);
            if (typeof update === 'undefined'){
                update = true;
            }
            if (update){
                block.update();
            }
        }
        if (__plugin.bukkit) {
            block.setTypeIdAndData( blockId, metadata, false );
            block.data = metadata;
        }
        return block;
    }

    return self;
};

module.exports = Screen;
