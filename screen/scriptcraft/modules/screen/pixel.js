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
 *  frame_index - index of the pixel on screen
 *  screen - screen object to enable event driven functionality
 *  sender - player object
 */
var Pixel = function (x, y, z, frame_index, screen, sender) {
    var self       = {};
    self.errors    = [];
    self.color     = 'black';
    self.is_hidden = true;


    // pixel rendering
    self.show = function() {
        var block = getBlock();

        if (__plugin.canary) {
            var BlockType = Packages.net.canarymod.api.world.blocks.BlockType;
            block.type = BlockType.fromId( blocks.wool[ self.color ] );
            block.update();
        }
        else if (__plugin.bukkit) {
            block.setType( Packages.org.bukkit.Material.WOOL ); // Set the Material

            var dye_colors = require('bukkit/dye-colors');
            var bkWool     = Packages.org.bukkit.material.Wool;
            var wool_block = new bkWool( dye_colors[ self.color ] ); // New MaterialData

            // Get the BlockState
            var state = block.getState();

            // Set the MaterialData to that of a Wool block of the desired color then call for an update
            state.setData(wool_block);
            state.update();
        }

        self.is_hidden = false;

        return block;
    };

    // return the pixel back to air
    self.hide = function() {
        var block = getBlock();

        if (__plugin.canary) {
            var BlockType = Packages.net.canarymod.api.world.blocks.BlockType;
            block.type = BlockType.fromId( blocks.air );
        }
        else if (__plugin.bukkit) {
            block.setType( Packages.org.bukkit.Material.AIR ); // Set the Material
        }

        self.is_hidden = true;

        return block;
    };

    // is_hidden accessor
    self.isHidden = function() { return self.is_hidden; };

    // set pixel color
    self.setColor = function(c) {
        if ("undefined" === typeof(colors[ c ])) {
            c = id2color(c);

            if ("undefined" === typeof(colors[ c ])) {
                self.error('c is not a valid color');
                return;
            }
        }

        self.color = c;

        if (! self.is_hidden) {
            self.show();
        }

        return self.color;
    };

    // get pixel color
    self.getColor = function() {
        return self.color;
    };

    // get object type
    self.typeof = function() { return 'Pixel'; };

    // convert ids to color words
    function id2color(id) {
        id *= 1;

        for (var c in colors) {
            if (colors[c] == id) {
                return c;
            }
        }

        return null;
    }

    // get the world no matter the context
    function getWorld() {
        if ('undefined' === typeof self.world) {
            if (sender.toString().match(/Player/)) {
                self.world = sender.world;
            }
            else {
                self.world = sender.getServer().getWorlds().get(0);
            }
        }

        return self.world;
    }

    // get our block
    function getBlock() {
        if ('undefined' === typeof self.block) {
            var world = getWorld();

            self.block = world.getBlockAt( x, y, z );
        }

        return self.block;
    }

    // initialize
    function initialize() {
        // validation and error handling
        self.error = function(msg) {
            self.errors.push(msg);
            console.error('modules/pixel - ' + msg);
        };

        if ("undefined" === typeof x) {
            self.error('x is required and should be a number');
        }

        if ("undefined" === typeof y) {
            self.error('y is required and should be a number');
        }

        if ("undefined" === typeof z) {
            self.error('z is required and should be a number');
        }

        if ("undefined" === typeof sender) {
            self.error('sender is required');
        }

        if ("object" === typeof screen && "function" === typeof screen.typeof && 'Screen' === screen.typeof()) {
            screen.event.on('display_frame', function(ev) {
                self.setColor(ev.data[frame_index]);
            });

            screen.event.on('show', function(ev) {
                self.show();
            });

            screen.event.on('hide', function(ev) {
                self.hide();
            });
        }
        else {
            self.error('screen is required');
        }

        if (self.errors.length > 0) {
            return self;
        }

    }

    initialize(); // run it

    return self;
};

module.exports = Pixel;
