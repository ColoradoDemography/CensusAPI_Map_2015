module.exports = function(cMap) {


    /* Attribution control */ //bootleaf
    var attributionControl = L.control({
        position: "bottomright"
    });
    attributionControl.onAdd = function() {
        var div = L.DomUtil.create("div", "leaflet-control-attribution");
        div.innerHTML = "<span class='hidden-xs'>Developed by: <a href='https://demography.dola.colorado.gov'>Colorado State Demography Office</a></span><span class='spanhide'> | <a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Sources</a></span>";
        return div;
    };
    cMap.map.addControl(attributionControl);

    //MapBox and OpenStreet Map Required Attribution
    var attributionControl2 = L.control({
        position: "bottomright"
    });
    attributionControl2.onAdd = function() {
        var div = L.DomUtil.create("div", "leaflet-control-attribution");
        div.innerHTML = "<a href='https://www.mapbox.com/about/maps/' target='_blank'>Maps &copy; Mapbox &copy; OpenStreetMap</a><span class='spanhide'>&nbsp;&nbsp;&nbsp;<a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve This Map</a></span>";
        return div;
    };
    cMap.map.addControl(attributionControl2);




}