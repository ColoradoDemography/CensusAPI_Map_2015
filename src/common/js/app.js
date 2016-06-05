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



    //symbolize everything right here!!!  Every geography feature in the view is iterated over
    function feat1(feature) {


        var fp = feature.properties;
        var mapvar = eval(cMap.formula),
            geonum = feature.properties.geonum,
            newlinecolor = cMap.feature.linecolor,
            newlineweight, newlineopacity, newlinecap, getreverse, i, j;


        //mapvar: the actual computed value of the theme variable
        //geonum: the id of the geography
        //newlinecolor: get default lincolor, lineweight, and lineopacity values

        //cMap.createnewtable is the flag to redraw the data table.  Set to 0 means redraw, set to 1 means don't redraw
        if (cMap.createnewtable === 0) {
            redrawTable(cMap, addRows);
        }
        cMap.createnewtable = 1;


        if (cMap.params.s === '40') {
            cMap.feature.lineweight = 0;
        }
        if (cMap.params.s === '50') {
            cMap.feature.lineweight = 0;
        }
        if (cMap.params.s === '140') {
            cMap.feature.lineweight = 1;
        }
        if (cMap.params.s === '150') {
            cMap.feature.lineweight = 1;
        }
        if (cMap.params.s === '160') {
            cMap.feature.lineweight = 1;
        }

        newlineweight = cMap.feature.lineweight;
        newlineopacity = cMap.feature.lineopacity;
        newlinecap = 'round';

        //here's the wrinkle - we dont really care about the linecap property.  However, we need a way to differentiate between a selected features properties, and a non-selected features properties.  We cant just go by color=red, because when you mouseover a selected geography, the color will no longer be red.  So we  set the linecap property to either 'butt' (selected) or 'round' - or anything else (not selected)

        //when drawing feature, if in selected set, override default linecolor and lineweight with selected values 'red'
        for (i = 0; i < cMap.dataset.length; i = i + 1) {
            if (cMap.dataset[i] === geonum) {
                newlinecolor = cMap.params.csel;
                newlineweight = 2;
                newlineopacity = 1;
                newlinecap = 'butt';
            }
        }

        //if the mapvariable = 0 for a paricular variable, and the usezeroasnull flag is set, symbolize the geography with the null symbology
        if (mapvar === 0 && cMap.usezeroasnull === 'yes') {
            return {
                fillColor: cMap.ifzerojson,
                color: newlinecolor,
                weight: newlineweight,
                opacity: newlineopacity,
                fillOpacity: cMap.feature.fillOpacity,
                linecap: newlinecap
            };
        }

        //trickiness with 0==false;  if the mapvariable is equal to null (but not zero), symbolize the geography with the null symbology
        if (!mapvar && mapvar !== 0) {
            return {
                fillColor: cMap.ifnulljson,
                color: newlinecolor,
                weight: newlineweight,
                opacity: newlineopacity,
                fillOpacity: cMap.feature.fillOpacity,
                linecap: newlinecap
            };
        }

        //get number of colors in color ramp
        getreverse = cMap.symbolcolors.length;

        //loop through color set
        for (j = 0; j < getreverse; j = j + 1) {
            //loop through breaks; symbolize features accordingly
            if (mapvar >= cMap.breaks[j]) {
                return {
                    fillColor: cMap.symbolcolors[(getreverse - 1) - j],
                    color: newlinecolor,
                    weight: newlineweight,
                    opacity: newlineopacity,
                    fillOpacity: cMap.feature.fillOpacity,
                    linecap: newlinecap
                };
            }
        }
    } //end feat1




    //change table flavor
    function chgtblfl() {


        cMap.tblfl = $('#tableoption').val();

        if (cMap.tblfl === '-1') {
            cMap.favtable = "Plain";
        } else {
            cMap.favtable = tabletree.data[cMap.tblfl].TableAlias;
        }

        cMap.stopafterheader = 0;
        var geonums = '';

        //turn dataset into a comma delimited string and call it geoids
        geonums = cMap.dataset.join(",");

        $('#tablebody').empty();
        $('#tableheader').empty();
        $('#tablefooter').empty();

        //ajax call to load selected features

        if (cMap.dataset.length === 0) {
            cMap.stopafterheader = 1;
            geonums = '108079';
        } //if nothing selected, we still need to query database to get header info.  We give the query a dummy goenum to chew on.  It won't add that row due to the stopafterhearder variable.


        $.ajax({
            type: "POST",
            url: "https://gis.dola.colorado.gov/cmap/demogpost",
            data: "db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + cMap.table + "&geonum=" + geonums + "&moe=yes",
            dataType: 'json',
            success: function(data) {
                addRows(data, cMap);
            }
        });


    }

    //the main chart creation routine
    //input parameters are JSONdata (from chartpost.php), xwidth & xheight to control the SVG size, and stateorusavg (State/USA average from an additional ajax call to chartpost.php)
    //most of this code found in various D3 examples around the web (thus not familiar in depth with how it works) - I've made cosmetic changes only
    function dochart(JSONdata, xwidth, xheight, stateorusavg) {


        var margin, width, height, x0, x1, y0, y1, xAxis, tformat, yAxis, svg, ageNames, state, zero, errorBarArea, errorBars;
        //       var lineData;
        //       var lineFunction;


        margin = {
            top: 50,
            right: 10,
            bottom: 120,
            left: 40
        };
        width = xwidth - margin.left - margin.right;
        height = xheight - margin.top - margin.bottom;

        x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

        x1 = d3.scale.ordinal();

        y0 = d3.scale.linear()
            .range([height, 0]);

        y1 = d3.scale.linear()
            .range([height, 0]);

        xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");

        //number formatted depending on 'type' (as defined in datatree.js)
        tformat = "s";
        if (cMap.type === 'regular') {
            tformat = "g";
        }
        if (cMap.type === 'currency') {
            tformat = "$s";
        }
        if (cMap.type === 'percent') {
            tformat = "%";
        }

        yAxis = d3.svg.axis()
            .scale(y0)
            .orient("left")
            .tickFormat(d3.format(tformat));

        svg = d3.select("#chartdiv").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "svgchart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        ageNames = d3.keys(JSONdata[0]).filter(function(key) {
            return key !== "State" && key !== "moe";
        });

        JSONdata.forEach(function(d) {
            d.moe = +d.moe
            d.ages = ageNames.map(function(name) {
                return {
                    state: d.State, //added geography name so it could be accessed
                    name: name,
                    value: +d[name],
                    moe: d.moe
                        //add the margin of error to each individual
                        //data object
                };
            });
        });

        x0.domain(JSONdata.map(function(d) {
            return d.State;
        }));
        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        y0.domain([cMap.minval, d3.max(JSONdata, function(d) {
            return d3.max(d.ages, function(d) {
                return d.value + d.moe;
            });
        })]);
        y1.domain([cMap.minval, d3.max(JSONdata, function(d) {
            return d3.max(d.ages, function(d) {
                return d.value + d.moe;
            });
        })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function() {
                return "rotate(-55)";
            });

        //Line text by Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("y", 6)
            .attr("id", "titletext")
            .attr("dy", ".71em")
            .attr("transform", "translate(0,-45)")
            .style("text-anchor", "left")
            .text(cMap.current_desc);

        state = svg.selectAll(".state")
            .data(JSONdata)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) {
                return "translate(" + x0(d.State) + ",0)";
            });


        //function to format numbers
        tformat = ",g";
        if (cMap.type === 'regular') {
            tformat = "g";
        }
        if (cMap.type === 'currency') {
            tformat = "$,";
        }
        if (cMap.type === 'percent') {
            tformat = ".2%";
        }

        zero = d3.format(tformat);

        state.selectAll("rect")
            .data(function(d) {
                return d.ages;
            })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .style("opacity", 0.5)
            .attr("x", function(d) {
                return x1(d.name);
            })
            .attr("y", function(d) {
                return y0(d.value);
            })
            .attr("height", function(d) {
                return height - y0(d.value);
            })
            .style("fill", '#82bc00')
            .on("mouseover", function() {
                d3.select(this).style("opacity", 1);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 0.5);
            })
            .append("svg:title")
            .text(function(d) {
                return d.state +
                    "\n --------------------" +
                    "\n" + cMap.current_desc + ":\n" + zero(d.value) +
                    "\n --------------------" +
                    "\n90% Confidence Interval: " +
                    "\n" + zero(d.value - d.moe) + " to " +
                    zero(d.value + d.moe);
            });

        //only draw error bars if MOE is on
        if ($('#moecheck').is(":checked")) {
            errorBarArea = d3.svg.area()
                .x(function(d) {
                    return x1(d.name) + x1.rangeBand() / 2;
                })
                .y0(function(d) {
                    return y0(d.value - +d.moe);
                })
                .y1(function(d) {
                    return y0(d.value + +d.moe);
                });


            errorBars = state.selectAll("path.errorBar")
                .data(function(d) {
                    return d.ages; //one error line for each data bar
                });

            errorBars.enter().append("path").attr("class", "errorBar");

            errorBars.attr("d", function(d) {
                    return errorBarArea([d]);
                    //turn the data into a one-element array 
                    //and pass it to the area function
                })
                .attr("stroke", "#f6323e")
                .style("opacity", 0.5)
                .attr("stroke-width", 2)
                .on("mouseover", function() {
                    d3.select(this).style("opacity", 1);
                })
                .on("mouseout", function() {
                    d3.select(this).style("opacity", 0.5);
                })
                .append("svg:title")
                .text(function(d) {
                    return "MOE: ± " + zero(d.moe);
                });
        }

        //if stateorusavg is not null (it was a parameter passed in) then we draw average line, otherwise we dont
        if (stateorusavg) {

            //The line goes from 0 on the x axis to the svg width
            //the y is constant at the value of the state or us average
            var lineData = [{
                "x": 0,
                "y": stateorusavg[0].result
            }, {
                "x": width,
                "y": stateorusavg[0].result
            }];


            var lineFunction = d3.svg.line()
                .x(function(d) {
                    return d.x;
                })
                .y(function(d) {
                    return y1(d.y); //the state or us average has to be scaled to the svg height
                })
                .interpolate("linear");


            //The line SVG Path we draw

            svg.append("path")
                .attr("d", lineFunction(lineData))
                .attr("stroke", "#ef7521")
                .attr("stroke-width", 2)
                .style("opacity", 0.5)
                .style("stroke-dasharray", ("5, 2"))
                .attr("fill", "none")
                .on("mouseover", function() {
                    d3.select(this).style("opacity", 1);
                })
                .on("mouseout", function() {
                    d3.select(this).style("opacity", 0.5);
                })
                .append("svg:title")
                .text(function() {
                    return stateorusavg[0].State + ": " + zero(stateorusavg[0].result);
                });

        }


    } //end dochart



    //function receives data from addchart() - but passes it through.  
    //function responsible for determining screen size of chart by counting number of elements received from the database
    //function then retrieves percent or median data at the State level (if result set is from only one state) or national level (if result set contains geographies from multiple states)
    //that data is then passed into the chart creation routine
    function figurechart(JSONdata) {


        var resultlength, xwidth, xheight, statearray, uniqueStates, sendgeonum, i;

        //calculates the number of data items in the chart results array that was received from the database
        resultlength = JSONdata.length;

        //sets 3 separate possible chart sizes based on number of elements in JSONdata
        xwidth = 300;
        xheight = 380;

        if (resultlength > 6) {
            xwidth = 565;
            xheight = 380;
        }
        if (resultlength > 25) {
            xwidth = 865;
            xheight = 420;
        }

        //blank array that will store State information from each geography in the result set
        statearray = [];

        //loop through result set, add each state abbreviation (last two characters) into state array
        for (i = 0; i < resultlength; i = i + 1) {
            statearray.push(JSONdata[i].State.slice(-2));
        }

        //now, remove all duplicates from statearray[]
        uniqueStates = [];
        $.each(statearray, function(i, el) {
            if ($.inArray(el, uniqueStates) === -1) {
                uniqueStates.push(el);
            }
        });

        //geonum to send in next ajax call; to retrieve median or percent data at state or national level
        sendgeonum = "";

        //if current data theme is a median or percent type, retrieve data with another ajax call, otherwise dont try to retrieve state/usa average data
        if (cMap.type !== 'number') {
            //if multiple states are represented in the result set, get USA average instead of an individual state's data
            if (uniqueStates.length > 1) {
                sendgeonum = "30"; // '30' is the geonum for the USA.  FYI, this is only available by using search.data_exp in the database.
            } else {
                //else if only one state is in the result set, find the state involved, and set sendgeonum equal to that
                if (uniqueStates[0] === "AK") {
                    sendgeonum = "102";
                }
                if (uniqueStates[0] === "AL") {
                    sendgeonum = "101";
                }
                if (uniqueStates[0] === "AR") {
                    sendgeonum = "105";
                }
                if (uniqueStates[0] === "AZ") {
                    sendgeonum = "104";
                }
                if (uniqueStates[0] === "CA") {
                    sendgeonum = "106";
                }
                if (uniqueStates[0] === "CO") {
                    sendgeonum = "108";
                }
                if (uniqueStates[0] === "CT") {
                    sendgeonum = "109";
                }
                if (uniqueStates[0] === "DC") {
                    sendgeonum = "111";
                }
                if (uniqueStates[0] === "DE") {
                    sendgeonum = "110";
                }
                if (uniqueStates[0] === "FL") {
                    sendgeonum = "112";
                }
                if (uniqueStates[0] === "GA") {
                    sendgeonum = "113";
                }
                if (uniqueStates[0] === "HI") {
                    sendgeonum = "115";
                }
                if (uniqueStates[0] === "IA") {
                    sendgeonum = "119";
                }
                if (uniqueStates[0] === "ID") {
                    sendgeonum = "116";
                }
                if (uniqueStates[0] === "IL") {
                    sendgeonum = "117";
                }
                if (uniqueStates[0] === "IN") {
                    sendgeonum = "118";
                }
                if (uniqueStates[0] === "KS") {
                    sendgeonum = "120";
                }
                if (uniqueStates[0] === "KY") {
                    sendgeonum = "121";
                }
                if (uniqueStates[0] === "LA") {
                    sendgeonum = "122";
                }
                if (uniqueStates[0] === "MA") {
                    sendgeonum = "125";
                }
                if (uniqueStates[0] === "MD") {
                    sendgeonum = "124";
                }
                if (uniqueStates[0] === "ME") {
                    sendgeonum = "123";
                }
                if (uniqueStates[0] === "MI") {
                    sendgeonum = "126";
                }
                if (uniqueStates[0] === "MN") {
                    sendgeonum = "127";
                }
                if (uniqueStates[0] === "MO") {
                    sendgeonum = "129";
                }
                if (uniqueStates[0] === "MS") {
                    sendgeonum = "128";
                }
                if (uniqueStates[0] === "MT") {
                    sendgeonum = "130";
                }
                if (uniqueStates[0] === "NC") {
                    sendgeonum = "137";
                }
                if (uniqueStates[0] === "ND") {
                    sendgeonum = "138";
                }
                if (uniqueStates[0] === "NE") {
                    sendgeonum = "131";
                }
                if (uniqueStates[0] === "NH") {
                    sendgeonum = "133";
                }
                if (uniqueStates[0] === "NJ") {
                    sendgeonum = "134";
                }
                if (uniqueStates[0] === "NM") {
                    sendgeonum = "135";
                }
                if (uniqueStates[0] === "NV") {
                    sendgeonum = "132";
                }
                if (uniqueStates[0] === "NY") {
                    sendgeonum = "136";
                }
                if (uniqueStates[0] === "OH") {
                    sendgeonum = "139";
                }
                if (uniqueStates[0] === "OK") {
                    sendgeonum = "140";
                }
                if (uniqueStates[0] === "OR") {
                    sendgeonum = "141";
                }
                if (uniqueStates[0] === "PA") {
                    sendgeonum = "142";
                }
                if (uniqueStates[0] === "RI") {
                    sendgeonum = "144";
                }
                if (uniqueStates[0] === "SC") {
                    sendgeonum = "145";
                }
                if (uniqueStates[0] === "SD") {
                    sendgeonum = "146";
                }
                if (uniqueStates[0] === "TN") {
                    sendgeonum = "147";
                }
                if (uniqueStates[0] === "TX") {
                    sendgeonum = "148";
                }
                if (uniqueStates[0] === "UT") {
                    sendgeonum = "149";
                }
                if (uniqueStates[0] === "VA") {
                    sendgeonum = "151";
                }
                if (uniqueStates[0] === "VT") {
                    sendgeonum = "150";
                }
                if (uniqueStates[0] === "WA") {
                    sendgeonum = "153";
                }
                if (uniqueStates[0] === "WI") {
                    sendgeonum = "155";
                }
                if (uniqueStates[0] === "WV") {
                    sendgeonum = "154";
                }
                if (uniqueStates[0] === "WY") {
                    sendgeonum = "156";
                }

            }
            //ajax call to retrieve state or USA average from database
            $.ajax({
                type: "POST",
                url: "https://gis.dola.colorado.gov/cmap/chartpost",
                data: "db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + cMap.table + "&geonum=" + sendgeonum + "&numerator=" + encodeURIComponent(cMap.numerator) + "&denominator=" + encodeURIComponent(cMap.denominator),
                dataType: 'json'
            }).done(function(data) {
                //upon success, call the main chart creation routine - data is a json object containing the state/USA average data
                dochart(JSONdata, xwidth, xheight, data);

            });

        } else {
            //if the current data them is not a regular, percent, or currency type - then don't worry about finding an average
            //call the main chart creation routine, but send null for the state/USA average line
            dochart(JSONdata, xwidth, xheight, null);
        }

    } //end figurechart()


    //called from pressing chart button (only)
    //the addchart() function gets data from the database, then funnels it to figurechart()
    function addchart() {


        //take array of geonums and turn it into a comma delimited string
        var geonums = cMap.dataset.join(",");

        $.ajax({
            type: "POST",
            url: "https://gis.dola.colorado.gov/cmap/chartpost",
            data: "db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + cMap.table + "&geonum=" + geonums + "&numerator=" + encodeURIComponent(cMap.numerator) + "&denominator=" + encodeURIComponent(cMap.denominator),
            dataType: 'json',
            success: figurechart
        });

    } //end addchart


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
        cMap.geojsonLayer.setStyle(feat1); //restyle entire layer (restyle function includes highlighting selected features)
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
                cMap.geojsonLayer.setStyle(feat1);
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
                cMap.geojsonLayer.setStyle(feat1);
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

        cMap.geojsonLayer.setStyle(feat1);
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
                addchart();
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
            cMap.geojsonLayer.setStyle(feat1);

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
            chgtblfl();
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
            cMap.geojsonLayer.setStyle(feat1);
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