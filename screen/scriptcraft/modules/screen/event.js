/*
 * Event - custom event handling
 *
 * Synopsis
 *
 *  var event = require('screen/event');
 *  var myobj = {};
 *  myobj.event = new event(myobj); // whatever is in args of the constructor gets returned in event.data on callbacks
 *  myobj.event.on('someevent', function(ev) {
 *      console.log('hi');
 *  });
 *
 * Parameters:
 *  none
 */
var Event = function () {
    var self       = {};

    self.events = {};

    self.on = function(event, callback) {
        if ('undefined' === typeof callback || 'undefined' === typeof event || event === '') return;

        if ('undefined' === typeof self.events[event]) {
            self.events[event] = [];
        }

        var id = event + ':' + self.events[event].length;

        self.events[event].push(callback);
        
        return id;
    };

    self.trigger = function(event, data) {
        if ('undefined' === typeof event || event === '' || 'undefined' === typeof self.events[event]) return;

        for (var index in self.events[event]) {
            if ('function' === typeof self.events[event][index]) {
                self.events[event][index]({ 
                    'data': data
                });
            }
        }
    };

    self.clear = function(event_or_id) {
        if ('undefined' === typeof event_or_id || event_or_id === '') return;

        var parts = event_or_id.split(':'),
            event = parts[0],
            id    = parts[1];

        if ('undefined' === typeof self.events[event]) return;

        if ('undefined' !== typeof id) {
            if ('undefined' !== typeof self.events[event][id]) {
                self.events[event][id] = null;
            }
        }
        else {
            self.events[event] = [];
        }
    };

    return self;
};

module.exports = Event;
