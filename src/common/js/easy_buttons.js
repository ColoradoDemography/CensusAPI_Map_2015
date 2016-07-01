var clearsel = require("./clearsel.js");
var updatequerysearchstring = require("./update_query_string.js");
var addchart = require("./addchart.js");



module.exports = function(cMap) {

    //Create Easy Buttons (Top-Left)


    //Dont Bother creating easy buttons if in print mode

    if (cMap.params.print !== "yes") {



        //theme modal & button
        $('#homeModal').modal({
            show: false
        });
        L.easyButton('fa fa-bars fa-lg', function() {
            $('#homeModal').modal('toggle');
        }, 'Change Data Theme').addTo(cMap.map);




        //geo modal & button
        $('#geoModal').modal({
            show: false
        });
        L.easyButton('fa fa-compass fa-lg', function() {
            $('#geoModal').modal('toggle');
        }, 'Change Geography Level').addTo(cMap.map);




        //table button
        L.easyButton('fa fa-table fa-lg', function() {
            $('#resizediv').toggle();
            updatequerysearchstring(cMap);
        }, 'View Table').addTo(cMap.map);




        //chart modal & button
        $('#chartModal').modal({
            show: false
        });
        L.easyButton('fa fa-line-chart fa-lg', function() {
            $('#chartModal').modal('toggle');
            $('#chartdiv').empty();
            addchart(cMap);
            setTimeout(function() {
                updatequerysearchstring(cMap);
            }, 1000);
        }, 'View Chart').addTo(cMap.map);



        //print button
        L.easyButton('fa fa-floppy-o fa-lg', function() {
            cMap.map.spin(true);

            var downloadhref = window.location.href;
            downloadhref = encodeURIComponent(downloadhref + "&print=yes");
            var link = document.createElement('a');

            link.href = 'https://gis.dola.colorado.gov/phantom/screenshot?website=' + downloadhref + '&filename=acsmap&timer=6000';
            document.body.appendChild(link);
            link.click();
            setTimeout(function() {
                cMap.map.spin(false);
            }, 9000); //overshoot 6 sec timer

        }, 'Print Map').addTo(cMap.map);



        //clear selected (eraser) button
        L.easyButton('fa fa-eraser fa-lg', function() {
            clearsel(cMap);
            updatequerysearchstring(cMap);
        }, 'Clear Selection').addTo(cMap.map);



    }


}