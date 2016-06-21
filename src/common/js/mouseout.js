// Create a mouseout event that undoes the mouseover changes


module.exports = function(e, cMap) {


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