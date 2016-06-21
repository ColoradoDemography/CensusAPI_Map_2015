var querygeonums = require("./querygeonums.js");

module.exports = function(cMap) {


    //advanced search
    $('#querygeonums').click(function() {
        querygeonums(cMap);
    });

    $('#advattribute').change(function() {
        advenable(this.value);
    });


    function advenable(val) {
        //Determines whether to show or hide form controls based on whether the value of the select by attribute dropdown is equal to 'None'
        if (val === 'none') {
            $("#advsign").prop("disabled", true);
            $("#advtext").prop("disabled", true);
        } else {
            $("#advsign").prop("disabled", false);
            $("#advtext").prop("disabled", false);
        }
    }



}