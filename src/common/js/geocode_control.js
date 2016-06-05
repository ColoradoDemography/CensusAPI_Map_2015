module.exports = function(cMap) {

    //geocoder is from Google.
    var geocoder = new google.maps.Geocoder();

    //google geocoder
    function googleGeocoding(text, callResponse) {
        geocoder.geocode({
            address: text
        }, callResponse);
    }

    //google geocoder function
    function filterJSONCall(rawjson) {
        var i, json = {},
            key, loc;

        for (i in rawjson) {
            if (rawjson.hasOwnProperty(i)) {
                key = rawjson[i].formatted_address;
                loc = L.latLng(rawjson[i].geometry.location.lat(), rawjson[i].geometry.location.lng());
                json[key] = loc; //key,value format
            }
        }


        return json;
    }

    //google geocoder
    cMap.map.addControl(new L.Control.Search({
        callData: googleGeocoding,
        filterJSON: filterJSONCall,
        markerLocation: false,
        autoType: true,
        autoCollapse: false,
        minLength: 4,
        position: 'topright'
    }));


}