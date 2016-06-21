var updatequerysearchstring = require("./update_query_string.js");
var filtercolorschemes = require("./filter_color_schemes.js");

module.exports = function(cMap) {


    $("#classification").val(cMap.params.sn).change();


    //change classification dropdown has been triggered
    $('#classification').change(function() {
        cMap.params.sn = this.value; //schemename variable is equal to the new selection

        $('.co').hide(); //hide all options in number of classes dropdown

        if (cMap.params.sn === 'jenks') {
            $('.j').show(); //show all options pertaining to jenks
            if (cMap.params.cl == 8 || cMap.params.cl == 11) {
                cMap.params.cl = 7;
            } //if current number of options is not a valid jenks option, change to default 7
        }
        if (cMap.params.sn === 'quantile') {
            $('.q').show(); //show all options pertaining to quantile
            if (cMap.params.cl == 8) {
                cMap.params.cl = 7;
            } //if current number of options is not a valid quantile option, change to default 7
        }
        if (cMap.params.sn === 'stddev') {
            $('.s').show(); //show all options pertaining to stddev
            if (cMap.params.cl == 5 || cMap.params.cl == 9 || cMap.params.cl == 11) {
                cMap.params.cl = 7;
            } //if current number of options is not a valid stddev option, change to default 7
        }

        $('#classes').val(cMap.params.cl); //select the proper option in number of classes dropdown

        filtercolorschemes(cMap); //filter out colorschemes that are not valid with this combination of schemename / number of classes
        updatequerysearchstring(cMap); //update address bar text - (just in case we had to change the number of classes to the default)    


    });

    //trigger the function
    $('#classification').change();

}