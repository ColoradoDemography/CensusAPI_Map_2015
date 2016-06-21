var updatequerysearchstring = require("./update_query_string.js");
var symbolize = require("./symbolize.js");

//function selects all matching geographies, highlights them, puts them into/draws table

module.exports = function(cMap, data) {

    var i;

    cMap.dataset = []; //clear existing selection (may want to think about option to add to existing selection set)
    for (i = 0; i < data.length; i = i + 1) {
        cMap.dataset.push(data[i]); //add each new geonum into dataset[]
    }

    cMap.createnewtable = 0; //set flag to redraw table - which will be called in the styling function

    cMap.geojsonLayer.setStyle(function(feature) {
        return symbolize(feature, cMap);
    }); //restyle entire layer (restyle function includes highlighting selected features)

    updatequerysearchstring(cMap);

}