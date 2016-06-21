var redrawTable = require("./redraw_table.js");


//clear selection button in table modal

module.exports = function(cMap) {


    cMap.dataset = [];
    redrawTable(cMap);

    //change selected symbology back to unselected
    cMap.map.eachLayer(function(layer) {
        //console.log(layer.options);
        if (layer.options) {
            if (layer.options.color) {
                if (layer.options.linecap === 'butt') {
                    layer.setStyle({
                        weight: cMap.feature.lineweight,
                        color: cMap.feature.linecolor,
                        lineopacity: cMap.feature.lineopacity,
                        linecap: 'round'
                    });
                }
            }

        }
    });


}