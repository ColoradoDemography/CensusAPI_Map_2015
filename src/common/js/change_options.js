var updatequerysearchstring = require("./update_query_string.js");
var changeall = require("./changeall.js");
var filtercolorschemes = require("./filter_color_schemes.js");



module.exports = function(cMap) {
    //START ALL FUNCTIONS- DO THEY NEED TO BE WITHIN DOCUMENT READY?

    //change data theme
    $('input[name=optionsRadios]:radio').change(function() {
        cMap.params.v = this.value;
        updatequerysearchstring(cMap);
        cMap.createnewtable = 0;
        changeall(cMap, 'yes', '1');
    });

    //change colorscheme
    $('input[name=schemeRadios]:radio').change(function() {
        cMap.params.cs = this.value;
        updatequerysearchstring(cMap);
        changeall(cMap, 'no', '0');
    });

    //change geo //change advanced dialog text, change minZoom level
    $('input[name=geoRadios]:radio').change(function() {

        cMap.params.s = $('input:radio[name ="geoRadios"]:checked').val();

        if (cMap.params.s === '50') {
            cMap.map.options.minZoom = 4;
            $('#advgeo').text('counties');
        }
        if (cMap.params.s === '40') {
            cMap.map.options.minZoom = 4;
            $('#advgeo').text('states');
        }
        if (cMap.params.s === '140') {
            cMap.map.options.minZoom = 9;
            $('#advgeo').text('tracts');
        }
        if (cMap.params.s === '150') {
            cMap.map.options.minZoom = 9;
            $('#advgeo').text('block groups');
        }
        if (cMap.params.s === '160') {
            cMap.map.options.minZoom = 9;
            $('#advgeo').text('places');
        }


        updatequerysearchstring(cMap);
        changeall(cMap, 'yes', '0');
    });



    //change in classes dropdown
    $('#classes').change(function() {
        cMap.params.cl = parseInt(this.value, 10);
        updatequerysearchstring(cMap);
        filtercolorschemes(cMap);
    });



}