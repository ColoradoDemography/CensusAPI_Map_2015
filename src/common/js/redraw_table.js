var tabletree = require("./tableflavor.js");
var addRows = require("./add_rows.js");



module.exports = function(cMap) {


    var str = '',
        parsehtml, seltext = '',
        geonums, i;

    if (cMap.tblfl === '-1') {
        seltext = 'selected';
    } else {
        seltext = '';
    }

    $('#tableoption').empty();
    $('#tableoption').append($.parseHTML("<option value='-1' " + seltext + ">Plain Table</option>"));

    //get table id, search for table id in tabletree (tableflavor.js) to populate select box 'tableoption'

    for (i = 0; i < tabletree.data.length; i = i + 1) {

        //setting value=array index for tabletree
        if (tabletree.data[i].ActualTable === cMap.table) {
            if (tabletree.data[i].TableAlias === cMap.favtable) {
                cMap.tblfl = String(i);
            }
            if (String(i) === cMap.tblfl) {
                seltext = 'selected';
            } else {
                seltext = '';
            }
            str = "<option value='" + i + "' " + seltext + ">" + tabletree.data[i].TableAlias + "</option>";
            parsehtml = $.parseHTML(str);
            $('#tableoption').append(parsehtml);
        }
    }

    cMap.stopafterheader = 0;
    geonums = '';


    //turn dataset into a comma delimited string and call it geoids
    geonums = cMap.dataset.join(",");


    $('#tablebody').empty();
    $('#tableheader').empty();
    $('#tablefooter').empty();
    $('#tablefooter').hide();
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