var commafy = require("./commafy.js");

module.exports = function(dataset, labelset, moedata, title) {


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