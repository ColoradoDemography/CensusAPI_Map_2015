var charttree = require("./charttree.js");
var chartmaker = require("./chartmaker.js");
var updatequerysearchstring = require("./update_query_string.js");


module.exports = function(e, cMap) {


    var i, j, fp = e.target.feature.properties,
        companiontable = '',
        companionindex, m, valdata = [],
        moedata = [],
        labelset = [],
        temparray = [];

    //var newobj = {};

    cMap.params.ga = fp.geoname;
    cMap.params.gn = fp.geonum;


    function assigndata(data) {

        data = data[0];

        function parsephp(c) {
            //upon successfull return from chart data gathering, create chart

            c = c[0];
            //convert all values in return object to number
            for (var key in c) {
                c[key] = Number(c[key]);
            }

            for (i = 0; i < charttree.data[companionindex].Data.length; i = i + 1) {
                labelset.push(charttree.data[companionindex].Data[i].FieldName);
                valdata.push(eval(charttree.data[companionindex].Data[i].Formula));
                moedata.push(eval(charttree.data[companionindex].Data[i].MoeFormula));
            }

            chartmaker(valdata, labelset, moedata, charttree.data[companionindex].ChartAlias + ": " + fp.geoname);

            setTimeout(function() {
                updatequerysearchstring(cMap);
            }, 1000);

        } //end parsephp



        m = data;

        //convert all values in return object to number
        for (var key in m) {
            m[key] = Number(m[key]);
        }

        //regular data
        $.ajax({
            type: "GET",
            url: "https://gis.dola.colorado.gov/cmap/simple?db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + companiontable + "&geonum=" + fp.geonum,
            dataType: 'json',
            success: parsephp
        });



    } //end assigndata()




    //find companion table
    for (i = 0; i < charttree.data.length; i = i + 1) {

        temparray = (charttree.data[i].ActualTable).split(","); //Actual Table can have multiple values separated by a comma.  This will turn that into an array.

        for (j = 0; j < temparray.length; j = j + 1) { //loop through array of values created above

            if (temparray[j] === cMap.table) {
                companionindex = i;
                companiontable = charttree.data[i].ChartTable;

                //only do the chart thing if there is an entry in charttree
                $("#rclickModal").modal("show");

                //moe data
                $.ajax({
                    type: "GET",
                    url: "https://gis.dola.colorado.gov/cmap/simple?db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + companiontable + "_moe&geonum=" + fp.geonum,
                    dataType: 'json',
                    success: assigndata
                });



            } //end if temparray

        } //end for j


    } //end for i



}