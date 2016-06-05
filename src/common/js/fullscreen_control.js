module.exports = function(cMap) {

    new L.Control.Fullscreen({
        position: 'topright'
    }).addTo(cMap.map);

    //ugly patch to hide buttons that wont work
    //revisit
    cMap.map.on('fullscreenchange', function() {
        if (cMap.map.isFullscreen()) {
            console.log('entered fullscreen');
            $('.leaflet-left').hide();

        } else {
            console.log('exited fullscreen');
            $('.leaflet-left').show();
        }
    });

}