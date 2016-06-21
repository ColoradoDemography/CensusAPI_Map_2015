    "use strict";

    //cMap holds all global values
    var cMap = require("./initialize_cMap.js")();

    //Bootleaf Template Setup
    require("./setup_bootleaf.js")();

    //Leaflet Controls
    require("./attribution_control.js")(cMap);
    require("./geocode_control.js")(cMap);
    require("./zoom_control.js")(cMap);
    require("./locate_control.js")(cMap);
    require("./fullscreen_control.js")(cMap);
    require("./layer_control.js")(cMap);

    var setup = require("./setup.js");


    $(document).ready(function() {

        cMap.legend = require("./legend_control")(cMap);

        setup(cMap);

    });