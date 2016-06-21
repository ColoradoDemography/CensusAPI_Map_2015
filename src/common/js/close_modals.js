    var updatequerysearchstring = require("./update_query_string.js");

    module.exports = function(cMap) {

        //updatequerysearchstring after close rclick and chart modals
        $('.cclose').click(function() {
            cMap.params.ga = '';
            cMap.params.gn = 0;
            setTimeout(function() {
                updatequerysearchstring(cMap);
            }, 1000);
        });

    }