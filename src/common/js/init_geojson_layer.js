    var on_each_feature = require("./oneachfeature.js");
    var getJson = require("./getjson.js");


    module.exports = function(cMap) {

        function onEachFeature(feature, layer) {
            on_each_feature(feature, layer, cMap);
        }


        //initialize geojsonLayer
        cMap.geojsonLayer = L.geoJson.ajax("", {
            loading: function() {
                cMap.map.spin(true);
            },
            middleware: function(data) {
                getJson(data, cMap);
            },
            onEachFeature: onEachFeature
        });


    }