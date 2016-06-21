var updatequerysearchstring = require("./update_query_string.js");


//hide table - from button

module.exports = function(cMap) {

    $('#resizediv').hide();
    updatequerysearchstring(cMap);

}