var ss = require("../../lib/js/simple_statistics.js");
var colortree = require("./colortree.js");
var datatree = require("./datatree.js");

var ajaxcall = require("./ajaxcall.js");
var symbolize = require("./symbolize.js");
var updatequerysearchstring = require("./update_query_string.js");
var filtercolorschemes = require("./filter_color_schemes.js");

//get all datatheme data from datatree.js , breaks from breakstree.js and colortree.js for sybolizing
module.exports = function(cMap, redraw, override) {


    //override??

    var i, k, manageradio, symbarray, geo, stripnum, stripdenom;



    function jsonstring(thedata) { //after successfull ajax call, data is sent here

        //console.log(thedata);

        var max, median, stddev, jenks5, jenks7, jenks9, quantile5, quantile7, quantile9, quantile11, standard8, standard7;

        max = ss.max(thedata);

        if (max === 0) {
            thedata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        } //all values in array are 0. (presumably no bg data)  Add a '1' to the array so simplestatistics library doesnt fail computing jenks.


        //var mean = ss.mean(thedata);

        median = ss.median(thedata);

        stddev = ss.standard_deviation(thedata);


        jenks5 = ss.jenks(thedata, 5);
        jenks5[0] = cMap.minval;
        jenks5.pop();
        jenks7 = ss.jenks(thedata, 7);
        jenks7[0] = cMap.minval;
        jenks7.pop();
        jenks9 = ss.jenks(thedata, 9);
        jenks9[0] = cMap.minval;
        jenks9.pop();

        quantile5 = [ss.quantile(thedata, 0.8), ss.quantile(thedata, 0.6), ss.quantile(thedata, 0.4), ss.quantile(thedata, 0.2), cMap.minval];
        quantile7 = [ss.quantile(thedata, 0.857143), ss.quantile(thedata, 0.714286), ss.quantile(thedata, 0.57143), ss.quantile(thedata, 0.42857), ss.quantile(thedata, 0.28571), ss.quantile(thedata, 0.14286), cMap.minval];
        quantile9 = [ss.quantile(thedata, 0.88888), ss.quantile(thedata, 0.77777), ss.quantile(thedata, 0.66666), ss.quantile(thedata, 0.55555), ss.quantile(thedata, 0.44444), ss.quantile(thedata, 0.33333), ss.quantile(thedata, 0.22222), ss.quantile(thedata, 0.11111), cMap.minval];
        quantile11 = [ss.quantile(thedata, 0.90909), ss.quantile(thedata, 0.81818), ss.quantile(thedata, 0.72727), ss.quantile(thedata, 0.63636), ss.quantile(thedata, 0.54545), ss.quantile(thedata, 0.45454), ss.quantile(thedata, 0.36364), ss.quantile(thedata, 0.27273), ss.quantile(thedata, 0.18182), ss.quantile(thedata, 0.09091), cMap.minval];


        //half stddev breaks (8)
        standard8 = [median + (stddev * 1.5), median + stddev, median + (stddev * 0.5), median, median - (stddev * 0.5), median - stddev, median - (stddev * 1.5), cMap.minval];
        //wide stddev breaks (7)
        standard7 = [median + (stddev * 2.5), median + (stddev * 1.5), median + (stddev * 0.5), median - (stddev * 0.5), median - (stddev * 1.5), median - (stddev * 2.5), cMap.minval];

        //console.log(standard8);
        //console.log(standard7);



        eval("localStorage." + cMap.params.v + "_" + geo + "_jenks_5 = '" + JSON.stringify(jenks5.reverse()) + "'");
        eval("localStorage." + cMap.params.v + "_" + geo + "_jenks_7 = '" + JSON.stringify(jenks7.reverse()) + "'");
        eval("localStorage." + cMap.params.v + "_" + geo + "_jenks_9 = '" + JSON.stringify(jenks9.reverse()) + "'");

        eval("localStorage." + cMap.params.v + "_" + geo + "_quantile_5 = '" + JSON.stringify(quantile5) + "'");
        eval("localStorage." + cMap.params.v + "_" + geo + "_quantile_7 = '" + JSON.stringify(quantile7) + "'");
        eval("localStorage." + cMap.params.v + "_" + geo + "_quantile_9 = '" + JSON.stringify(quantile9) + "'");
        eval("localStorage." + cMap.params.v + "_" + geo + "_quantile_11 = '" + JSON.stringify(quantile11) + "'");

        eval("localStorage." + cMap.params.v + "_" + geo + "_stddev_7 = '" + JSON.stringify(standard7) + "'");
        eval("localStorage." + cMap.params.v + "_" + geo + "_stddev_8 = '" + JSON.stringify(standard8) + "'");

        //console.log('after eval local storage');
        cMap.breaks = JSON.parse(eval("localStorage." + cMap.params.v + "_" + geo + "_" + cMap.params.sn + "_" + cMap.params.cl));

        //console.log('after breaks');

        cMap.legend.addTo(cMap.map);

        //console.log('added legend');

        if (redraw === "yes") {
            ajaxcall(cMap);
        } else {
            cMap.geojsonLayer.setStyle(function(feature) {
                symbolize(feature, cMap);
            });
        }

        //console.log('end func');

    }


    //console.log('beforeremovelegend');
    cMap.legend.removeFrom(cMap.map);
    //console.log('beforemanageradio');
    manageradio = $('input:radio[name ="optionsRadios"]:checked').val();
    //console.log('aftermanageradio');

    for (i = 0; i < datatree.data.length; i = i + 1) {

        if (manageradio === datatree.data[i].varcode) {
            cMap.current_desc = datatree.data[i].verbose;
            cMap.table = datatree.data[i].table;
            cMap.type = datatree.data[i].type;
            cMap.mininc = datatree.data[i].mininc;
            cMap.minval = Number(datatree.data[i].minval);
            cMap.numerator = datatree.data[i].numerator;
            cMap.denominator = datatree.data[i].denominator;
            cMap.moenumerator = datatree.data[i].moenumerator;
            cMap.moedenominator = datatree.data[i].moedenominator;
            cMap.moeformula = "(" + cMap.moenumerator + ")" + "/" + "(" + cMap.moedenominator + ")";
            cMap.formula = "(" + cMap.numerator + ")" + "/" + "(" + cMap.denominator + ")";
            cMap.favtable = datatree.data[i].favtable;
            cMap.params.v = datatree.data[i].varcode;
            cMap.usezeroasnull = datatree.data[i].usezeroasnull;
            symbarray = (datatree.data[i].favstyle).split(',');
            if (override === '1') {
                cMap.params.sn = symbarray[0];
                cMap.params.cl = parseInt(symbarray[1], 10);
                cMap.params.cs = symbarray[2];
                console.log('override');

                //change value in dropdowns
                $('#classification').val(cMap.params.sn);
                $('#classes').val(cMap.params.cl);
                $('#' + cMap.params.cs + cMap.params.cl).prop('checked', true);

                filtercolorschemes(cMap);
            }
        }

    }
    //console.log('for i loop');
    //loop through colorschemes only - we have breaks info and colorscheme    

    for (k = 0; k < colortree.colorschemes.length; k = k + 1) {
        if (colortree.colorschemes[k].schemename === cMap.params.cs && colortree.colorschemes[k].count === cMap.params.cl) {
            cMap.ifnulljson = colortree.colorschemes[k].ifnull;
            cMap.ifzerojson = colortree.colorschemes[k].ifzero;
            cMap.symbolcolors = colortree.colorschemes[k].colors;
        }
    }

    //localStorage.setItem("mhi_county_jenks_7", JSON.stringify([79183,64205,54206,46817,40204,33445,1]));
    if (cMap.params.s === '40') {
        geo = 'state';
    }
    if (cMap.params.s === '50') {
        geo = 'county';
    }
    if (cMap.params.s === '140') {
        geo = 'tract';
    }
    if (cMap.params.s === '150') {
        geo = 'bg';
    }
    if (cMap.params.s === '160') {
        geo = 'place';
    }


    if (eval("localStorage." + cMap.params.v + "_" + geo + "_" + cMap.params.sn + "_" + cMap.params.cl)) {
        cMap.breaks = JSON.parse(eval("localStorage." + cMap.params.v + "_" + geo + "_" + cMap.params.sn + "_" + cMap.params.cl));


        cMap.legend.addTo(cMap.map);

        if (redraw === "yes") {
            ajaxcall(cMap);
        } else {
            cMap.geojsonLayer.setStyle(function(feature) {
                symbolize(feature, cMap);
            });
        }


    } else {

        stripnum = cMap.numerator.replace(/Number/g, "").replace(/\(|\)/g, "").replace(/fp./g, "").replace(/\+/g, ',');
        stripdenom = cMap.denominator.replace(/Number/g, "").replace(/\(|\)/g, "").replace(/fp./g, "").replace(/\+/g, ',');


        //double check discard = maybe related to usezeroasnull
        $.ajax({
            url: "https://gis.dola.colorado.gov/cmap/getranges?geo=" + geo + "&num=" + stripnum + "&denom=" + stripdenom + "&discard=" + cMap.usezeroasnull,
            dataType: 'json',
            success: jsonstring
        });



    }

    //console.log('after eval');

    updatequerysearchstring(cMap);

}