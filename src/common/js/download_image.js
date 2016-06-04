var parseQueryString = require("./parse_query_string.js");

module.exports = function(cMap, pictype){
  
  

        var newobj = {},
            tempp;

        newobj.type = pictype;
        newobj.outname = makeid(); //output file name  ... makeid() is function creates random 5 letter filename	  


        tempp = parseQueryString();

        newobj.lat = tempp.lat;
        newobj.lng = tempp.lng;
        newobj.z = tempp.z;
        newobj.s = tempp.s;
        newobj.v = tempp.v;
        newobj.sn = tempp.sn;
        newobj.cs = tempp.cs;
        newobj.cl = tempp.cl;

        if (tempp.csel !== undefined) {
            newobj.csel = tempp.csel;
        }

        if (tempp.ch !== undefined) {
            newobj.ch = tempp.ch;
        }
        if (tempp.dt !== undefined) {
            newobj.dt = tempp.dt;
        }
        if (tempp.rc !== undefined) {
            newobj.rc = tempp.rc;
        }

        if (tempp.tr !== undefined) {
            newobj.tr = tempp.tr;
        }
        if (tempp.d !== undefined) {
            newobj.d = tempp.d;
        }
        if (tempp.bm !== undefined) {
            newobj.bm = tempp.bm;
        }

        cMap.map.spin(true);

        //see below... the progress bar is not based on anything having to do with real progress... just time
        setTimeout(function() {
            console.log('5 seconds');
            $("#progressbar").css('width', '20%').stop();
            $("#progressbar").html('20%');
        }, 5000);

        setTimeout(function() {
            $("#progressbar").css('width', '40%').stop();
            $("#progressbar").html('40%');
            console.log('10 seconds');
        }, 10000);

        setTimeout(function() {
            $("#progressbar").css('width', '60%').stop();
            $("#progressbar").html('60%');
            console.log('15 seconds');
        }, 15000);

        setTimeout(function() {
            $("#progressbar").css('width', '80%').stop();
            $("#progressbar").html('80%');
            console.log('20 seconds');
        }, 20000);

        setTimeout(function() {
            cMap.map.spin(false);
            $("#progressbar").css('width', '100%').stop();
            $("#progressbar").html('100%');
            console.log('25 seconds');
        }, 25000);


        $.get("do.php", newobj, function() {
            console.log("https://" + window.location.hostname + "/CensusAPI_Map/dump/" + newobj.outname + "." + pictype);
            window.open("https://" + window.location.hostname + "/CensusAPI_Map/dump/" + newobj.outname + "." + pictype);
        });

  
    //creates a random alphanumeric string for use in uniquely naming exported map
    function makeid() {

        var text = "",
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            i;

        for (i = 0; i < 5; i = i + 1) {
            text = text + possible.charAt(Math.floor(Math.random() * possible.length));
        }


        return text;
    }
  
}