

module.exports = function(cMap, updatequerysearchstring, addchart, clearsel){
  
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
                updatequerysearchstring();
            }, 'View Table').addTo(cMap.map);

            //chart modal & button
            $('#chartModal').modal({
                show: false
            });
            L.easyButton('fa fa-line-chart fa-lg', function() {
                $('#chartModal').modal('toggle');
                $('#chartdiv').empty();
                addchart();
                setTimeout(function() {
                    updatequerysearchstring();
                }, 1000);
            }, 'View Chart').addTo(cMap.map);

            //print modal & button
            $('#dataModal').modal({
                show: false
            });
            L.easyButton('fa fa-floppy-o fa-lg', function() {
                $('#dataModal').modal('toggle');
            }, 'Print Map').addTo(cMap.map);

            //clear selected (eraser) button
            L.easyButton('fa fa-eraser fa-lg', function() {
                clearsel();
                updatequerysearchstring();
            }, 'Clear Selection').addTo(cMap.map);

        }

  
}