//calling this function means its time to refilter colorschemes based on classification scheme and number of classes
module.exports = function(cMap) {


    $('.allradio').show();

    if (cMap.params.cl == 5) {
        $('.c7').hide();
        $('.c8').hide();
        $('.c9').hide();
        $('.c11').hide();
    }
    if (cMap.params.cl == 7) {
        $('.c5').hide();
        $('.c8').hide();
        $('.c9').hide();
        $('.c11').hide();
    }
    if (cMap.params.cl == 8) {
        $('.c5').hide();
        $('.c7').hide();
        $('.c9').hide();
        $('.c11').hide();
    }
    if (cMap.params.cl == 9) {
        $('.c5').hide();
        $('.c7').hide();
        $('.c8').hide();
        $('.c11').hide();
    }
    if (cMap.params.cl == 11) {
        $('.c5').hide();
        $('.c7').hide();
        $('.c8').hide();
        $('.c9').hide();
    }

    if (cMap.params.sn === "jenks") {
        $('.quantile').hide();
    }
    if (cMap.params.sn === "quantile" || cMap.params.sn === "stddev") {
        $('.jenks').hide();
    }


}