var blocks = require('blocks'),
    Drone  = require('drone'),
    Map    = require('traveling_salesman/map');

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

    function _initialize() {
        var error;

        if("undefined" === typeof sender.getLocation) {
            console.log('This command must be ran by an actual player');
            return;
        }

        self.drone = new Drone(sender);
        self.map   = new Map(sender);

        callback(error, self);
    }

    _initialize();

    return self;
};

module.exports = TravelingSalesman;
