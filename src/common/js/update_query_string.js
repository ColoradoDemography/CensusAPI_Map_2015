var LZString = require("../../lib/js/lz-string.js");

//after a major map action, the query search string (address) is updated with the new state of the application
module.exports = function(cMap) {



    var dstring, compressed, btnstate, urlstr, newurl, ga, gn, bm, csel, cmo;

    var ch = ''; //chart
    var tr = ''; //transparency
    //var rc = ''; //right click chart
    var s = '&s=' + cMap.params.s; //sumlev
    var v = '&v=' + cMap.params.v; //varcode
    var sn = '&sn=' + cMap.params.sn; //schemename: jenks quantile stddev
    var cs = '&cs=' + cMap.params.cs; //colorscheme
    var cl = '&cl=' + cMap.params.cl; //number of classes
    var dt = ''; //
    var d = '';
    var moe = '';
    if (cMap.params.ga !== '') {
        ga = '&ga=' + cMap.params.ga;
    } else {
        ga = '';
    } //last right click feature
    if (cMap.params.gn !== 0) {
        gn = '&gn=' + cMap.params.gn;
    } else {
        gn = '';
    }
    if (cMap.params.bm !== 'cb') {
        bm = '&bm=' + cMap.params.bm;
    } else {
        bm = '';
    } //basemap

    if (cMap.params.csel !== 'red') {
        csel = '&csel=' + cMap.params.csel;
    } else {
        csel = '';
    } //selected geography color
    if (cMap.params.cmo !== 'rgb(128,0,127)') {
        cmo = '&cmo=' + cMap.params.cmo;
    } else {
        cmo = '';
    } //mouseover geography color

    //get list of selected geographies (d) - store them in global variable (dataset)
    if (cMap.params.d !== undefined) {
        cMap.dataset = LZString.decompressFromEncodedURIComponent(cMap.params.d).split(',');
    }

    //takes array of selected geographies.  converts to string.  compress string to URI hash
    if (cMap.dataset.length !== 0) {
        dstring = cMap.dataset.join();
        compressed = LZString.compressToEncodedURIComponent(dstring);
        d = '&d=' + compressed;
    }

    if ($('#resizediv').is(':visible')) {
        btnstate = $('#closebtn').css('top');
        if (btnstate === '3px') {
            dt = '&dt=yes';
        } else {
            dt = '&dt=max';
        }
    }

    if (!$("[name='my-checkbox']").is(':checked')) {
        moe = '&moe=no';
    }

    //only adding these to URL string if they differ from the defaults
    if ($('#chartModal').hasClass('in')) {
        ch = "&ch=yes";
    }

    //only adding these to URL string if they differ from the defaults
    if ($('#rclickModal').hasClass('in')) {
        ch = "&rc=yes";
    }

    //default transparency is 0.5, anything else and it is added to URL string
    if (cMap.feature.fillOpacity !== 0.5) {
        tr = "&tr=" + cMap.feature.fillOpacity;
    }


    //create a URL string with all variables not at a default value
    urlstr = '?' + 'lat=' + cMap.map.getCenter().lat + '&lng=' + cMap.map.getCenter().lng + '&z=' + cMap.map.getZoom() + ch + tr + s + v + sn + cs + cl + dt + ga + gn + bm + moe + csel + cmo + d;
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + urlstr;
    //make browser remember for back button compatibility
    History.pushState({
        path: newurl
    }, '', newurl);


}