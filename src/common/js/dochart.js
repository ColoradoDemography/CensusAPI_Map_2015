//the main chart creation routine
//input parameters are JSONdata (from chartpost.php), xwidth & xheight to control the SVG size, and stateorusavg (State/USA average from an additional ajax call to chartpost.php)
//most of this code found in various D3 examples around the web (thus not familiar in depth with how it works) - I've made cosmetic changes only
module.exports = function(cMap, JSONdata, xwidth, xheight, stateorusavg) {




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




}