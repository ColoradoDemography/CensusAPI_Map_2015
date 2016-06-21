module.exports = function(cMap) {



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


}