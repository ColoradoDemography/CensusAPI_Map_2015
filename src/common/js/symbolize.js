var redrawTable = require("./redraw_table.js");

//symbolize everything right here!!!  Every geography feature in the view is iterated over
module.exports = function(feature, cMap) {



    var fp = feature.properties;
    var mapvar = eval(cMap.formula);

    var geonum = fp.geonum;
    var newlinecolor = cMap.feature.linecolor;
    var newlineweight, newlineopacity, newlinecap, getreverse, i, j;


    //mapvar: the actual computed value of the theme variable
    //geonum: the id of the geography
    //newlinecolor: get default lincolor, lineweight, and lineopacity values

    //cMap.createnewtable is the flag to redraw the data table.  Set to 0 means redraw, set to 1 means don't redraw
    if (cMap.createnewtable === 0) {
        redrawTable(cMap);
    }
    cMap.createnewtable = 1;


    if (cMap.params.s === '40') {
        cMap.feature.lineweight = 0;
    }
    if (cMap.params.s === '50') {
        cMap.feature.lineweight = 0;
    }
    if (cMap.params.s === '140') {
        cMap.feature.lineweight = 1;
    }
    if (cMap.params.s === '150') {
        cMap.feature.lineweight = 1;
    }
    if (cMap.params.s === '160') {
        cMap.feature.lineweight = 1;
    }

    newlineweight = cMap.feature.lineweight;
    newlineopacity = cMap.feature.lineopacity;
    newlinecap = 'round';

    //here's the wrinkle - we dont really care about the linecap property.  However, we need a way to differentiate between a selected features properties, and a non-selected features properties.  We cant just go by color=red, because when you mouseover a selected geography, the color will no longer be red.  So we  set the linecap property to either 'butt' (selected) or 'round' - or anything else (not selected)

    //when drawing feature, if in selected set, override default linecolor and lineweight with selected values 'red'
    for (i = 0; i < cMap.dataset.length; i = i + 1) {
        if (cMap.dataset[i] === geonum) {
            newlinecolor = cMap.params.csel;
            newlineweight = 2;
            newlineopacity = 1;
            newlinecap = 'butt';
        }
    }

    //if the mapvariable = 0 for a paricular variable, and the usezeroasnull flag is set, symbolize the geography with the null symbology
    if (mapvar === 0 && cMap.usezeroasnull === 'yes') {
        return {
            fillColor: cMap.ifzerojson,
            color: newlinecolor,
            weight: newlineweight,
            opacity: newlineopacity,
            fillOpacity: cMap.feature.fillOpacity,
            linecap: newlinecap
        };
    }

    //trickiness with 0==false;  if the mapvariable is equal to null (but not zero), symbolize the geography with the null symbology
    if (!mapvar && mapvar !== 0) {
        return {
            fillColor: cMap.ifnulljson,
            color: newlinecolor,
            weight: newlineweight,
            opacity: newlineopacity,
            fillOpacity: cMap.feature.fillOpacity,
            linecap: newlinecap
        };
    }

    //get number of colors in color ramp
    getreverse = cMap.symbolcolors.length;

    //loop through color set
    for (j = 0; j < getreverse; j = j + 1) {
        //loop through breaks; symbolize features accordingly
        if (mapvar >= cMap.breaks[j]) {

            return {
                fillColor: cMap.symbolcolors[(getreverse - 1) - j],
                color: newlinecolor,
                weight: newlineweight,
                opacity: newlineopacity,
                fillOpacity: cMap.feature.fillOpacity,
                linecap: newlinecap
            };
        }
    }

}