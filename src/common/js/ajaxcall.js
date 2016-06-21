module.exports = function(cMap) {


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