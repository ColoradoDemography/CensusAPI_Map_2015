var tabletree = require("./tableflavor.js");
var addRows = require("./add_rows.js");

//change table flavor
module.exports = function(cMap) {


    cMap.tblfl = $('#tableoption').val();

    if (cMap.tblfl === '-1') {
        cMap.favtable = "Plain";
    } else {
        cMap.favtable = tabletree.data[cMap.tblfl].TableAlias;
    }

    cMap.stopafterheader = 0;
    var geonums = '';

    //turn dataset into a comma delimited string and call it geoids
    geonums = cMap.dataset.join(",");

    $('#tablebody').empty();
    $('#tableheader').empty();
    $('#tablefooter').empty();

    //ajax call to load selected features

    if (cMap.dataset.length === 0) {
        cMap.stopafterheader = 1;
        geonums = '108079';
    } //if nothing selected, we still need to query database to get header info.  We give the query a dummy goenum to chew on.  It won't add that row due to the stopafterhearder variable.


    $.ajax({
        type: "POST",
        url: "https://gis.dola.colorado.gov/cmap/demogpost",
        data: "db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + cMap.table + "&geonum=" + geonums + "&moe=yes",
        dataType: 'json',
        success: function(data) {
            addRows(data, cMap);
        }
    });



}