    "use strict";

    var colortree = require("./colortree.js");
    var datatree = require("./datatree.js");
    var LZString = require("../../lib/js/lz-string.js");


    //utility functions
    var updatequerysearchstring = require("./update_query_string.js");
    var filtercolorschemes = require("./filter_color_schemes.js");
    var addRows = require("./add_rows.js");
    var redrawTable = require("./redraw_table.js");
    var symbolize = require("./symbolize.js");
    var chgtblfl = require("./change_table_flavor.js");

    var addchart = require("./addchart.js");

    //cMap holds all global values
    var cMap = require("./initialize_cMap.js")();

    //Bootleaf Template Setup
    require("./setup_bootleaf.js")();

    //Leaflet Controls
    require("./attribution_control.js")(cMap);
    require("./geocode_control.js")(cMap);
    require("./zoom_control.js")(cMap);
    require("./locate_control.js")(cMap);
    require("./fullscreen_control.js")(cMap);
    require("./layer_control.js")(cMap);
    cMap.legend = require("./legend_control")(cMap);




var on_each_feature = require("./oneachfeature.js");

function onEachFeature(feature, layer){
  on_each_feature(feature, layer, cMap);
}


var mintable = require("./mintable.js");
var minmaxtable = require("./minmaxtable.js");
var advenable = require("./advenable.js");

var querygeonums = require("./querygeonums.js");
var ajaxcall = require("./ajaxcall.js");


var changeall = require("./changeall.js");

var getJson = require("./getjson.js");




    function populate() {

        var i, sectionsarray = [],
            uniqueNames = [],
            vchecked;

        //count different categories
        for (i = 0; i < datatree.data.length; i = i + 1) {
            sectionsarray.push(datatree.data[i].section);
        }
        //whittle down sectionsarray to only unique items
        $.each(sectionsarray, function(i, el) {
            if ($.inArray(el, uniqueNames) === -1) {
                uniqueNames.push(el);
            }
        });

        //sort array alphabetically
        uniqueNames.sort();

        //populate accordion1
        for (i = 0; i < (parseInt(((uniqueNames.length) / 2), 10) + 1); i = i + 1) {
            $('#accordion1').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading1' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion1" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse1">' + uniqueNames[i] + '</a></h4></div><div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + uniqueNames[i] + '" class="panel-body"></div></div></div>');
        }

        //populate accordion2 instead
        for (i = (parseInt(((uniqueNames.length) / 2), 10) + 1); i < uniqueNames.length; i = i + 1) {
            $('#accordion2').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading2' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse1">' + uniqueNames[i] + '</a></h4></div><div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + uniqueNames[i] + '" class="panel-body"></div></div></div>');
        }

        vchecked = "";

        //loop through - add all themes
        for (i = 0; i < datatree.data.length; i = i + 1) {
            if (cMap.params.v === undefined) {
                if (i === 0) {
                    vchecked = "checked";
                } else {
                    vchecked = "";
                }
            }
            if (cMap.params.v !== undefined) {
                if (cMap.params.v === datatree.data[i].varcode) {
                    vchecked = "checked";
                } else {
                    vchecked = "";
                }
            }
            $('#id' + datatree.data[i].section).append('<div class="radio"><label><input type="radio" name="optionsRadios" value="' + datatree.data[i].varcode + '" ' + vchecked + '> ' + datatree.data[i].verbose + '</label></div>'); //to accordion
            $('#advattribute').append('<option value="' + datatree.data[i].varcode + '" > ' + datatree.data[i].verbose + '</option>'); //to advanced selection tool
        }

    }

    function drawcolorschemes() {

        var i, j, cclasses, prefix, pt1, pt2, appendstring;

        $('#colorschemes').html('');

        //populate colorschemes
        for (i = 0; i < colortree.colorschemes.length; i = i + 1) {

            cclasses = colortree.colorschemes[i].count; //check for correct number of classes
            prefix = colortree.colorschemes[i].schemename.substring(0, 2);

            //classes to be added
            pt1 = "";
            pt2 = "";

            if (prefix === 'mh') {
                pt1 = "jenks";
            }
            if (prefix === 'sh') {
                pt1 = "jenks";
            }
            if (prefix === 'ds') {
                pt1 = "quantile";
            }

            if (cclasses === 5) {
                pt2 = "c5";
            }
            if (cclasses === 7) {
                pt2 = "c7";
            }
            if (cclasses === 8) {
                pt2 = "c8";
            }
            if (cclasses === 9) {
                pt2 = "c9";
            }
            if (cclasses === 11) {
                pt2 = "c11";
            }


            appendstring = '<label class="allradio radio-inline ' + pt1 + ' ' + pt2 + '"><input id="' + colortree.colorschemes[i].schemename + cclasses + '" type="radio" name="schemeRadios" class="allradio form-control ' + pt1 + ' ' + pt2 + '" value="' + colortree.colorschemes[i].schemename + '">';

            for (j = 0; j < colortree.colorschemes[i].count; j = j + 1) {
                appendstring = appendstring + '<span style="background-color:' + colortree.colorschemes[i].colors[j] + ';">&nbsp;&nbsp;</span>';
            }

            appendstring = appendstring + '</label>';

            //add all colorscheme dom elements to dialog
            $('#colorschemes').append(appendstring);

        }

        filtercolorschemes(cMap);

        //if colorscheme info is in querystring, use it.  otherwise, use default
        $('#' + cMap.params.cs + cMap.params.cl).prop('checked', true);
        updatequerysearchstring(cMap);


    }




    //table2CSV plugin - from button
    function getCSVData() {

        var csv_value = $('#table').table2CSV({
            delivery: 'value'
        });

        csv_value = csv_value.replace(/±/g, "");

        $("#csv_text").val(csv_value);

    }







    //kinda a hacky slider. Revisit.
    function resetslider() {

        $("#progressbar").css('width', '0%').stop();
        $("#progressbar").html('0%');
    }


    //on dom loaded
    $(document).ready(function() {


        //begin

        var trslider;


        //Initialize transparency slider
        trslider = $('#ex1').slider({
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



        populate(); //populate them modal from datatree
        drawcolorschemes(); //populate symbology portion of advanced dialog
        cMap.legend.addTo(cMap.map);
        changeall(cMap, 'yes', '0'); //draw 



        require("./change_options")(cMap, updatequerysearchstring, changeall, filtercolorschemes);
        require("./map_move")(cMap, updatequerysearchstring, ajaxcall);
        require("./demo_mode")(cMap, trslider, changeall, updatequerysearchstring);



    }); //end document on ready



    //TODO: back button is broken
    //for jquery history plugin
    History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
        //         var State = History.getState(); // Note: We are using History.getState() instead of event.state
        //       console.log(State);
        // window.location=State.url;
    });


    require("./print_mode.js")(cMap.params.print);