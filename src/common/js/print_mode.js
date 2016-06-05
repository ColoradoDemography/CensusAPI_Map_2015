module.exports = function(print) {

    //this will only be accessed when phantomjs opens the app - hides elements for exporting clean image without map controls
    if (print === 'yes') {
        console.log('printing or demo mode');
        $('.leaflet-control-search').hide();
        $('.leaflet-control-zoom').hide();
        $('.leaflet-control-locate').hide();
        $('.leaflet-control-layers').hide();
        $('.leaflet-bar').hide();
        $('.navbar-nav').hide();
        $('#popup').hide();
        $('.spanhide').hide();
    }

}