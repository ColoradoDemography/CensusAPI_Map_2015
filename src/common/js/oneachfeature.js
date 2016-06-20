

var mouseout_func = require("./mouseout.js");
var highlight_feature = require("./highlight_feature.js");
var feature_select = require("./feature_select.js");
var right_click = require("./right_click.js");

    var updatequerysearchstring = require("./update_query_string.js");



//every geojson feature will have a mouseover, mouseout, and click event.

module.exports = function(feature, layer, cMap){
 

function mouseout(e){
  mouseout_func(e,cMap);
}

    function highlightFeature(e) {
      highlight_feature(e, cMap);
    }

function featureSelect(e){
  feature_select(e,cMap, updatequerysearchstring);
}
  
      function rightclick(e) {
      right_click(e, cMap, updatequerysearchstring);
    } //end rightclick function

  
          layer.on({
            mouseover: highlightFeature,
            mouseout: mouseout,
            click: featureSelect,
            contextmenu: rightclick
        });
  
}