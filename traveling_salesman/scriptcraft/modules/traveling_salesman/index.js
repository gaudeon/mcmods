var blocks = require('blocks');
var Drone  = require('drone');

/*
 * TravelingSalesman
 * 
 * Description: Setup and execute a traveling salesman experiment
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var TravelingSalesman = function (sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    function initialize() {
        var error;

        if("undefined" === typeof sender.getLocation) {
            console.log('This command must be ran by an actual player');
            return;
        }

        var drone = new Drone(sender);

        drone.box(blocks.obsidian); 

        callback(error, self);
    }

    initialize();

    return self;
};

module.exports = TravelingSalesman;
