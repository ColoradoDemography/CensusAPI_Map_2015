    var updatequerysearchstring = require("./update_query_string.js");
    var filtercolorschemes = require("./filter_color_schemes.js");
    var mintable = require("./mintable.js");
    var minmaxtable = require("./minmaxtable.js");
    var advenable = require("./advenable.js");
    var querygeonums = require("./querygeonums.js");
    var chgtblfl = require("./change_table_flavor.js");
    var addchart = require("./addchart.js");
    var addRows = require("./add_rows.js");
    var redrawTable = require("./redraw_table.js");
    var symbolize = require("./symbolize.js");
    var ajaxcall = require("./ajaxcall.js");
    var changeall = require("./changeall.js");
    var getJson = require("./getjson.js");
    var getCSVData = require("./getcsvdata.js");
    var populate = require("./populate.js");
    var drawcolorschemes = require("./drawcolorschemes.js");
    var on_each_feature = require("./oneachfeature.js");

    var LZString = require("../../lib/js/lz-string.js");

    module.exports = function(cMap) {


        function onEachFeature(feature, layer) {
            on_each_feature(feature, layer, cMap);
        }

        //kinda a hacky slider. Revisit.
        function resetslider() {

            $("#progressbar").css('width', '0%').stop();
            $("#progressbar").html('0%');
        }

        //Initialize transparency slider
        var trslider = $('#ex1').slider({
            formatter: function(value) {
                return value + '%';
            }
        });





        //depending on sumlev, changes minZoom, adds the correct string to the advanced query tool i.e (select all 'tracts')
        $("input[name=geoRadios][value=" + cMap.params.s + "]").prop('checked', true);

        if (cMap.params.s === '50') {
            cMap.map.options.minZoom = 4;
            $('#advgeo').text('counties');
        }
        if (cMap.params.s === '40') {
            cMap.map.options.minZoom = 4;
            $('#advgeo').text('states');
        }
        if (cMap.params.s === '140') {
            cMap.map.options.minZoom = 9;
            $('#advgeo').text('tracts');
        }
        if (cMap.params.s === '150') {
            cMap.map.options.minZoom = 9;
            $('#advgeo').text('block groups');
        }
        if (cMap.params.s === '160') {
            cMap.map.options.minZoom = 9;
            $('#advgeo').text('places');
        }


        //updatequerysearchstring after close rclick and chart modals
        $('.cclose').click(function() {
            cMap.params.ga = '';
            cMap.params.gn = 0;
            setTimeout(function() {
                updatequerysearchstring(cMap);
            }, 1000);
        });

        $('.leaflet-control-layers-selector').change(function() {
            var temptext;
            temptext = $(this).next().text();
            console.log(temptext);
            if (temptext === ' Mapbox: Contrast Base') {
                console.log('there');
                cMap.params.bm = 'cb';
            }
            if (temptext === ' Mapbox: Satellite') {
                console.log('here');
                cMap.params.bm = 'sat';
            }
            updatequerysearchstring(cMap);
        });

        $('#mintableclick').click(function() {
            mintable(cMap);
        });

        $('#minmaxclick').click(function() {
            minmaxtable(cMap);
        });

        $('#getcsvdata').click(function() {
            getCSVData();
        });

        $('#querygeonums').click(function() {
            querygeonums(cMap);
        });

        $('#advattribute').change(function() {
            advenable(this.value);
        });

        $('#printbtn').click(function() {
            //export  map function called from button.  Needs work.  No notice when fails.
            require("./download_image.js")(cMap, 'png');
        });

        $('#resetslider').click(function() {
            resetslider();
        });

        $('#linkbutton').tooltip({
            placement: 'right'
        });

        //get list of selected geographies (d) - store them in global variable (dataset)
        if (cMap.params.d !== undefined) {
            cMap.dataset = LZString.decompressFromEncodedURIComponent(cMap.params.d).split(',');
        }


        $("#classification").val(cMap.params.sn).change();
        $("#cselected").val(cMap.params.csel).change();
        $("#cmouseover").val(cMap.params.cmo).change();


        updatequerysearchstring(cMap);

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


        //when doubleclicking on row, remove item from selection (and table)
        $(document).on('dblclick', 'tr', function() {
            var classname, i;

            classname = this.className;
            for (i = 0; i < cMap.dataset.length; i = i + 1) {

                if (Number(cMap.dataset[i]) === Number(classname)) {
                    cMap.dataset.splice(i, 1);
                }
            }
            $('.' + classname).remove();
            //recalc footer
            // writeFooter();  //do add this back in later
            updatequerysearchstring(cMap);
            //change color back to black //insane
            cMap.geojsonLayer.setStyle(function(feature) {
                symbolize(feature, cMap);
            });

        });

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

        //looks for table dropdown change - changes table flavor
        $('#tableoption').on('change', function() {
            chgtblfl(cMap);
            updatequerysearchstring(cMap);
        });

        //initialize stupid table plugin on our data table
        $("#table").stupidtable();


        require("./easy_buttons.js")(cMap, updatequerysearchstring, addchart, addRows, redrawTable);

        //if a transparency value is set in the querystring, change the slider to that value
        if (cMap.params.tr !== undefined) {
            cMap.feature.fillOpacity = cMap.params.tr;
            trslider.slider('setValue', parseInt((cMap.feature.fillOpacity * 100), 10));

            updatequerysearchstring(cMap);
        }

        //when user stops moving transparency slider, change transparency of geojson layer
        $("#ex1").on("slideStop", function(slideEvt) {
            //cMap.feature.lineopacity = slideEvt.value / 100; //transparency control as pct
            cMap.feature.fillOpacity = slideEvt.value / 100;

            //transparency needs to be reflected in the legend
            cMap.legend.removeFrom(cMap.map);
            cMap.geojsonLayer.setStyle({
                //opacity: cMap.feature.lineopacity,
                fillOpacity: cMap.feature.fillOpacity
            });
            cMap.legend.addTo(cMap.map);
            updatequerysearchstring(cMap);
        });




        //initialize geojsonLayer
        cMap.geojsonLayer = L.geoJson.ajax("", {
            loading: function() {
                cMap.map.spin(true);
            },
            middleware: function(data) {
                getJson(data, cMap);
            },
            onEachFeature: onEachFeature
        });



        $('#cselected').change(function() {

            //change selection color
            cMap.params.csel = this.value;
            updatequerysearchstring(cMap);

            //change all previously selected elements
            cMap.geojsonLayer.setStyle(function(feature) {
                symbolize(feature, cMap);
            });
        });

        $('#cmouseover').change(function() {
            cMap.params.cmo = this.value;
            updatequerysearchstring(cMap);
        });



        populate(cMap); //populate the modal from datatree
        drawcolorschemes(cMap); //populate symbology portion of advanced dialog
        cMap.legend.addTo(cMap.map);
        changeall(cMap, 'yes', '0'); //draw 



        require("./change_options")(cMap, updatequerysearchstring, changeall, filtercolorschemes);
        require("./map_move")(cMap, updatequerysearchstring, ajaxcall);
        require("./demo_mode")(cMap, trslider, changeall, updatequerysearchstring);



        //TODO: back button is broken
        //for jquery history plugin
        History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
            //         var State = History.getState(); // Note: We are using History.getState() instead of event.state
            //       console.log(State);
            // window.location=State.url;
        });


        require("./print_mode.js")(cMap.params.print);

    }