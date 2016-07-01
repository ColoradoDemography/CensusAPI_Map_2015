var dochart = require("./dochart.js");


//function receives data from addchart() - but passes it through.  
//function responsible for determining screen size of chart by counting number of elements received from the database
//function then retrieves percent or median data at the State level (if result set is from only one state) or national level (if result set contains geographies from multiple states)
//that data is then passed into the chart creation routine
module.exports = function(cMap, JSONdata) {

    var resultlength, xwidth, xheight, statearray, uniqueStates, sendgeonum, i;

    //calculates the number of data items in the chart results array that was received from the database
    resultlength = JSONdata.length;

    //sets 3 separate possible chart sizes based on number of elements in JSONdata
    xwidth = 300;
    xheight = 380;

    if (resultlength > 6) {
        xwidth = 565;
        xheight = 380;
    }
    if (resultlength > 25) {
        xwidth = 865;
        xheight = 420;
    }

    //blank array that will store State information from each geography in the result set
    statearray = [];

    //loop through result set, add each state abbreviation (last two characters) into state array
    for (i = 0; i < resultlength; i = i + 1) {
        statearray.push(JSONdata[i].State.slice(-2));
    }

    //now, remove all duplicates from statearray[]
    uniqueStates = [];
    $.each(statearray, function(i, el) {
        if ($.inArray(el, uniqueStates) === -1) {
            uniqueStates.push(el);
        }
    });

    //geonum to send in next ajax call; to retrieve median or percent data at state or national level
    sendgeonum = "";

    //if current data theme is a median or percent type, retrieve data with another ajax call, otherwise dont try to retrieve state/usa average data
    if (cMap.type !== 'number') {
        //if multiple states are represented in the result set, get USA average instead of an individual state's data
        if (uniqueStates.length > 1) {
            sendgeonum = "30"; // '30' is the geonum for the USA.  FYI, this is only available by using search.data_exp in the database.
        } else {
            //else if only one state is in the result set, find the state involved, and set sendgeonum equal to that
            if (uniqueStates[0] === "AK") {
                sendgeonum = "102";
            }
            if (uniqueStates[0] === "AL") {
                sendgeonum = "101";
            }
            if (uniqueStates[0] === "AR") {
                sendgeonum = "105";
            }
            if (uniqueStates[0] === "AZ") {
                sendgeonum = "104";
            }
            if (uniqueStates[0] === "CA") {
                sendgeonum = "106";
            }
            if (uniqueStates[0] === "CO") {
                sendgeonum = "108";
            }
            if (uniqueStates[0] === "CT") {
                sendgeonum = "109";
            }
            if (uniqueStates[0] === "DC") {
                sendgeonum = "111";
            }
            if (uniqueStates[0] === "DE") {
                sendgeonum = "110";
            }
            if (uniqueStates[0] === "FL") {
                sendgeonum = "112";
            }
            if (uniqueStates[0] === "GA") {
                sendgeonum = "113";
            }
            if (uniqueStates[0] === "HI") {
                sendgeonum = "115";
            }
            if (uniqueStates[0] === "IA") {
                sendgeonum = "119";
            }
            if (uniqueStates[0] === "ID") {
                sendgeonum = "116";
            }
            if (uniqueStates[0] === "IL") {
                sendgeonum = "117";
            }
            if (uniqueStates[0] === "IN") {
                sendgeonum = "118";
            }
            if (uniqueStates[0] === "KS") {
                sendgeonum = "120";
            }
            if (uniqueStates[0] === "KY") {
                sendgeonum = "121";
            }
            if (uniqueStates[0] === "LA") {
                sendgeonum = "122";
            }
            if (uniqueStates[0] === "MA") {
                sendgeonum = "125";
            }
            if (uniqueStates[0] === "MD") {
                sendgeonum = "124";
            }
            if (uniqueStates[0] === "ME") {
                sendgeonum = "123";
            }
            if (uniqueStates[0] === "MI") {
                sendgeonum = "126";
            }
            if (uniqueStates[0] === "MN") {
                sendgeonum = "127";
            }
            if (uniqueStates[0] === "MO") {
                sendgeonum = "129";
            }
            if (uniqueStates[0] === "MS") {
                sendgeonum = "128";
            }
            if (uniqueStates[0] === "MT") {
                sendgeonum = "130";
            }
            if (uniqueStates[0] === "NC") {
                sendgeonum = "137";
            }
            if (uniqueStates[0] === "ND") {
                sendgeonum = "138";
            }
            if (uniqueStates[0] === "NE") {
                sendgeonum = "131";
            }
            if (uniqueStates[0] === "NH") {
                sendgeonum = "133";
            }
            if (uniqueStates[0] === "NJ") {
                sendgeonum = "134";
            }
            if (uniqueStates[0] === "NM") {
                sendgeonum = "135";
            }
            if (uniqueStates[0] === "NV") {
                sendgeonum = "132";
            }
            if (uniqueStates[0] === "NY") {
                sendgeonum = "136";
            }
            if (uniqueStates[0] === "OH") {
                sendgeonum = "139";
            }
            if (uniqueStates[0] === "OK") {
                sendgeonum = "140";
            }
            if (uniqueStates[0] === "OR") {
                sendgeonum = "141";
            }
            if (uniqueStates[0] === "PA") {
                sendgeonum = "142";
            }
            if (uniqueStates[0] === "RI") {
                sendgeonum = "144";
            }
            if (uniqueStates[0] === "SC") {
                sendgeonum = "145";
            }
            if (uniqueStates[0] === "SD") {
                sendgeonum = "146";
            }
            if (uniqueStates[0] === "TN") {
                sendgeonum = "147";
            }
            if (uniqueStates[0] === "TX") {
                sendgeonum = "148";
            }
            if (uniqueStates[0] === "UT") {
                sendgeonum = "149";
            }
            if (uniqueStates[0] === "VA") {
                sendgeonum = "151";
            }
            if (uniqueStates[0] === "VT") {
                sendgeonum = "150";
            }
            if (uniqueStates[0] === "WA") {
                sendgeonum = "153";
            }
            if (uniqueStates[0] === "WI") {
                sendgeonum = "155";
            }
            if (uniqueStates[0] === "WV") {
                sendgeonum = "154";
            }
            if (uniqueStates[0] === "WY") {
                sendgeonum = "156";
            }

        }
        //ajax call to retrieve state or USA average from database
        $.ajax({
            type: "POST",
            url: "https://gis.dola.colorado.gov/cmap/chartpost",
            data: "db=" + cMap.db + "&schema=" + cMap.schema + "&table=" + cMap.table + "&geonum=" + sendgeonum + "&numerator=" + encodeURIComponent(cMap.numerator) + "&denominator=" + encodeURIComponent(cMap.denominator),
            dataType: 'json'
        }).done(function(data) {
            //upon success, call the main chart creation routine - data is a json object containing the state/USA average data
            dochart(cMap, JSONdata, xwidth, xheight, data);

        });

    } else {
        //if the current data them is not a regular, percent, or currency type - then don't worry about finding an average
        //call the main chart creation routine, but send null for the state/USA average line
        dochart(cMap, JSONdata, xwidth, xheight, null);
    }


}