/*
 * TravelingSalesmanUtils
 *
 * Description: Util functions
 *
 */
var TravelingSalesmanUtils = {
    // distance between two 3d points
    distance: function(x1, y1, z1, x2, y2, z2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    }
};

module.exports = TravelingSalesmanUtils;