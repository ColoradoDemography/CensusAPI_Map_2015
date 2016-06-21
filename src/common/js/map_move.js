var updatequerysearchstring = require("./update_query_string.js");
var ajaxcall = require("./ajaxcall.js");


module.exports = function(cMap) {

    //keep track of time.  when stopped moving for two seconds, redraw
    cMap.map.on('movestart', function() {
        var d = new Date();
        cMap.globalbusy = d.getTime();
    });

    cMap.map.on('moveend', function() {

        updatequerysearchstring(cMap);

        var d = new Date();
        cMap.globalbusy = d.getTime();


        setTimeout(function() {
            var e, curtime, c, clat, clng;

            e = new Date();
            curtime = e.getTime();
            if (curtime >= (cMap.globalbusy + 1000)) {

                //get center of map point
                c = cMap.map.getCenter();
                clat = c.lat;
                clng = c.lng;

                //if center point is still within the current map bounds, then dont do anything.  otherwise, run query again
                if (clat < cMap.coord.nelat && clat > cMap.coord.swlat && clng < cMap.coord.nelng && clng > cMap.coord.swlng) {

                    if (cMap.map.getZoom() !== cMap.lastzoom) {
                        ajaxcall(cMap);
                    }

                } else {
                    ajaxcall(cMap);
                }



            }
        }, 1000);


    }); // end 'on moveend'

    cMap.map.on('zoomstart', function() {
        var d = new Date();
        cMap.globalbusy = d.getTime();
    });

    //when map is zoomed in or out
    cMap.map.on('zoomend', function() {
        var d, e, curtime, curzoom;

        updatequerysearchstring(cMap);

        d = new Date();
        cMap.globalbusy = d.getTime();

        setTimeout(function() {
            e = new Date();
            curtime = e.getTime();

            if (curtime >= (cMap.globalbusy + 1000)) {

                if (cMap.map.getZoom() !== cMap.lastzoom) {
                    ajaxcall(cMap);
                }

            }
        }, 1000);

        //grey radio buttons for geography levels if zoomed out too far
        curzoom = cMap.map.getZoom();
        if (curzoom < 9) {
            $("#rbplace").hide();
            $("#rbtract").hide();
            $("#rbbg").hide();
        } else {
            $("#rbplace").show();
            $("#rbtract").show();
            $("#rbbg").show();
        }
        //rbplace

    });





}