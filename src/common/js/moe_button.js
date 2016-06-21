    var updatequerysearchstring = require("./update_query_string.js");

    module.exports = function(cMap) {

        //initialize bootstrap switch for MOE
        $("[name='my-checkbox']").bootstrapSwitch({
            animate: false
        });


        //moe toggle - bootstrap switch
        $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
            //console.log(this); // DOM element
            //console.log(event); // jQuery event
            if (state) {
                $('.moe').show();
            } else {
                $('.moe').hide();
            }
            updatequerysearchstring(cMap);
        });

        //default is for MOE to be on (yes) - if querystring says 'no' turn it off
        if (cMap.params.moe !== undefined) {
            if (cMap.params.moe === 'no') {
                $('input[name="my-checkbox"]').bootstrapSwitch('state', false);
            }

            updatequerysearchstring(cMap);
        }

    }