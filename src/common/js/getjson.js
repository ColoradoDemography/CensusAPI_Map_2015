var symbolize = require("./symbolize.js");
var addchart = require("./addchart.js");
var updatequerysearchstring = require("./update_query_string.js");

var right_click = require("./right_click.js");



//after successfull ajax call, data is sent here
module.exports = function(data, cMap) {

    function rightclick(e) {
        right_click(e, cMap);
    } //end rightclick function



    $("#popup").remove();

    cMap.geojsonLayer.clearLayers(); //(mostly) eliminates double-draw (should be technically unneccessary if you look at the code of leaflet-ajax...but still seems to help)
    cMap.geojsonLayer.addData(data);

    cMap.geojsonLayer.setStyle(function(feature) {
        return symbolize(feature, cMap);
    });
    cMap.map.addLayer(cMap.geojsonLayer);
    cMap.map.spin(false);

    //OMG OMG, I Figured out how to bring selected features to the front
    cMap.map.eachLayer(function(layer) {
        if (layer.options) {
            if (layer.options.color) {
                if (layer.options.linecap === 'butt') {
                    //bring feature to front - unfortunately a bug in IE and Opera prevent this from being fully cross-browser
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                }
            }

        }
    });


    //if data table flag is set, then open data table to appropriate size on startup
    if (cMap.params.dt !== undefined) {

        if (cMap.params.dt === 'yes') {
            $('#resizediv').toggle();
        }

        if (cMap.params.dt === 'max') {
            $('#resizediv').toggle();
            $('#resizediv').css('max-height', '100%');
            $('#resizediv').css('height', '100%');
            $('#resizediv').css('padding-top', '50px');
            $('#closebtn').css('top', '53px');
            $('#minmaxbtn').css('top', '53px');
            $("#minmaxbtn2").removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
        }

        delete cMap.params.dt;
    }


    //if chart flag is set, then open chart on startup
    if (cMap.params.ch !== undefined) {

        if (cMap.params.ch === 'yes') {
            $('#chartModal').modal('toggle');
            $('#chartdiv').empty();
            addchart(cMap);
            setTimeout(function() {
                updatequerysearchstring(cMap);
            }, 1000);
        }

        delete cMap.params.ch;
    }


    //if right click chart flag is set, then open chart on startup to appropriate feature
    if (cMap.params.rc !== undefined) {

        if (cMap.params.rc === 'yes') {

            $('#rclickModal').modal('toggle');
            $('#rclick').empty();

            var e = {};
            e.target = {};
            e.target.feature = {};
            e.target.feature.properties = {};
            e.target.feature.properties.geonum = cMap.params.gn;
            e.target.feature.properties.geoname = cMap.params.ga;

            rightclick(e);
            setTimeout(function() {
                updatequerysearchstring(cMap);
            }, 1000);

        }

        delete cMap.params.rc;
    }




}