//clear selection button in table modal

module.exports = function(cMap, addRows, redrawTable) {


    cMap.dataset = [];
    redrawTable(cMap, addRows);

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