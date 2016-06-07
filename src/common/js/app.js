    "use strict";

    var colortree = require("./colortree.js");
    var datatree = require("./datatree.js");
    var charttree = require("./charttree.js");
    var tabletree = require("./tableflavor.js");
    var LZString = require("../../lib/js/lz-string.js");
    var accounting = require("accounting");
    var ss = require("../../lib/js/simple_statistics.js");

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
    var legend = require("./legend_control")(cMap);







    //clear selection button in table modal
    function clearsel() {


        cMap.dataset = [];
        redrawTable(cMap, addRows);

        //change selected symbology back to unselected
        cMap.map.eachLayer(function(layer) {
            //console.log(layer.options);
            if (layer.options) {
                if (layer.options.color) {
                    if (layer.options.linecap === 'butt') {
                        layer.setStyle({
                            weight: cMap.feature.lineweight,
                            color: cMap.feature.linecolor,
                            lineopacity: cMap.feature.lineopacity,
                            linecap: 'round'
                        });
                    }
                }

            }
        });

    }


    // Create a mouseout event that undoes the mouseover changes
    function mouseout(e) {


        var rsstyle = e.layer.options.linecap,
            layer = e.target;

        if (rsstyle === "butt") {
            layer.setStyle({
                opacity: 1,
                weight: 2,
                color: cMap.params.csel
            });
        } else {
            layer.setStyle({
                opacity: cMap.feature.lineopacity,
                weight: cMap.feature.lineweight,
                color: cMap.feature.linecolor
            });
        }
        $("#popup").remove();
    }


    //mouseover highlight
    function highlightFeature(e) {



        var layer = e.target;
        var fp = e.target.feature.properties;
        var popupresult = eval(cMap.formula);
        var resprec;
        var popup;


        //can turn to off for no mouseover
        if (cMap.params.cmo !== 'off') {
            layer.setStyle({
                opacity: 1,
                weight: 2,
                color: cMap.params.cmo
            });

            //bring feature to front
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
        }



        if (cMap.type === 'currency') {
            popupresult = ' ' + accounting.formatMoney(popupresult, "$", 0);
        }

        if (cMap.type === 'number') {
            resprec = (String(cMap.mininc)).split(".")[1];
            if (!resprec) {
                resprec = 0;
            } else {
                resprec = resprec.length;
            }
            popupresult = popupresult.toFixed(resprec);
        }

        if (cMap.type === 'percent') {
            popupresult = (popupresult * 100).toFixed(2) + ' %';
        }

        //no formatting for type=regular - think: median year housing unit built (only one)

        // Create a popup
        popup = $("<div></div>", {
            id: "popup",
            css: {
                position: "absolute",
                top: "45px",
                right: "100px",
                zIndex: 1002,
                backgroundColor: "white",
                padding: "8px",
                border: "1px solid #ccc"
            }
        });

        // Insert a headline into that popup
        var hed = $("<div></div>", {
            text: fp.geoname + ": " + popupresult,
            css: {
                fontSize: "16px",
                marginBottom: "3px"
            }
        });

        hed.appendTo(popup);

        // Add the popup to the map
        popup.appendTo("#map");


    }


    //on geojson click
    function featureSelect(e) {

        var i, layer = e.target,
            curcolor = (e.layer.options.linecap),
            arr, rowstr = '',
            classadd = '',
            plusminus = '',
            resprec, checkstate, k;


        var fp = e.target.feature.properties;

        //convert json object to array
        arr = $.map(e.target.feature.properties, function(el) {
            return el;
        });

        //if currently selected - remove it
        if (curcolor === 'butt') {
            layer.setStyle({
                weight: cMap.feature.lineweight,
                color: cMap.feature.linecolor,
                lineopacity: cMap.feature.lineopacity,
                linecap: 'round'
            });

            //search dataset (geonum) array for item to remove
            for (i = 0; i < cMap.dataset.length; i = i + 1) {
                if (cMap.dataset[i] === arr[1]) {
                    cMap.dataset.splice(i, 1);
                }
            }
            // Delete table row which has matching geonum class
            $('.' + e.target.feature.properties.geonum).remove();
            //send feature to back
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToBack();
            }

        } else { //else add it
            layer.setStyle({
                weight: 2,
                color: cMap.params.csel,
                lineopacity: 1,
                linecap: 'butt'
            });

            //bring feature to front
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            cMap.tblfl = $('#tableoption').val();

            //add row to table
            if (cMap.tblfl === '-1') {
                //plain
                rowstr = '<tr class="' + fp.geonum + '">';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geoname + '</td>';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geonum + '</td>';
                for (k in e.target.feature.properties) {
                    if ((e.target.feature.properties).hasOwnProperty(k)) {

                        if (k !== 'geoname' && k !== 'geonum') {
                            if (k.search("moe") !== -1) {
                                classadd = "moe";
                                plusminus = '&plusmn; ';
                            } else {
                                classadd = "";
                                plusminus = '';
                            }

                            if (cMap.type === 'number' || cMap.type === 'percent') {
                                resprec = (String(e.target.feature.properties[k])).split(".")[1];
                                if (!resprec) {
                                    resprec = 0;
                                } else {
                                    resprec = resprec.length;
                                }
                                rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + parseFloat(e.target.feature.properties[k]).toFixed(resprec) + '</td>';
                            }

                            if (cMap.type === 'currency') {
                                resprec = (String(e.target.feature.properties[k])).split(".")[1];
                                if (!resprec) {
                                    resprec = 0;
                                } else {
                                    resprec = resprec.length;
                                }
                                rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + accounting.formatMoney(parseFloat(e.target.feature.properties[k]), "$", resprec) + '</td>';
                            }

                            /* if(cMap.type==='percent'){
                              resprec= ((e.target.feature.properties[k])+"").split(".")[1];
                              if(!resprec){resprec=0;}else{resprec = resprec.length;}
                              rowstr=rowstr+'<td class="'+classadd+'">'+plusminus+parseFloat(e.target.feature.properties[k]).formatMoney(resprec)+'%</td>'; 
                            } */ //percent cant happen

                            if (cMap.type === 'regular') {
                                rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + e.target.feature.properties[k] + '</td>';
                            }

                        }
                    }
                }
                rowstr = rowstr + '</tr>';

            } else {

                //descriptive      //Table Flavor

                rowstr = '';

                //add matched records to table
                rowstr = '<tr class="' + e.target.feature.properties.geonum + '">';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geoname + '</td>';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geonum + '</td>';



                $.each(tabletree.data[cMap.tblfl].Data, function(k, v) {

                    if ((tabletree.data[cMap.tblfl].Data[k].Formula).search("moe") !== -1) {
                        classadd = "moe";
                        plusminus = '&plusmn; ';
                    } else {
                        classadd = "";
                        plusminus = '';
                    }
                    if ((tabletree.data[cMap.tblfl].Data[k].FieldName) === "CV") {
                        plusminus = '';
                    } //no plusmn on coefficient of variance

                    if (tabletree.data[cMap.tblfl].Data[k].type === "currency") {
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + accounting.formatMoney(parseInt((eval(v.Formula)), 10), "$", 0) + '</td>';
                    }
                    if (tabletree.data[cMap.tblfl].Data[k].type === "percent") {
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)).toFixed(2) + '" class="' + classadd + '">' + plusminus + Number(eval(v.Formula)).toFixed(2) + '%</td>';
                    }
                    if (tabletree.data[cMap.tblfl].Data[k].type === "regular") {
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + eval(v.Formula) + '</td>';
                    }
                    if (tabletree.data[cMap.tblfl].Data[k].type === "number") {
                        resprec = (String(eval(v.Formula))).split(".")[1];
                        if (!resprec) {
                            resprec = 0;
                        } else {
                            resprec = resprec.length;
                        }
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + parseFloat(eval(v.Formula)).toFixed(resprec) + '</td>';
                    }

                });

                rowstr = rowstr + '</tr>';

            }

            $('#tablebody').append(rowstr);

            //hide (or not) if class=moe
            checkstate = $('input[name="my-checkbox"]').bootstrapSwitch('state');
            if (checkstate) {
                $('.moe').show();
            } else {
                $('.moe').hide();
            }

            //add item to array
            cMap.dataset.push(arr[1]);
        }

        updatequerysearchstring(cMap);

        // writeFooter();


    }

    function commafy(nStr) {
        var x, x1, x2, rgx;

        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function chartmaker(dataset, labelset, moedata, title) {

        $('#rclicktitle').html(title);

        $('#rclick').empty();

        var w, h, barPadding, maxval, svg, increase, dchange, label;

        //Width and height
        w = 540;
        h = 250;
        barPadding = 4;

        maxval = d3.max(dataset);


        //Create SVG element
        svg = d3.select('#rclick')
            .append("svg")
            .attr("width", w + 11)
            .attr("height", h + 150);


        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return ((i * (w / dataset.length)) + 11);
            })
            .attr("y", function(d) {
                return ((h - 20) - (((h - 20) / maxval) * d) + 20);
            })
            .attr("width", w / dataset.length - barPadding)
            .attr("height", function(d) {
                return (((h - 20) / maxval) * d);
            })
            .attr("fill", "LightBlue ")
            .attr("stroke-width", 1)
            .attr("stroke", "navy")
            .on("mouseover", function() {
                d3.select(this).style("stroke-width", 2).style("fill-opacity", 0.5);
            })
            .on("mouseout", function() {
                d3.select(this).style("stroke-width", 1).style("fill-opacity", 1);
            })
            .append("svg:title")
            .text(function(d, i) {
                return "MOE: ± " + commafy(parseInt(moedata[i]));
            })

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return commafy(d);
            })
            .attr("text-anchor", "middle")
            .attr("x", function(d, i) {
                return ((i * (w / dataset.length) + (w / dataset.length - barPadding) / 2) + 10);
            })
            .attr("y", function(d) {
                return ((h - 20) - (((h - 20) / maxval) * d) + 20) - 5;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "9px")
            .attr("fill", "#333333");




        increase = -6;
        dchange = (w / labelset.length);

        for (label in labelset) {
            svg.append("text")
                .attr("x", h + 7)
                .attr("y", increase - (dchange / 2))
                .attr("transform", "rotate(90)")
                .text(labelset[label])
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "#333333");

            increase = increase - dchange;

        }

        // horizontal line for the x-axis
        svg.append("line")
            .attr("x1", 6)
            .attr("x2", w + 12)
            .attr("y1", h)
            .attr("y2", h)
            .style("stroke-opacity", 1)
            .attr("stroke-width", 2)
            .style("stroke", "#111");

    }




    function rightclick(e) {


        var i, j, fp = e.target.feature.properties,
            companiontable = '',
            companionindex, m, valdata = [],
            moedata = [],
            labelset = [],
            temparray = [];

        //var newobj = {};

        cMap.params.ga = fp.geoname;
        cMap.params.gn = fp.geonum;


        function assigndata(data) {

            data = data[0];

            function parsephp(c) {
                //upon successfull return from chart data gathering, create chart

                c = c[0];
                //convert all values in return object to number
                for (var key in c) {
                    c[key] = Number(c[key]);
                }

                for (i = 0; i < charttree.data[companionindex].Data.length; i = i + 1) {
                    labelset.push(charttree.data[companionindex].Data[i].FieldName);
                    valdata.push(eval(charttree.data[companionindex].Data[i].Formula));
                    moedata.push(eval(charttree.data[companionindex].Data[i].MoeFormula));
                }

                chartmaker(valdata, labelset, moedata, charttree.data[companionindex].ChartAlias + ": " + fp.geoname);

                setTimeout(function() {
                    updatequerysearchstring(cMap);
                }, 1000);

            } //end parsephp



            m = data;

            //convert all values in return object to number
            for (var key in m) {
                m[key] = Number(m[key]);
            }

            //regular data
            $.ajax({
                type: "GET",
                url: "https://gis.dola.colorado.gov/cmap/simple?db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + companiontable + "&geonum=" + fp.geonum,
                dataType: 'json',
                success: parsephp
            });



        } //end assigndata()




        //find companion table
        for (i = 0; i < charttree.data.length; i = i + 1) {

            temparray = (charttree.data[i].ActualTable).split(","); //Actual Table can have multiple values separated by a comma.  This will turn that into an array.

            for (j = 0; j < temparray.length; j = j + 1) { //loop through array of values created above

                if (temparray[j] === cMap.table) {
                    companionindex = i;
                    companiontable = charttree.data[i].ChartTable;

                    //only do the chart thing if there is an entry in charttree
                    $("#rclickModal").modal("show");

                    //moe data
                    $.ajax({
                        type: "GET",
                        url: "https://gis.dola.colorado.gov/cmap/simple?db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + companiontable + "_moe&geonum=" + fp.geonum,
                        dataType: 'json',
                        success: assigndata
                    });



                } //end if temparray

            } //end for j


        } //end for i

    } //end rightclick function






    //every geojson feature will have a mouseover, mouseout, and click event.
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: mouseout,
            click: featureSelect,
            contextmenu: rightclick
        });
    }



    //hide table - from button
    function mintable() {
        $('#resizediv').hide();
        updatequerysearchstring(cMap);
    }

    //min or max table - from button
    function minmaxtable() {


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



    //called from index.html.  Determines whether to show or hide form controls based on whether the value of the select by attribute dropdown is equal to 'None'
    function advenable(curval) {

        if (curval === 'none') {
            $("#advsign").prop("disabled", true);
            $("#advtext").prop("disabled", true);
        } else {
            $("#advsign").prop("disabled", false);
            $("#advtext").prop("disabled", false);
        }
    } //end advenable


    //function selects all matching geographies, highlights them, puts them into/draws table
    function selectgeonums(data) {

        var i;

        cMap.dataset = []; //clear existing selection (may want to think about option to add to existing selection set)
        for (i = 0; i < data.length; i = i + 1) {
            cMap.dataset.push(data[i]); //add each new geonum into dataset[]
        }

        cMap.createnewtable = 0; //set flag to redraw table - which will be called in the styling function
        cMap.geojsonLayer.setStyle(function(feature) {
            symbolize(feature, cMap);
        }); //restyle entire layer (restyle function includes highlighting selected features)
        updatequerysearchstring(cMap);

    }



    //called from index.html when select button is pressed in advanced tools
    function querygeonums() {


        var advstate, advattribute, advsign, advtext, advtable, advnumerator, advdenominator, i;

        advstate = $("#advstate").val(); //state selected
        advattribute = $("#advattribute").val(); //criteria (median household income, etc)
        advsign = $("#advsign").val(); //sign; greater than, less than, etc
        advtext = $("#advtext").val(); //value (as in: median household income is greater than VALUE)

        advtext = advtext.replace(/[^0-9\.]+/g, ''); //strip non numeric from VALUE text


        //loop through datatree (where data themes are defined), find varcode that matches the CRITERIA and assigns table, numerator, and denominator variables
        for (i = 0; i < datatree.data.length; i = i + 1) {
            if (advattribute === datatree.data[i].varcode) {
                advtable = datatree.data[i].table;
                advnumerator = datatree.data[i].numerator;
                advdenominator = datatree.data[i].denominator;
            }
        }

        //send paramters found above to advsearch.php, where query will return a list of geonums that fit that qualification
        $.ajax({
            url: "https://gis.dola.colorado.gov/cmap/advsearch?advsumlev=" + cMap.params.s + "&advstate=" + advstate + "&advsign=" + advsign + "&advtext=" + advtext + "&advtable=" + advtable + "&advnumerator=" + encodeURIComponent(advnumerator) + "&advdenominator=" + encodeURIComponent(advdenominator),
            dataType: 'json',
            success: selectgeonums
        });

    }



    function ajaxcall() {


        var r, diff1, diff2, newbounds;

        cMap.geojsonLayer.clearLayers();

        cMap.lastzoom = cMap.map.getZoom();
        r = cMap.map.getBounds();
        cMap.coord.nelat = (r._northEast.lat);
        cMap.coord.nelng = (r._northEast.lng);
        cMap.coord.swlat = (r._southWest.lat);
        cMap.coord.swlng = (r._southWest.lng);

        diff1 = (cMap.coord.nelat - cMap.coord.swlat) / 2;
        diff2 = (cMap.coord.nelng - cMap.coord.swlng) / 2;

        //we calculate a bounding box equal much larger than the actual visible map.  This preloades shapes that are off the map.  Combined with the center point query, this will allow us to not have to requery the database on every map movement.
        newbounds = (cMap.coord.swlng - diff2) + "," + (cMap.coord.swlat - diff1) + "," + (cMap.coord.nelng + diff2) + "," + (cMap.coord.nelat + diff1);

        cMap.geojsonLayer.refresh("https://gis.dola.colorado.gov/capi/geojson?db=" + cMap.db + "&schema=" + cMap.schema + "&sumlev=" + cMap.params.s + "&limit=" + cMap.limit + "&table=" + cMap.table + "&bb=" + newbounds + "&zoom=" + cMap.map.getZoom() + "&moe=yes"); //add a new layer replacing whatever is there

    }




    //get all datatheme data from datatree.js , breaks from breakstree.js and colortree.js for sybolizing
    function changeall(redraw, override) {

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

            legend.addTo(cMap.map);

            //console.log('added legend');

            if (redraw === "yes") {
                ajaxcall();
            } else {
                cMap.geojsonLayer.setStyle(function(feature) {
                    symbolize(feature, cMap);
                });
            }

            //console.log('end func');

        }


        //console.log('beforeremovelegend');
        legend.removeFrom(cMap.map);
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


            legend.addTo(cMap.map);

            if (redraw === "yes") {
                ajaxcall();
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



    //after successfull ajax call, data is sent here
    function getJson(data) {

        $("#popup").remove();

        cMap.geojsonLayer.clearLayers(); //(mostly) eliminates double-draw (should be technically unneccessary if you look at the code of leaflet-ajax...but still seems to help)
        cMap.geojsonLayer.addData(data);

        cMap.geojsonLayer.setStyle(function(feature) {
            symbolize(feature, cMap);
        });
        cMap.map.addLayer(cMap.geojsonLayer);
        cMap.map.spin(false);

        //OMG OMG, I Figured out how to bring selected features to the front
        cMap.map.eachLayer(function(layer) {
            if (layer.options) {
                if (layer.options.color) {
                    if (layer.options.linecap === 'butt') {
                        //bring feature to front - unfortunately a bug in IE and Opera prevent this from being fully cross-browser
                        if (!L.Browser.ie && !L.Browser.opera) {
                            layer.bringToFront();
                        }
                    }
                }

            }
        });


        //if data table flag is set, then open data table to appropriate size on startup
        if (cMap.params.dt !== undefined) {

            if (cMap.params.dt === 'yes') {
                $('#resizediv').toggle();
            }

            if (cMap.params.dt === 'max') {
                $('#resizediv').toggle();
                $('#resizediv').css('max-height', '100%');
                $('#resizediv').css('height', '100%');
                $('#resizediv').css('padding-top', '50px');
                $('#closebtn').css('top', '53px');
                $('#minmaxbtn').css('top', '53px');
                $("#minmaxbtn2").removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
            }

            delete cMap.params.dt;
        }


        //if chart flag is set, then open chart on startup
        if (cMap.params.ch !== undefined) {

            if (cMap.params.ch === 'yes') {
                $('#chartModal').modal('toggle');
                $('#chartdiv').empty();
                addchart(cMap);
                setTimeout(function() {
                    updatequerysearchstring(cMap);
                }, 1000);
            }

            delete cMap.params.ch;
        }


        //if right click chart flag is set, then open chart on startup to appropriate feature
        if (cMap.params.rc !== undefined) {

            if (cMap.params.rc === 'yes') {

                $('#rclickModal').modal('toggle');
                $('#rclick').empty();

                var e = {};
                e.target = {};
                e.target.feature = {};
                e.target.feature.properties = {};
                e.target.feature.properties.geonum = cMap.params.gn;
                e.target.feature.properties.geoname = cMap.params.ga;

                rightclick(e);
                setTimeout(function() {
                    updatequerysearchstring(cMap);
                }, 1000);

            }

            delete cMap.params.rc;
        }



    }

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
            mintable();
        });

        $('#minmaxclick').click(function() {
            minmaxtable();
        });

        $('#getcsvdata').click(function() {
            getCSVData();
        });

        $('#querygeonums').click(function() {
            querygeonums();
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


        require("./easy_buttons.js")(cMap, updatequerysearchstring, addchart, clearsel);

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
            legend.removeFrom(cMap.map);
            cMap.geojsonLayer.setStyle({
                //opacity: cMap.feature.lineopacity,
                fillOpacity: cMap.feature.fillOpacity
            });
            legend.addTo(cMap.map);
            updatequerysearchstring(cMap);
        });




        //initialize geojsonLayer
        cMap.geojsonLayer = L.geoJson.ajax("", {
            loading: function() {
                cMap.map.spin(true);
            },
            middleware: function(data) {
                getJson(data);
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
        legend.addTo(cMap.map);
        changeall('yes', '0'); //draw 



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