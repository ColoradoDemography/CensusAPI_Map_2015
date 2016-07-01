var figurechart = require("./figurechart.js");

//called from pressing chart button (only)
//the addchart() function gets data from the database, then funnels it to figurechart()
module.exports = function(cMap) {


    //take array of geonums and turn it into a comma delimited string
    var geonums = (cMap.dataset).join(",");

    $.ajax({
        type: "POST",
        url: "https://gis.dola.colorado.gov/cmap/chartpost",
        data: "db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + cMap.table + "&geonum=" + geonums + "&numerator=" + encodeURIComponent(cMap.numerator) + "&denominator=" + encodeURIComponent(cMap.denominator),
        dataType: 'json',
        success: function(JSONdata) {
            figurechart(cMap, JSONdata);
        }
    });


}