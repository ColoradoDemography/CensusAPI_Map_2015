 var changeall = require("./changeall.js");

 module.exports = function(cMap) {

     require("./init_geojson_layer.js")(cMap);
     require("./transparency_slider.js")(cMap);
     require("./init_geo_settings.js")(cMap);
     require("./close_modals.js")(cMap);
     require("./reg_basemap_chg.js")(cMap);
     require("./advanced_search.js")(cMap);
     require("./classification.js")(cMap);
     require("./ops_data_table.js")(cMap);
     require("./moe_button.js")(cMap);
     require("./selection_mouseover.js")(cMap);
     require("./easy_buttons.js")(cMap);
     require("./map_move")(cMap);
     require("./demo_mode")(cMap);
     require("./print_mode.js")(cMap.params.print);
     require("./populate.js")(cMap); //populate the modal from datatree
     require("./populate_acsdb.js")(cMap); //populate acs database choices
     require("./drawcolorschemes.js")(cMap); //populate symbology portion of advanced dialog

     require("./change_options")(cMap);


     cMap.legend.addTo(cMap.map);

     changeall(cMap, 'yes', '0'); //draw 


     //TODO: back button is broken for jquery history plugin
     History.Adapter.bind(window, 'statechange', function() {
         // Note: We are using statechange instead of popstate
         // var State = History.getState(); // Note: We are using History.getState() instead of event.state
         // console.log(State);  window.location=State.url;
     });

 }