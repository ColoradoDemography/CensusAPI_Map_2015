    var updatequerysearchstring = require("./update_query_string.js");
    var chgtblfl = require("./change_table_flavor.js");
    var symbolize = require("./symbolize.js");
    var mintable = require("./mintable.js");
    var minmaxtable = require("./minmaxtable.js");
    var getCSVData = require("./getcsvdata.js");

    module.exports = function(cMap) {


        //when doubleclicking on row, remove item from selection (and table)
        $(document).on('dblclick', 'tr', function() {
            var classname, i;

            classname = this.className;
            for (i = 0; i < cMap.dataset.length; i = i + 1) {

                if (Number(cMap.dataset[i]) === Number(classname)) {
                    cMap.dataset.splice(i, 1);
                }
            }
            $('.' + classname).remove();
            //recalc footer
            // writeFooter();  //do add this back in later
            updatequerysearchstring(cMap);
            //change color back to black //insane
            cMap.geojsonLayer.setStyle(function(feature) {
                return symbolize(feature, cMap);
            });

        });

        //looks for table dropdown change - changes table flavor
        $('#tableoption').on('change', function() {
            chgtblfl(cMap);
            updatequerysearchstring(cMap);
        });

        //initialize stupid table plugin on our data table
        $("#table").stupidtable();


        $('#mintableclick').click(function() {
            mintable(cMap);
        });

        $('#minmaxclick').click(function() {
            minmaxtable(cMap);
        });

        $('#getcsvdata').click(function() {
            getCSVData();
        });

    }