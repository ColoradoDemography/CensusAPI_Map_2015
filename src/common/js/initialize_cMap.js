module.exports = function() {


    //access token for using mapbox services.  dont copy mine, use your own!
    L.mapbox.accessToken = 'pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg';

    var cMap = {};

    //the cMap params gets the initial startup parameters from the address bar
    cMap.params = require("./parse_query_string.js")();


    // mbstyle is a mapbox 'style' (that I created as part of the CO Demog Office Mapbox account).
    cMap.mbstyle = L.mapbox.tileLayer('statecodemog.aa380654', {
        'zIndex': 1
    });
    //mbsat is a mapbox 'project' (that I created as part of the CO Demog Office Mapbox account).
    cMap.mbsat = L.mapbox.tileLayer('statecodemog.km7i3g01');


    cMap.stopafterheader = 0; //?
    cMap.createnewtable = 0; //cMap.createnewtable is the flag to redraw the data table.  Set to 0 means redraw, set to 1 means don't redraw
    cMap.favtable = 'Median Household Income';

    cMap.globalbusy = 0;
    cMap.tblfl = '-1'; //tableflavor default to plain
    cMap.map = ''; //holds map object
    cMap.current_desc = ""; //name of the current census variable being mapped

    cMap.numerator = '';
    cMap.denominator = '';
    cMap.formula = '';
    cMap.moenumerator = '';
    cMap.moedenominator = '';
    cMap.moeformula = '';

    if (!cMap.params.s) {
        cMap.params.s = '50'
    } //summary level.  40 state 50 county 140 tract 150 block group 160 place

    cMap.limit = '10000'; //feature retrieval limit
    cMap.db = 'acs1014'; //the database to retrieve data from.  currently set to acs1014
    cMap.schema = 'data'; //the database schema that the data is located in.  more data on this is available at my CensusAPI_DB repository: https://github.com/royhobbstn/CensusAPI_DB
    cMap.table = 'b19013'; //actual ACS table data is being drawn from

    cMap.usezeroasnull = 'yes';
    cMap.breaks = [];

    if (!cMap.params.v) {
        cMap.params.v = 'mhi'
    } //the variable being mapped.  corresponds to 'varcode' in file datatree.js

    cMap.ifnulljson = {};
    cMap.ifzerojson = {};
    cMap.symbolcolors = [];

    cMap.type = "";
    cMap.mininc = 0;
    cMap.minval = 0;
    cMap.geojsonLayer = ''; //this will hold retrieved geojson from leafletajax library

    if (!cMap.params.csel) {
        cMap.params.csel = 'red'
    } //color of selected geography
    if (!cMap.params.cmo) {
        cMap.params.cmo = 'rgb(128,0,127)'
    } //color of mouseover geography

    //universal
    cMap.feature = {};
    cMap.feature.linecolor = "Gray";
    cMap.feature.lineweight = 0;
    cMap.feature.lineopacity = 0.2; //transparency control
    cMap.feature.fillOpacity = 0.5; //transparency control

    //symbology
    if (!cMap.params.cs) {
        cMap.params.cs = "mh1";
    } //colorscheme corresponds to a scheme as defined in file colortree.js
    if (!cMap.params.cl) {
        cMap.params.cl = 7;
    } else {
        cMap.params.cl = parseInt(cMap.params.cl, 10);
    } //number of classes should always be INT.  Starts off as String if from address bar text
    if (!cMap.params.sn) {
        cMap.params.sn = "jenks";
    } //schemename: either jenks, quantile, or standard deviation

    //data table ??empty??
    cMap.dataset = []; //selected geographies

    //map bounds the last time the data was loaded
    cMap.coord = {};
    cMap.coord.nelat = '';
    cMap.coord.nelng = '';
    cMap.coord.swlat = '';
    cMap.coord.swlng = '';

    cMap.lastzoom = 8;

    //??
    if (!cMap.params.ga) {
        cMap.params.ga = ''
    } else {
        cMap.params.ga = decodeURIComponent(cMap.params.ga);
    }
    if (!cMap.params.gn) {
        cMap.params.gn = 0
    }


    //if no basemap specified, set to default
    if (!cMap.params.bm) {
        cMap.params.bm = 'cb'
    }

    //function returns basemap (as layer in array)
    //default basemap is high contrast.  It is the default when cMap.params.bm===''.
    function setbasemap() {
        var initialbasemap = cMap.mbstyle;
        if (cMap.params.bm === 'sat') {
            initialbasemap = cMap.mbsat;
        }
        return [initialbasemap];
    }

    //initialize map with lat/lng from address bar string, or default at 39,-104.8
    cMap.map = L.map("map", {
        zoom: cMap.params.z || 9,
        center: [cMap.params.lat || 39, cMap.params.lng || -104.8],
        minZoom: 4,
        layers: setbasemap(),
        zoomControl: false,
        attributionControl: false
    });

    return cMap;

}