    var updatequerysearchstring = require("./update_query_string.js");

    module.exports = function(cMap) {

        //Initialize transparency slider
        cMap.trslider = $('#ex1').slider({
            formatter: function(value) {
                return value + '%';
            }
        });



        //if a transparency value is set in the querystring, change the slider to that value
        if (cMap.params.tr !== undefined) {
            cMap.feature.fillOpacity = cMap.params.tr;
            cMap.trslider.slider('setValue', parseInt((cMap.feature.fillOpacity * 100), 10));

            updatequerysearchstring(cMap);
        }

        //when user stops moving transparency slider, change transparency of geojson layer
        $("#ex1").on("slideStop", function(slideEvt) {
            //cMap.feature.lineopacity = slideEvt.value / 100; //transparency control as pct
            cMap.feature.fillOpacity = slideEvt.value / 100;

            //transparency needs to be reflected in the legend
            cMap.legend.removeFrom(cMap.map);
            cMap.geojsonLayer.setStyle({
                //opacity: cMap.feature.lineopacity,
                fillOpacity: cMap.feature.fillOpacity
            });
            cMap.legend.addTo(cMap.map);
            updatequerysearchstring(cMap);
        });




    }