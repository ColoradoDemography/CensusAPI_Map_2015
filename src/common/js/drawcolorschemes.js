var colortree = require("./colortree.js");
var updatequerysearchstring = require("./update_query_string.js");
var filtercolorschemes = require("./filter_color_schemes.js");


module.exports = function(cMap) {


    var i, j, cclasses, prefix, pt1, pt2, appendstring;

    $('#colorschemes').html('');

    //populate colorschemes
    for (i = 0; i < colortree.colorschemes.length; i = i + 1) {

        cclasses = colortree.colorschemes[i].count; //check for correct number of classes
        prefix = colortree.colorschemes[i].schemename.substring(0, 2);

        //classes to be added
        pt1 = "";
        pt2 = "";

        if (prefix === 'mh') {
            pt1 = "jenks";
        }
        if (prefix === 'sh') {
            pt1 = "jenks";
        }
        if (prefix === 'ds') {
            pt1 = "quantile";
        }

        if (cclasses === 5) {
            pt2 = "c5";
        }
        if (cclasses === 7) {
            pt2 = "c7";
        }
        if (cclasses === 8) {
            pt2 = "c8";
        }
        if (cclasses === 9) {
            pt2 = "c9";
        }
        if (cclasses === 11) {
            pt2 = "c11";
        }


        appendstring = '<label class="allradio radio-inline ' + pt1 + ' ' + pt2 + '"><input id="' + colortree.colorschemes[i].schemename + cclasses + '" type="radio" name="schemeRadios" class="allradio form-control ' + pt1 + ' ' + pt2 + '" value="' + colortree.colorschemes[i].schemename + '">';

        for (j = 0; j < colortree.colorschemes[i].count; j = j + 1) {
            appendstring = appendstring + '<span style="background-color:' + colortree.colorschemes[i].colors[j] + ';">&nbsp;&nbsp;</span>';
        }

        appendstring = appendstring + '</label>';

        //add all colorscheme dom elements to dialog
        $('#colorschemes').append(appendstring);

    }

    filtercolorschemes(cMap);

    //if colorscheme info is in querystring, use it.  otherwise, use default
    $('#' + cMap.params.cs + cMap.params.cl).prop('checked', true);
    updatequerysearchstring(cMap);




}