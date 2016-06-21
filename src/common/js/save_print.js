module.exports = function(cMap) {

    $('#printbtn').click(function() {
        //export  map function called from button.  Needs work.  No notice when fails.
        require("./download_image.js")(cMap, 'png');
    });

    $('#resetslider').click(function() {
        $("#progressbar").css('width', '0%').stop();
        $("#progressbar").html('0%');
    });

}