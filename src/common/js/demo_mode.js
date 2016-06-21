var demodata = require("./demodata.js");
var changeall = require("./changeall.js");
var updatequerysearchstring = require("./update_query_string.js");


module.exports = function(cMap) {

    //demo intervals
    var r_interval;
    var s_interval;

    //demo mode
    if (cMap.params.demo === 'yes') {



        var loopcount = 0;
        console.log('demo');


        r_interval = setInterval(function() {
            changedemo();
        }, 12000);
        s_interval = setInterval(function() {
            changesettings();
        }, 6000);

    }


    function changedemo() {
        loopcount = loopcount + 1;

        var rnd = Math.floor((Math.random() * demodata.length) + 1);
        cMap.map.panTo(L.latLng(demodata[rnd].lat, demodata[rnd].lon));

    }

    function changesettings() {

        if (cMap.params.tr !== .5) {
            cMap.map.removeLayer(cMap.mbsat);
            cMap.map.addLayer(cMap.mbstyle);
            cMap.params.bm = 'cb';
            cMap.params.tr = .5;
            cMap.feature.fillOpacity = .5;
            cMap.trslider.slider('setValue', 50);
            cMap.geojsonLayer.setStyle({
                fillOpacity: cMap.feature.fillOpacity
            });



            if (loopcount == 40) {
                $('input[name="optionsRadios"][value="rented"]').prop('checked', true);
                cMap.params.v = 'rented';
                changeall(cMap, 'yes', '1');
            }

            if (loopcount == 80) {
                $('input[name="optionsRadios"][value="myb"]').prop('checked', true);
                cMap.params.v = 'myb';
                changeall(cMap, 'yes', '1');
            }

            if (loopcount == 120) {
                $('input[name="optionsRadios"][value="inpoverty"]').prop('checked', true);
                cMap.params.v = 'inpoverty';
                changeall(cMap, 'yes', '1');
            }

            if (loopcount == 160) {
                $('input[name="optionsRadios"][value="mhv"]').prop('checked', true);
                cMap.params.v = 'mhv';
                changeall(cMap, 'yes', '1');
            }

            if (loopcount == 200) {
                $('input[name="optionsRadios"][value="bachlhghr"]').prop('checked', true);
                cMap.params.v = 'bachlhghr';
                changeall(cMap, 'yes', '1');
            }

            if (loopcount == 240) {
                $('input[name="optionsRadios"][value="mhi"]').prop('checked', true);
                cMap.params.v = 'mhi';
                changeall(cMap, 'yes', '1');
            }

            if (loopcount == 280) {
                clearInterval(r_interval);
                clearInterval(s_interval);

            }

            updatequerysearchstring(cMap);
        } else {
            cMap.map.removeLayer(cMap.mbstyle);
            cMap.map.addLayer(cMap.mbsat);
            cMap.params.bm = "sat";
            cMap.params.tr = 0;
            cMap.feature.fillOpacity = 0;
            cMap.trslider.slider('setValue', 0);
            cMap.geojsonLayer.setStyle({
                fillOpacity: cMap.feature.fillOpacity
            });

            //cMap.legend.addTo(cMap.map);
            updatequerysearchstring(cMap);
        }


    }


}