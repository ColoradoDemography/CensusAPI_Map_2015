    var updatequerysearchstring = require("./update_query_string.js");
    var symbolize = require("./symbolize.js");

    module.exports = function(cMap) {

        $('#cselected').change(function() {

            //change selection color
            cMap.params.csel = this.value;
            updatequerysearchstring(cMap);

            //change all previously selected elements
            cMap.geojsonLayer.setStyle(function(feature) {
                return symbolize(feature, cMap);
            });
        });

        $('#cmouseover').change(function() {
            cMap.params.cmo = this.value;
            updatequerysearchstring(cMap);
        });

        $("#cselected").val(cMap.params.csel).change();

        $("#cmouseover").val(cMap.params.cmo).change();



    }