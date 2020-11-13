module.exports = function(cMap) {

    //define labels layer
    var mblabels = L.mapbox.tileLayer('statecodemog.798453f5', {
        'clickable': 'false',
        'zIndex': 1000
    });


    //create map sandwich
    var topPane = cMap.map._createPane('leaflet-top-pane', cMap.map.getPanes().mapPane);
    var topLayer = mblabels.addTo(cMap.map);
    topPane.appendChild(topLayer.getContainer());


    var baseLayers = {
        "Mapbox: Contrast": cMap.mbsat,
        "ESRI Streets": cMap.mbstyle
    };

    //in the future ill figure out how to toggle labels on and off (and still have it appear on top)
    var groupedOverlays = {
        //  "Labels and Borders": mblabels
    };

    //add layer control
    L.control.layers(baseLayers, groupedOverlays, {
        'autoZIndex': false
    }).addTo(cMap.map);

}