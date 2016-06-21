    var updatequerysearchstring = require("./update_query_string.js");

    module.exports = function(cMap) {

        $('.leaflet-control-layers-selector').change(function() {

            var temptext = $(this).next().text();

            if (temptext === ' Mapbox: Contrast Base') {
                cMap.params.bm = 'cb';
            }
            if (temptext === ' Mapbox: Satellite') {
                cMap.params.bm = 'sat';
            }

            updatequerysearchstring(cMap);

        });

    }