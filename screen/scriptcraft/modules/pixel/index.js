var blocks = require('blocks'),
    colors = require('block-colors');

/*
 * Pixel
 *
 * Parameters:
 *  x      - x coordinate of pixel
 *  y      - y coordinate of pixel
 *  z      - z coordinate of pixel
 */
var Pixel = function (x, y, z, sender) {
    var self    = {};
    self.errors = [];
    self.color  = {
        id   : colors.black,
        name : 'black'
    };

    // validation and error handling
    self.error = function(msg) {
        self.errors.push(msg);
        console.error('modules/pixel - ' + msg);
    };

    if ("number" !== typeof x) {
        self.error('x is required and should be a number');
    }

    if ("number" !== typeof y) {
        self.error('y is required and should be a number');
    }

    if ("number" !== typeof z) {
        self.error('z is required and should be a number');
    }

    if ("undefined" === typeof sender) {
        self.error('sender is required');
    }

    if (self.errors.length > 0) {
        return self;
    }

    // pixel rendering
    self.render = function() {
        var world = getWorld();

        var block = world.getBlockAt( x, y, z );

        if (__plugin.canary) {
            var BlockType = Packages.net.canarymod.api.world.blocks.BlockType;
            block.type = BlockType.fromId( blocks.wool[ self.color.name ] );
        }
        else if (__plugin.bukkit) {
            //var wool = Packages.org.bukkit.material.Wool();
            //console.log(wool);
            console.log(Packages);
            for (var k in Packages.org.bukkit.material) {
                console.log(k);
            }
        }

        return block;
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

    return self;
};

module.exports = Pixel;