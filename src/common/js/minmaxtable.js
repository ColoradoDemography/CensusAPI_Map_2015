var updatequerysearchstring = require("./update_query_string.js");

module.exports = function(cMap) {
    //min or max table - from button

    //check the top attribute of the closebtn to figure if table needs to be minimized or maximized
    var btnstate = $('#closebtn').css('top');

    if (btnstate === '3px') {
        $('#resizediv').css('max-height', '100%');
        $('#resizediv').css('height', '100%');
        $('#resizediv').css('padding-top', '50px');
        $('#closebtn').css('top', '53px');
        $('#minmaxbtn').css('top', '53px');
        $("#minmaxbtn2").removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign"); //change icon
    } else {
        $('#resizediv').css('max-height', '40%');
        $('#resizediv').css('height', 'auto');
        $('#resizediv').css('padding-top', '0px');
        $('#closebtn').css('top', '3px');
        $('#minmaxbtn').css('top', '3px');
        $("#minmaxbtn2").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign"); //change icon
    }

    updatequerysearchstring(cMap);

}