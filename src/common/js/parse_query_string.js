//On Application Startup, gets query string, breaks it apart into an object of parameters.  All initial setup options will either use these settings, or, if they dont exist, use a default setting.
module.exports = function() {
    var newstr, objURL;
    newstr = String(window.location.search);
    objURL = {};
    newstr.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
            objURL[$1] = $3;
        });
    return objURL;
}