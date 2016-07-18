var updatequerysearchstring = require("./update_query_string.js");
var changeall = require("./changeall.js");

module.exports = function(cMap) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://gis.dola.colorado.gov/cmap/getdb');
    xhr.send(null);

    xhr.onreadystatechange = function() {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log(xhr.responseText); // 'This is the returned text.'
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                var htmlStr = "";
                response.forEach(d=>{
                  htmlStr+="<input type='radio' name='update_dataset' class='update_dataset' value='" + d.datname + "'>" + d.datname.toUpperCase() + "<br />";
                });
                document.getElementById('db_modal_body').innerHTML = htmlStr;
                
              var classname = document.getElementsByClassName("update_dataset");

var myFunction = function() {
    var attribute = this.getAttribute("value");
    console.log(attribute);
  cMap.db=attribute;
          updatequerysearchstring(cMap);
        changeall(cMap, 'yes', '0');
};

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myFunction, false);
}
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
    }
    
};


}