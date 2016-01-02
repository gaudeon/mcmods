var blocks = require('blocks'),
    colors = require('block-colors'),
    debug  = require('debug');

/*
 * Pixel
 *
 * Parameters:
 *  x      - x coordinate of pixel
 *  y      - y coordinate of pixel
 *  z      - z coordinate of pixel
 */
var Pixel = function (x, y, z, sender) {
    var self     = {};
    self.errors  = [];
    var color    = 'black';
    var is_hidden = true;

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
    self.show = function() {
        var world = getWorld();

        var block = world.getBlockAt( x, y, z );

        if (__plugin.canary) {
            var BlockType = Packages.net.canarymod.api.world.blocks.BlockType;
            block.type = BlockType.fromId( blocks.wool[ color ] );
            block.update();
        }
        else if (__plugin.bukkit) {
            block.setType( Packages.org.bukkit.Material.WOOL ); // Set the Material

            var dye_colors = require('bukkit/dye-colors');
            var bkWool     = Packages.org.bukkit.material.Wool;
            var wool_block = new bkWool( dye_colors[ color ] ); // New MaterialData

            // Get the BlockState
            var state = block.getState();

            // Set the MaterialData to that of a Wool block of the desired color then call for an update
            state.setData(wool_block);
            state.update();
        }

        is_hidden = false;

        return block;
    };

    // return the pixel back to air
    self.hide = function() {
        var world = getWorld();

        var block = world.getBlockAt( x, y, z );

        if (__plugin.canary) {
            var BlockType = Packages.net.canarymod.api.world.blocks.BlockType;
            block.type = BlockType.fromId( blocks.air );
        }
        else if (__plugin.bukkit) {
            block.setType( Packages.org.bukkit.Material.AIR ); // Set the Material
        }

        is_hidden = true;

        return block;
    };

    // set pixel color
    self.setColor = function(c) {
        if ("undefined" === typeof(colors[ c ])) {
            self.error('c is not a valid color');
            return;
        }

        color = c;

        if (! is_hidden) {
            self.show();
        }

        return color;
    };

    // get pixel color
    self.getColor = function() {
        return color;
    };

    // get the world no matter the context
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