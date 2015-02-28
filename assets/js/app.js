var TrelloClipboard;

TrelloClipboard = new ((function () {
    function _Class() {
      this.value = function(){return window.location.href;};
        $(document).keydown((function (_this) {
            return function (e) {
                var _ref, _ref1;
                if (!_this.value || !(e.ctrlKey || e.metaKey)) {
                    return;
                }
                if ($(e.target).is("input:visible,textarea:visible")) {
                    return;
                }
                if (typeof window.getSelection === "function" ? (_ref = window.getSelection()) != null ? _ref.toString() : void 0 : void 0) {
                    return;
                }
                if ((_ref1 = document.selection) != null ? _ref1.createRange().text : void 0) {
                    return;
                }
                return $.Deferred(function () {
                    var $clipboardContainer;
                    $clipboardContainer = $("#clipboard-container");
                    $clipboardContainer.empty().show();
                    return $("<textarea id='clipboard'></textarea>").val(_this.value).appendTo($clipboardContainer).focus().select();
                });
            };
        })(this));
        $(document).keyup(function (e) {
            if ($(e.target).is("#clipboard")) {
                return $("#clipboard-container").empty().hide();
            }
        });
    }

    _Class.prototype.set = function (value) {
        this.value = value;
    };

    return _Class;

})());

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function download(pictype){
  
var newobj={};
  
  newobj.type=pictype;  
  newobj.outname=makeid();		//output file name  ... makeid() is function creates random 5 letter filename	  
  

  var tempp = parseQueryString();
  
  newobj.lat = tempp.lat;
  newobj.lng = tempp.lng;
  newobj.z = tempp.z;
  newobj.s = tempp.s;
  newobj.v = tempp.v;
  newobj.sn = tempp.sn;
  newobj.cs = tempp.cs;
  newobj.cl = tempp.cl;
  if(tempp.tr!==undefined){newobj.tr = tempp.tr;}
  if(tempp.d!==undefined){newobj.d = tempp.d;}
  
map.spin(true);
 
  
           setTimeout(function(){
console.log('5 seconds');
      $("#progressbar").css('width','20%').stop();
      $("#progressbar").html('20%');
        },5000);
         
         setTimeout(function(){
        $("#progressbar").css('width','40%').stop();
      $("#progressbar").html('40%');         
console.log('10 seconds');
        },10000);
                 
         setTimeout(function(){
                 $("#progressbar").css('width','60%').stop();
      $("#progressbar").html('60%');
console.log('15 seconds');
        },15000);
                 
        setTimeout(function(){
                $("#progressbar").css('width','80%').stop();
      $("#progressbar").html('80%');
          console.log('20 seconds');
        },20000);
        
        setTimeout(function(){
                    map.spin(false);
                $("#progressbar").css('width','100%').stop();
      $("#progressbar").html('100%');
          console.log('25 seconds');
        },25000);     

  
  	  $.get("do.php",newobj,function(){

          window.open("http://"+window.location.hostname + "/CensusAPI_Map/dump/"+newobj.outname+"."+pictype);
	  });
  
}

function resetslider(){
  
                  $("#progressbar").css('width','0%').stop();
      $("#progressbar").html('0%');
}

History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state

  
    });

function updatequerysearchstring(){
  
  var ch=''; //chart
  var tr=''; //transparency
  var s='&s='+sumlev; //sumlev
  var v='&v='+varcode; //varcode
  var sn='&sn='+schemename; 
  var cs='&cs='+colorscheme;
  var cl='&cl='+classes;
  var dt='';
   var d='';
  var moe='';
  
  if(dataset.length!==0){
    var dstring=dataset.join();
    var compressed = LZString.compressToEncodedURIComponent(dstring);
    d='&d='+compressed;
  }
  
  if($('#resizediv').is(':visible')){
     var btnstate=$('#closebtn').css('top');   
      if(btnstate=='3px'){
        dt='&dt=yes';
  }else{
   dt='&dt=max';
  }
  }
  
  if($("[name='my-checkbox']").is(':checked')){}else{moe='&moe=no';}
  
  //only adding these if they differ from the defaults
  if($('#chartModal').hasClass('in')){ch="&ch=yes";}
  if(fillOpacity!==0.5){tr="&tr="+fillOpacity;}
  
    var urlstr='?'+'lat='+map.getCenter().lat +'&lng='+map.getCenter().lng + '&z='+map.getZoom()+ch+tr+s+v+sn+cs+cl+dt+moe+d;
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + urlstr;
    History.pushState({path:newurl},'',newurl);

  
}

parseQueryString = function () {

                    newstr = String(window.location.search);
                   // var n = newstr.replace(/qq/g, "&");
                    var o = newstr.replace("?", "");  
  
                    var objURL = {};

                    newstr.replace(
                        new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
                        objURL[$1] = $3;
                    });
                    return objURL;

                };

//called from pressing chart button (only)
//the addchart() function gets data from the database, then funnels it to figurechart()
function addchart() {

    //take array of geonums and turn it into a comma delimited string
    var geonums = dataset.join(",");

    $.ajax({
        type: "POST",
        url: "assets/php/chartpost.php",
        data: "db=acs0913&schema=data&table=" + table + "&geonum=" + geonums + "&numerator=" + encodeURIComponent(numerator) + "&denominator=" + encodeURIComponent(denominator),
        dataType: 'json',
        jsonpCallback: 'getJson',
        success: figurechart
    });

}  //end addchart

//function receives data from addchart() - but passes it through.  
//function responsible for determining screen size of chart by counting number of elements received from the database
//function then retrieves percent or median data at the State level (if result set is from only one state) or national level (if result set contains geographies from multiple states)
//that data is then passed into the chart creation routine
function figurechart(JSONdata) {

    //calculates the number of data items in the chart results array that was received from the database
    var resultlength = JSONdata.length;

    //sets 3 separate possible chart sizes based on number of elements in JSONdata
    var xwidth = 300,
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
    var statearray = [];

    //loop through result set, add each state abbreviation (last two characters) into state array
    for (i = 0; i < resultlength; i++) {
        statearray.push(JSONdata[i].State.slice(-2));
    }

    //now, remove all duplicates from statearray[]
    var uniqueStates = [];
    $.each(statearray, function(i, el) {
        if ($.inArray(el, uniqueStates) === -1) uniqueStates.push(el);
    });

    //geonum to send in next ajax call; to retrieve median or percent data at state or national level
    var sendgeonum = "";

    //if current data theme is a median or percent type, retrieve data with another ajax call, otherwise dont try to retrieve state/usa average data
    if (type !== 'number') {
        //if multiple states are represented in the result set, get USA average instead of an individual state's data
        if (uniqueStates.length > 1) {
            sendgeonum = "30"; // '30' is the geonum for the USA.  FYI, this is only available by using search.data_exp in the database.
        } else {
            //else if only one state is in the result set, find the state involved, and set sendgeonum equal to that
            if (uniqueStates[0] == "AK") {
                sendgeonum = "102";
            }
            if (uniqueStates[0] == "AL") {
                sendgeonum = "101";
            }
            if (uniqueStates[0] == "AR") {
                sendgeonum = "105";
            }
            if (uniqueStates[0] == "AZ") {
                sendgeonum = "104";
            }
            if (uniqueStates[0] == "CA") {
                sendgeonum = "106";
            }
            if (uniqueStates[0] == "CO") {
                sendgeonum = "108";
            }
            if (uniqueStates[0] == "CT") {
                sendgeonum = "109";
            }
            if (uniqueStates[0] == "DC") {
                sendgeonum = "111";
            }
            if (uniqueStates[0] == "DE") {
                sendgeonum = "110";
            }
            if (uniqueStates[0] == "FL") {
                sendgeonum = "112";
            }
            if (uniqueStates[0] == "GA") {
                sendgeonum = "113";
            }
            if (uniqueStates[0] == "HI") {
                sendgeonum = "115";
            }
            if (uniqueStates[0] == "IA") {
                sendgeonum = "119";
            }
            if (uniqueStates[0] == "ID") {
                sendgeonum = "116";
            }
            if (uniqueStates[0] == "IL") {
                sendgeonum = "117";
            }
            if (uniqueStates[0] == "IN") {
                sendgeonum = "118";
            }
            if (uniqueStates[0] == "KS") {
                sendgeonum = "120";
            }
            if (uniqueStates[0] == "KY") {
                sendgeonum = "121";
            }
            if (uniqueStates[0] == "LA") {
                sendgeonum = "122";
            }
            if (uniqueStates[0] == "MA") {
                sendgeonum = "125";
            }
            if (uniqueStates[0] == "MD") {
                sendgeonum = "124";
            }
            if (uniqueStates[0] == "ME") {
                sendgeonum = "123";
            }
            if (uniqueStates[0] == "MI") {
                sendgeonum = "126";
            }
            if (uniqueStates[0] == "MN") {
                sendgeonum = "127";
            }
            if (uniqueStates[0] == "MO") {
                sendgeonum = "129";
            }
            if (uniqueStates[0] == "MS") {
                sendgeonum = "128";
            }
            if (uniqueStates[0] == "MT") {
                sendgeonum = "130";
            }
            if (uniqueStates[0] == "NC") {
                sendgeonum = "137";
            }
            if (uniqueStates[0] == "ND") {
                sendgeonum = "138";
            }
            if (uniqueStates[0] == "NE") {
                sendgeonum = "131";
            }
            if (uniqueStates[0] == "NH") {
                sendgeonum = "133";
            }
            if (uniqueStates[0] == "NJ") {
                sendgeonum = "134";
            }
            if (uniqueStates[0] == "NM") {
                sendgeonum = "135";
            }
            if (uniqueStates[0] == "NV") {
                sendgeonum = "132";
            }
            if (uniqueStates[0] == "NY") {
                sendgeonum = "136";
            }
            if (uniqueStates[0] == "OH") {
                sendgeonum = "139";
            }
            if (uniqueStates[0] == "OK") {
                sendgeonum = "140";
            }
            if (uniqueStates[0] == "OR") {
                sendgeonum = "141";
            }
            if (uniqueStates[0] == "PA") {
                sendgeonum = "142";
            }
            if (uniqueStates[0] == "RI") {
                sendgeonum = "144";
            }
            if (uniqueStates[0] == "SC") {
                sendgeonum = "145";
            }
            if (uniqueStates[0] == "SD") {
                sendgeonum = "146";
            }
            if (uniqueStates[0] == "TN") {
                sendgeonum = "147";
            }
            if (uniqueStates[0] == "TX") {
                sendgeonum = "148";
            }
            if (uniqueStates[0] == "UT") {
                sendgeonum = "149";
            }
            if (uniqueStates[0] == "VA") {
                sendgeonum = "151";
            }
            if (uniqueStates[0] == "VT") {
                sendgeonum = "150";
            }
            if (uniqueStates[0] == "WA") {
                sendgeonum = "153";
            }
            if (uniqueStates[0] == "WI") {
                sendgeonum = "155";
            }
            if (uniqueStates[0] == "WV") {
                sendgeonum = "154";
            }
            if (uniqueStates[0] == "WY") {
                sendgeonum = "156";
            }

        }
        //ajax call to retrieve state or USA average from database
        $.ajax({
            type: "POST",
            url: "assets/php/chartpost.php",
            data: "db=acs0913&schema=data&table=" + table + "&geonum=" + sendgeonum + "&numerator=" + encodeURIComponent(numerator) + "&denominator=" + encodeURIComponent(denominator),
            dataType: 'json',
            jsonpCallback: 'getJson',
        }).done(function(data) {
            //upon success, call the main chart creation routine - data is a json object containing the state/USA average data
            dochart(JSONdata, xwidth, xheight, data);

        });

    } else {
        //if the current data them is not a regular, percent, or currency type - then don't worry about finding an average
        //call the main chart creation routine, but send null for the state/USA average line
        dochart(JSONdata, xwidth, xheight, null);
    }

} //end figurechart()

//the main chart creation routine
//input parameters are JSONdata (from chartpost.php), xwidth & xheight to control the SVG size, and stateorusavg (State/USA average from an additional ajax call to chartpost.php)
//most of this code found in various D3 examples around the web (thus not familiar in depth with how it works) - I've made cosmetic changes only
function dochart(JSONdata, xwidth, xheight, stateorusavg) {


        var margin = {
                top: 50,
                right: 10,
                bottom: 120,
                left: 40
            },
            width = xwidth - margin.left - margin.right,
            height = xheight - margin.top - margin.bottom;

        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

        var x1 = d3.scale.ordinal();

        var y0 = d3.scale.linear()
            .range([height, 0]);

        var y1 = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");

        //number formatted depending on 'type' (as defined in datatree.js)
        var tformat = "s";
        if (type == 'regular') {
            tformat = "g";
        }
        if (type == 'currency') {
            tformat = "$s";
        }
        if (type == 'percent') {
            tformat = "%";
        }

        var yAxis = d3.svg.axis()
            .scale(y0)
            .orient("left")
            .tickFormat(d3.format(tformat));

        var svg = d3.select("#chartdiv").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "svgchart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        data = JSONdata;
        var ageNames = d3.keys(data[0]).filter(function(key) {
            return key !== "State" && key !== "moe";
        });

        data.forEach(function(d) {
            d.moe = +d.moe
            d.ages = ageNames.map(function(name) {
                return {
                    state: d.State,  //added geography name so it could be accessed
                    name: name,
                    value: +d[name],
                    moe: d.moe
                        //add the margin of error to each individual
                        //data object
                };
            });
        });

        x0.domain(data.map(function(d) {
            return d.State;
        }));
        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        y0.domain([minval, d3.max(data, function(d) {
            return d3.max(d.ages, function(d) {
                return d.value + d.moe;
            });
        })]);
        y1.domain([minval, d3.max(data, function(d) {
            return d3.max(d.ages, function(d) {
                return d.value + d.moe;
            });
        })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-55)";
            });

        //Line text by Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("y", 6)
            .attr("id", "titletext")
            .attr("dy", ".71em")
            .attr("transform", "translate(0,-45)")
            .style("text-anchor", "left")
            .text(current_desc);

        var state = svg.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) {
                return "translate(" + x0(d.State) + ",0)";
            });


        //function to format numbers
        tformat = ",g";
        if (type == 'regular') {
            tformat = "g";
        }
        if (type == 'currency') {
            tformat = "$,";
        }
        if (type == 'percent') {
            tformat = ".2%";
        }

        var zero = d3.format(tformat);

        state.selectAll("rect")
            .data(function(d) {
                return d.ages;
            })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .style("opacity", 0.5)
            .attr("x", function(d) {
                return x1(d.name);
            })
            .attr("y", function(d) {
                return y0(d.value);
            })
            .attr("height", function(d) {
                return height - y0(d.value);
            })
            .style("fill", '#82bc00')
            .on("mouseover", function(d) {
                d3.select(this).style("opacity", 1);
            })
            .on("mouseout", function(d) {
                d3.select(this).style("opacity", 0.5);
            })
            .append("svg:title")
            .text(function(d) {
                return d.state +
                    "\n --------------------" +
                    "\n" + current_desc + ":\n" + zero(d.value) +
                    "\n --------------------" +
                    "\n90% Confidence Interval: " +
                    "\n" + zero(d.value - d.moe) + " to " + 
                    zero(d.value + d.moe);
            });

  //only draw error bars if MOE is on
  if($('#moecheck').is(":checked")){
        var errorBarArea = d3.svg.area()
            .x(function(d) {
                return x1(d.name) + x1.rangeBand() / 2;
            })
            .y0(function(d) {
                return y0(d.value - +d.moe);
            })
            .y1(function(d) {
                return y0(d.value + +d.moe);
            });


        var errorBars = state.selectAll("path.errorBar")
            .data(function(d) {
                return d.ages; //one error line for each data bar
            });

        errorBars.enter().append("path").attr("class", "errorBar");

        errorBars.attr("d", function(d) {
                return errorBarArea([d]);
                //turn the data into a one-element array 
                //and pass it to the area function
            })
            .attr("stroke", "#f6323e")
            .style("opacity", 0.5)
            .attr("stroke-width", 2)
            .on("mouseover", function(d) {
                d3.select(this).style("opacity", 1);
            })
            .on("mouseout", function(d) {
                d3.select(this).style("opacity", 0.5);
            })
            .append("svg:title")
            .text(function(d) {
                return "MOE: ± " + zero(d.moe);
            });
}
  
        //if stateorusavg is not null (it was a parameter passed in) then we draw average line, otherwise we dont
        if (stateorusavg) {

            //The line goes from 0 on the x axis to the svg width
            //the y is constant at the value of the state or us average
            var lineData = [{
                "x": 0,
                "y": stateorusavg[0].result
            }, {
                "x": width,
                "y": stateorusavg[0].result
            }];


            var lineFunction = d3.svg.line()
                .x(function(d) {
                    return d.x;
                })
                .y(function(d) {
                    return y1(d.y);  //the state or us average has to be scaled to the svg height
                })
                .interpolate("linear");


            //The line SVG Path we draw
            var lineGraph = svg.append("path")
                .attr("d", lineFunction(lineData))
                .attr("stroke", "#ef7521")
                .attr("stroke-width", 2)
                .style("opacity", 0.5)
                .style("stroke-dasharray", ("5, 2"))
                .attr("fill", "none")
                .on("mouseover", function(d) {
                    d3.select(this).style("opacity", 1);
                })
                .on("mouseout", function(d) {
                    d3.select(this).style("opacity", 0.5);
                })
                .append("svg:title")
                .text(function(d) {
                    return stateorusavg[0].State + ": " + zero(stateorusavg[0].result);
                });

        }


    } //end dochart



//symbolize everything right here!!!  Every geography feature in the view is iterated over
function feat1(feature) {

  //createnewtable is the flag to redraw the data table.  Set to 0 means redraw, set to 1 means don't redraw
    if (createnewtable === 0) {
       redrawTable();
    }
    createnewtable = 1;

  
    var fp = feature.properties; //shorthand way to refer to feature.properties
    var mapvar = eval(formula);  //the actual computed value of the theme variable
    var geonum = fp.geonum; //the id of the geography
    var newlinecolor = linecolor; //get default lincolor, lineweight, and lineopacity values

  
  if(sumlev==40){lineweight=0;}
  if(sumlev==50){lineweight=0;}
  if(sumlev==140){lineweight=1;}
  if(sumlev==150){lineweight=1;}
  if(sumlev==160){lineweight=1;}
  
      var newlineweight = lineweight;
    var newlineopacity = lineopacity;
    var newlinecap = 'round';  //here's the wrinkle - we dont really care about the linecap property.  However, we need a way to differentiate between a selected features properties, and a non-selected features properties.  We cant just go by color=red, because when you mouseover a selected geography, the color will no longer be red.  So we  set the linecap property to either 'butt' (selected) or 'round' - or anything else (not selected)

    //when drawing feature, if in selected set, override default linecolor and lineweight with selected values 'red'
    for (i = 0; i < dataset.length; i++) {
        if (dataset[i] == geonum) {
            newlinecolor = cselected;
            newlineweight = 2;
            newlineopacity = 1;
            newlinecap = 'butt';
        }
    }
    
    //if the mapvariable = 0 for a paricular variable, and the usezeroasnull flag is set, symbolize the geography with the null symbology
    if (mapvar === 0 && usezeroasnull == 'yes') {
        return {
            fillColor: ifzerojson,
            color: newlinecolor,
            weight: newlineweight,
            opacity: newlineopacity,
            fillOpacity: fillOpacity,
            linecap: newlinecap
        };
    }

    //trickiness with 0==false;  if the mapvariable is equal to null (but not zero) and the usenull flag is set, symbolize the geography with the null symbology
    if (!mapvar && mapvar !== 0 && usenull == 'yes') {
        return {
            fillColor: ifnulljson,
            color: newlinecolor,
            weight: newlineweight,
            opacity: newlineopacity,
            fillOpacity: fillOpacity,
            linecap: newlinecap
        };
    }

    //get number of colors in color ramp
    var getreverse = symbolcolors.length;

    //loop through color set
    for (j = 0; j < getreverse; j++) {
          //loop through breaks; symbolize features accordingly
        if (mapvar >= breaks[j]) {
            return {
                fillColor: symbolcolors[(getreverse - 1) - j],
                color: newlinecolor,
                weight: newlineweight,
                opacity: newlineopacity,
                fillOpacity: fillOpacity,
                linecap: newlinecap
            };
        }
    }
}  //end feat1


  //called from index.html.  Determines whether to show or hide form controls based on whether the value of the select by attribute dropdown is equal to 'None'
function advenable(curval) {
    if (curval == 'none') {
        $("#advsign").prop("disabled", true);
        $("#advtext").prop("disabled", true);
    } else {
        $("#advsign").prop("disabled", false);
        $("#advtext").prop("disabled", false);
    }
} //end advenable

//called from index.html when select button is pressed in advanced tools
function querygeonums() {

    var advstate = $("#advstate").val();  //state selected
    var advattribute = $("#advattribute").val();  //criteria (median household income, etc)
    var advsign = $("#advsign").val(); //sign; greater than, less than, etc
    var advtext = $("#advtext").val(); //value (as in: median household income is greater than VALUE)

    advtext = advtext.replace(/[^0-9\.]+/g, ''); //strip non numeric from VALUE text

    var advtable;
    var advnumerator;
    var advdenominator;

    //loop through datatree (where data themes are defined), find varcode that matches the CRITERIA and assigns table, numerator, and denominator variables
    for (i = 0; i < datatree.data.length; i++) {
        if (advattribute == datatree.data[i].varcode) {
            advtable = datatree.data[i].table;
            advnumerator = datatree.data[i].numerator;
            advdenominator = datatree.data[i].denominator;
        }
    }
  
    //send paramters found above to advsearch.php, where query will return a list of geonums that fit that qualification
    $.ajax({
        url: "assets/php/advsearch.php?advsumlev=" + sumlev + "&advstate=" + advstate + "&advsign=" + advsign + "&advtext=" + advtext + "&advtable=" + advtable + "&advnumerator=" + encodeURIComponent(advnumerator) + "&advdenominator=" + encodeURIComponent(advdenominator),
        dataType: 'json',
        jsonpCallback: 'getJson',
        success: selectgeonums
    });

}

//function selects all matching geographies, highlights them, puts them into/draws table
function selectgeonums(data) {

    dataset = [];  //clear existing selection (may want to think about option to add to existing selection set)
    for (i = 0; i < data.length; i++) {
        dataset.push(data[i]); //add each new geonum into dataset[]
    }
  
    createnewtable = 0; //set flag to redraw table - which will be called in the styling function
    geojsonLayer.setStyle(feat1); //restyle entire layer (restyle function includes highlighting selected features)
  updatequerysearchstring();

}

//format number - may want to replace all references to this with the D3 format function instead, which is more flexible
//i did not write this, found it online
Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

////LEFT OFF HERE
function getCSVData() {
    var csv_value = $('#table').table2CSV({
        delivery: 'value'
    });
    $("#csv_text").val(csv_value);
}

//globals
//comment all of these
//varlist
L.mapbox.accessToken = 'pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg';
var params = parseQueryString();

var stopafterheader = 0;
var createnewtable = 0;
var summable;
var favtable = 'Median Household Income';

var globalbusy=0;
var tblfl = '-1'; //tableflavor default to plain
var map;
var current_desc = ""; //name of the current census variable being mapped
var numerator = []; //[]needed?
var denominator = [];
var moenumerator;
var moedenominator;
var moeformula;
var data;
var sumlev = '50';
var limit = '10000';
var db = 'acs0913';
var schema = 'data';
var demogdatalayer;
var table = 'b19013';
var formula = 'fp.b19013001';
var usenull = 'yes';
var usezeroasnull = 'yes';
var breaks = [];
var varcode = 'mhi';
var ifnulljson = {};
var ifzerojson = {};
var symbolcolors = [];
var type = "";
var mininc = 0;
var minval = 0;
var geojsonLayer;
var cselected='red';
var cmouseover='rgb(128,0,127)';

//universal
var linecolor = "Gray";
var lineweight = 0;
var lineopacity = 0.2; //transparency control
var fillOpacity = 0.5; //transparency control

//symbology
var colorscheme = "mh1";
var classes = 7;
var schemename = "jenks";

//data table ??empty??
var dataset = [];

//map bounds the last time the data was loaded
var nelat, nelng, swlat, swlng;
var lastzoom=8;



    if(params.v!==undefined){	
		varcode=params.v;
	};

function cselectedchg(newcolor){
  cselected=newcolor;
}

function cmouseoverchg(newcolor){
  cmouseover=newcolor;
}



$("#about-btn").click(function() {
    $("#aboutModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});
$("#advanced-btn").click(function() {
    $("#symbologyModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});
$("#nav-btn").click(function() {
    $(".navbar-collapse").collapse("toggle");
    return false;
});



/* Basemap Layers */
var mbstyle = L.mapbox.tileLayer('statecodemog.aa380654', {
    'zIndex': 1
});

var mbsat = L.mapbox.tileLayer('statecodemog.km7i3g01');

var mapboxST = L.tileLayer('http://{s}.tiles.mapbox.com/v3/statecodemog.map-392qgzze/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/">&copy; Map Box and OpenStreetMap</a>',
    maxZoom: 18
});
var Stamen_Terrain = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 4,
    maxZoom: 18
});

	var latcoord=39;
	var lngcoord=-104.8;
	var zoomlev=9;

	if(params.lat!==undefined){	
		latcoord=params.lat;
	};

	if(params.lng!==undefined){	
		lngcoord=params.lng;
	};

	if(params.z!==undefined){	
		zoomlev=params.z;
	};


map = L.map("map", {
    zoom: zoomlev,
    center: [latcoord, lngcoord],
    minZoom: 4,
    layers: [mbstyle],
    zoomControl: false,
    attributionControl: false
});


  	if(params.s!==undefined){	
		sumlev=params.s;
      $("input[name=geoRadios][value=" + sumlev + "]").prop('checked', true);
	};

        if (sumlev == '50') {
          map.options.minZoom = 4;
            $('#advgeo').text('counties');
        }
        if (sumlev == '40') {
          map.options.minZoom = 4;
            $('#advgeo').text('states');
        }
        if (sumlev == '140') {
                    map.options.minZoom = 9;
            $('#advgeo').text('tracts');
        }
        if (sumlev == '150') {
                    map.options.minZoom = 9;
            $('#advgeo').text('block groups');
        }
        if (sumlev == '160') {
                    map.options.minZoom = 9;
            $('#advgeo').text('places');
        }

var mblabels = L.mapbox.tileLayer('statecodemog.798453f5', {
    'clickable': 'false',
    'zIndex': 1000
});


//create map sandwich
var topPane = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
var topLayer = mblabels.addTo(map);
topPane.appendChild(topLayer.getContainer());


var baseLayers = {
    "Mapbox: Satellite": mbsat,
    "Mapbox: Contrast Base": mbstyle,
    "Mapbox: Streets": mapboxST,
    "Stamen Terrain": Stamen_Terrain
};


var groupedOverlays = {
//  "Labels and Borders": mblabels
};



/* Attribution control */
var attributionControl = L.control({
    position: "bottomright"
});
attributionControl.onAdd = function(map) {
    var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by: <a href='http://www.colorado.gov/demography'>Colorado State Demography Office</a></span><span class='spanhide'> | <a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Sources</a></span>";
    return div;
};
map.addControl(attributionControl);

//MapBox and OpenStreet Map Required Attribution
var attributionControl2 = L.control({
    position: "bottomright"
});
attributionControl2.onAdd = function(map) {
    var div = L.DomUtil.create("div", "leaflet-control-attribution");
    div.innerHTML = "<a href='https://www.mapbox.com/about/maps/' target='_blank'>Maps &copy; Mapbox &copy; OpenStreetMap</a><span class='spanhide'>&nbsp;&nbsp;&nbsp;<a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve This Map</a></span>";
    return div;
};
map.addControl(attributionControl2);

var geocoder = new google.maps.Geocoder();

function googleGeocoding(text, callResponse) {
    geocoder.geocode({
        address: text
    }, callResponse);
}

function filterJSONCall(rawjson) {
    var json = {},
        key, loc, disp = [];
    for (var i in rawjson) {
        key = rawjson[i].formatted_address;
        loc = L.latLng(rawjson[i].geometry.location.lat(), rawjson[i].geometry.location.lng());
        json[key] = loc; //key,value format
    }
    return json;
}

var searchControl = map.addControl(new L.Control.Search({
    callData: googleGeocoding,
    filterJSON: filterJSONCall,
    markerLocation: false,
    autoType: true,
    autoCollapse: false,
    minLength: 4,
    position: 'topright'
}));


var zoomControl = L.control.zoom({
    position: "topright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
    position: "topright",
    drawCircle: true,
    follow: true,
    setView: true,
    keepCurrentZoomLevel: true,
    markerStyle: {
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.8
    },
    circleStyle: {
        weight: 1,
        clickable: false
    },
    icon: "icon-direction",
    metric: false,
    strings: {
        title: "My location",
        popup: "You are within {distance} {unit} from this point",
        outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
    },
    locateOptions: {
        maxZoom: 18,
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
    }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
    var isCollapsed = true;
} else {
    var isCollapsed = false;
}

L.control.layers(baseLayers, groupedOverlays, {
    'autoZIndex': false
}).addTo(map);


var legend = L.control({
    position: 'bottomright'
});

//create or recreate legend
legend.onAdd = function(map) {

    var labels = [];
    var color = [];

    for (j = 0; j < colortree.colorschemes.length; j++) {

        if (colortree.colorschemes[j].schemename == colorscheme) {
            if (colortree.colorschemes[j].count == classes) {
                color = colortree.colorschemes[j].colors;
            }
        }
    }

    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML = "<h4 style='color: black;'><b>" + current_desc + "</b></h4>";


    for (i = (breaks.length - 1); i > -1; i--) {
        labels.push(breaks[i]);
    }

    var lowlabel, toplabel;

    if (schemename !== "stddev") {
        for (i = 0; i < labels.length; i++) {


            if (i === 0) {
                lowlabel = minval;
            }

            if (type == 'currency') {
                lowlabel = labels[i];
                toplabel = labels[i + 1] - mininc;
                lowlabel = '$' + lowlabel.formatMoney(0);
                if (!toplabel) {
                    toplabel = " +";
                } else {
                    toplabel = ' to $' + toplabel.formatMoney(0);
                }

            }

            if (type == 'number') {
                lowlabel = labels[i];
                toplabel = labels[i + 1] - mininc;

                var resprec = (mininc + "").split(".")[1];
                if (!resprec) {
                    resprec = 0;
                } else {
                    resprec = resprec.length;
                }

                lowlabel = lowlabel.formatMoney(resprec); //still not correct
                if (!toplabel) {
                    toplabel = " +";
                } else {
                    toplabel = ' to ' + toplabel.formatMoney(resprec);
                }

            }

            if (type == 'percent') {
                lowlabel = labels[i];
                toplabel = labels[i + 1] - (mininc / 100);
                lowlabel = (lowlabel * 100).formatMoney(2) + ' %';
                if (!toplabel) {
                    toplabel = " +";
                } else {
                    toplabel = ' to ' + (toplabel * 100).formatMoney(2) + ' %';
                }

            }

            if (type == 'regular') {
                lowlabel = labels[i];
                toplabel = labels[i + 1] - mininc;
                if (!toplabel) {
                    toplabel = " +";
                } else {
                    toplabel = ' to ' + toplabel;
                }

            }

            //if there is a negative anywhere in 'toplabel' dont display
            if (toplabel.search('-') == -1) {
                div.innerHTML += '<i style="background:' + color[i] + ';opacity: ' + fillOpacity + ';"></i> ' + '&nbsp;&nbsp;&nbsp;' + lowlabel + toplabel + '<br />';
            }


        }
    } else {

        var labels2 = [];

        if (classes == 7) {
            labels = ['< -2.5 Std. Dev.', '-1.5 to -2.5 Std. Dev', '-0.5 to -1.5 Std. Dev.', '0.5 to -0.5 Std. Dev.', '0.5 to 1.5 Std. Dev.', '1.5 to 2.5 Std. Dev.', '> 2.5 Std. Dev.'];
        }
        if (classes == 8) {
            labels = ['< -1.5 Std. Dev.', '-1 to -1.5 Std. Dev', '-0.5 to -1 Std. Dev.', '0 to -0.5 Std. Dev.', '0 to 0.5 Std. Dev.', '0.5 to 1 Std. Dev.', '1 to 1.5 Std. Dev.', '> 1.5 Std. Dev.'];
        }

        for (i = 0; i < labels.length; i++) {

            div.innerHTML += '<i style="background:' + color[i] + ';opacity: ' + fillOpacity + ';"></i> ' + '&nbsp;&nbsp;&nbsp;' + labels[i] + '<br />';

        }


    }
    return div;
};

//clear selection button in table modal
function clearsel() {
    dataset = [];
    redrawTable();

    //change selected symbology back to unselected
    map.eachLayer(function(layer) {
        //console.log(layer.options);
        if (layer.options) {
            if (layer.options.color) {
                if (layer.options.linecap == 'butt') {
                    layer.setStyle({
                        weight: lineweight,
                        color: linecolor,
                        lineopacity: lineopacity,
                        linecap: 'round'
                    });
                }
            }

        }
    });

}

function mintable() {
    $('#resizediv').hide();
  updatequerysearchstring();
}

function minmaxtable() {
  
  var btnstate=$('#closebtn').css('top');
  
  if(btnstate=='3px'){
    $('#resizediv').css('max-height','100%');  
    $('#resizediv').css('height','100%');
    $('#resizediv').css('padding-top','50px');  
  $('#closebtn').css('top','53px');
  $('#minmaxbtn').css('top','53px');
$( "#minmaxbtn2" ).removeClass( "glyphicon-plus-sign" ).addClass( "glyphicon-minus-sign" );
  }else{
    $('#resizediv').css('max-height','40%');  
    $('#resizediv').css('height','auto');
    $('#resizediv').css('padding-top','0px');  
  $('#closebtn').css('top','3px');
  $('#minmaxbtn').css('top','3px');  
    $( "#minmaxbtn2" ).removeClass( "glyphicon-minus-sign" ).addClass( "glyphicon-plus-sign" );
  }

  updatequerysearchstring();
}




$(document).ready(function() {
//begin
  
  $('#linkbutton').tooltip({placement : 'right'});

    	if(params.d!==undefined){	
		dataset=LZString.decompressFromEncodedURIComponent(params.d).split(',');
	};
  
  
      //change classification
    $('#classification').change(
        function() {
          classes = 7;
          
             if(params.cl!==undefined){	
		           classes=params.cl;
               delete params.cl;
	          }
          
            schemename = this.value;
          updatequerysearchstring();
            if (schemename == 'jenks') {
                $('#classes').html('<option value="5">5</option><option value="7" >7</option><option value="9">9</option>');
            }
            if (schemename == 'quantile') {
                $('#classes').html('<option value="5">5</option><option value="7" >7</option><option value="9">9</option><option value="11">11</option>');
            }
            if (schemename == 'stddev') {
                $('#classes').html('<option value="7" >7</option><option value="8">8</option>');
            }
          
          $('#classes').val(classes);

            filtercolorschemes();
            

        }
    );

    
  if(params.sn!==undefined){	
		schemename=params.sn;
    $("#classification").val(schemename).change();
	}

  

  
    $(document).on('dblclick', 'tr', function() {
        var classname = this.className;
        for (var i = 0; i < dataset.length; i++) {
            if (dataset[i] == Number(classname)) {
                dataset.splice(i, 1);
            }
        }
        $('.' + classname).remove();
        //recalc footer
        writeFooter();
updatequerysearchstring();
        //change color back to black //insane
        geojsonLayer.setStyle(feat1);

    });


    $("[name='my-checkbox']").bootstrapSwitch({
        animate: false
    });


    //moe toggle - bootstrap switch
    $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        //console.log(this); // DOM element
        //console.log(event); // jQuery event
        if (state) {
            $('.moe').show();
        } else {
            $('.moe').hide();
        }
      updatequerysearchstring();
    });
  
    
      	if(params.moe!==undefined){	
          if(params.moe=='no'){
  $('input[name="my-checkbox"]').bootstrapSwitch('state', false);
          }
        }
  

    $('#tableoption').on('change', function() {
        chgtblfl();
    });
    $("#table").stupidtable();

    //Create Easy Buttons (Top-Left)
    $('#homeModal').modal({
        show: false
    });
    L.easyButton('fa fa-bars', function() {
        $('#homeModal').modal('toggle');
    }, 'Change Data Theme');
    $('#geoModal').modal({
        show: false
    });
    L.easyButton('fa fa-compass', function() {
        $('#geoModal').modal('toggle');
    }, 'Change Geography Level');

    L.easyButton('fa fa-table', function() {
        $('#resizediv').toggle();
      updatequerysearchstring();
    }, 'View Table');


    $('#chartModal').modal({
        show: false
    });
    L.easyButton('fa fa-line-chart', function() {

        $('#chartModal').modal('toggle');
        $('#chartdiv').empty();
        addchart();
      setTimeout(function(){updatequerysearchstring();},1000);

    }, 'View Chart');


    $('#dataModal').modal({show: false});  
    L.easyButton('fa fa-floppy-o', function (){$('#dataModal').modal('toggle');},'Print Map'); 


    L.easyButton('fa fa-eraser', function() {
        clearsel();
      updatequerysearchstring();
    }, 'Clear Selection');

    
  if(params.print=='yes'){
    console.log('printing');
    $('.leaflet-control-search').hide();
    $('.leaflet-control-zoom').hide();
    $('.leaflet-control-locate').hide();
    $('.leaflet-control-layers').hide();
    $('.leaflet-bar').hide();
    $('.navbar-nav').hide();
    $('#popup').hide();
    $('.spanhide').hide();
    
  }
  

    //Initialize transparency slider
    var trslider = $('#ex1').slider({
        formatter: function(value) {
            return value + '%';
        }
    });

  
    	if(params.tr!==undefined){	
		fillOpacity=params.tr;
        trslider.slider('setValue', parseInt(fillOpacity*100));
	};

    //when user stops moving transparency slider, change transparency of geojson layer
    $("#ex1").on("slideStop", function(slideEvt) {
        //lineopacity = slideEvt.value / 100; //transparency control as pct
        fillOpacity = slideEvt.value / 100;

        //transparency needs to be reflected in the legend
        legend.removeFrom(map);
        geojsonLayer.setStyle({
            //opacity: lineopacity,
            fillOpacity: fillOpacity
        });
        legend.addTo(map);
      updatequerysearchstring();
    });

    function onEachFeature(feature, layer) {
        //console.log(feature.properties);

        layer.on({
            mouseover: highlightFeature,
            mouseout: mouseout,
            click: featureSelect
        });

    }


    // Create a mouseout event that undoes the mouseover changes
    function mouseout(e) {
        var rsstyle = e.layer.options.linecap;
        var layer = e.target;

        if (rsstyle == "butt") {
            layer.setStyle({
                opacity: 1,
                weight: 2,
                color: cselected
            });
        } else {
            layer.setStyle({
                opacity: lineopacity,
                weight: lineweight,
                color: linecolor
            });
        }

        $("#popup").remove();


    }


    //initialize geojsonLayer
    geojsonLayer = L.geoJson.ajax("", {
      loading: function(){
        map.spin(true);
      },
        middleware: function(data) {
            getJson(data);
        }, //run tests to see if this is the best setup
        onEachFeature: onEachFeature
    });

  
    function highlightFeature(e) {
        var layer = e.target;
      
      //can turn to off for no mouseover
      if(cmouseover!=='off'){
        layer.setStyle({
            opacity: 1,
            weight: 2,
            color: cmouseover
        });

            //bring feature to front
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
      }
      
        var fp = e.target.feature.properties;
        var popupresult = eval(formula);

        if (type == 'currency') {
            popupresult = '$ ' + popupresult.formatMoney(0);
        }

        if (type == 'number') {
            var resprec = (mininc + "").split(".")[1];
            if (!resprec) {
                resprec = 0;
            } else {
                resprec = resprec.length;
            }
            popupresult = popupresult.formatMoney(resprec);
        }

        if (type == 'percent') {
            popupresult = (popupresult * 100).formatMoney(2) + ' %';
        }
        if (type == 'regular') {
            popupresult = popupresult;
        } //no formatting - think: median year housing unit built (only one)

        // Create a popup
        var popup = $("<div></div>", {
            id: "popup",
            css: {
                position: "absolute",
                top: "45px",
                right: "100px",
                zIndex: 1002,
                backgroundColor: "white",
                padding: "8px",
                border: "1px solid #ccc"
            }
        });

        // Insert a headline into that popup
        var hed = $("<div></div>", {
            text: fp.geoname + ": " + popupresult,
            css: {
                fontSize: "16px",
                marginBottom: "3px"
            }
        }).appendTo(popup);

        // Add the popup to the map
        popup.appendTo("#map");
      

    }



    function featureSelect(e) {

        var layer = e.target;
        var curcolor = (e.layer.options.linecap);

        //convert json object to array
        var arr = $.map(e.target.feature.properties, function(el) {
            return el;
        });

        //if currently selected - remove it
        if (curcolor == 'butt') {
            layer.setStyle({
                weight: lineweight,
                color: linecolor,
                lineopacity: lineopacity,
                linecap: 'round'
            });

            //search dataset (geonum) array for item to remove
            for (var i = 0; i < dataset.length; i++) {
                if (dataset[i] == arr[1]) {
                    dataset.splice(i, 1);
                }
            }
            // Delete table row which has matching geonum class
            $('.' + e.target.feature.properties.geonum).remove();
            //send feature to back
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToBack();
            }

        } else { //else add it
            layer.setStyle({
                weight: 2,
                color: cselected,
                lineopacity: 1,
                linecap: 'butt'
            });

            //bring feature to front
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            tblfl = $('#tableoption').val();
            var rowstr = '';

            var classadd = ''; //add moe class
            var plusminus = '';

            //add row to table
            if (tblfl == '-1') {
                //plain
                rowstr = '<tr class="' + e.target.feature.properties.geonum + '">';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geoname + '</td>';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geonum + '</td>';
                for (var k in e.target.feature.properties) {
                    if (k != 'geoname' && k != 'geonum') {

                        var resprec;

                        if (k.search("moe") != -1) {
                            classadd = "moe";
                            plusminus = '&plusmn; ';
                        } else {
                            classadd = "";
                            plusminus = '';
                        }

                        if (type == 'number' || type == 'percent') {
                            resprec = ((e.target.feature.properties[k]) + "").split(".")[1];
                            if (!resprec) {
                                resprec = 0;
                            } else {
                                resprec = resprec.length;
                            }
                            rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + parseFloat(e.target.feature.properties[k]).formatMoney(resprec) + '</td>';
                        }

                        if (type == 'currency') {
                            resprec = ((e.target.feature.properties[k]) + "").split(".")[1];
                            if (!resprec) {
                                resprec = 0;
                            } else {
                                resprec = resprec.length;
                            }
                            rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + '$' + parseFloat(e.target.feature.properties[k]).formatMoney(resprec) + '</td>';
                        }

                        /* if(type=='percent'){
                          resprec= ((e.target.feature.properties[k])+"").split(".")[1];
                          if(!resprec){resprec=0;}else{resprec = resprec.length;}
                          rowstr=rowstr+'<td class="'+classadd+'">'+plusminus+parseFloat(e.target.feature.properties[k]).formatMoney(resprec)+'%</td>'; 
                        } */ //percent cant happen

                        if (type == 'regular') {
                            rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + e.target.feature.properties[k] + '</td>';
                        }

                    }
                }
                rowstr = rowstr + '</tr>';

            } else {

                //descriptive      //Table Flavor
                var j = 0;
                rowstr = '';
                var fp = e.target.feature.properties;

                //add matched records to table
                rowstr = '<tr class="' + e.target.feature.properties.geonum + '">';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geoname + '</td>';
                rowstr = rowstr + '<td>' + e.target.feature.properties.geonum + '</td>';



                $.each(tabletree.data[tblfl].Data, function(k, v) {

                    if ((tabletree.data[tblfl].Data[k].Formula).search("moe") != -1) {
                        classadd = "moe";
                        plusminus = '&plusmn; ';
                    } else {
                        classadd = "";
                        plusminus = '';
                    }
                    if ((tabletree.data[tblfl].Data[k].FieldName) == "CV") {
                        plusminus = '';
                    } //no plusmn on coefficient of variance

                    if (tabletree.data[tblfl].Data[k].type == "currency") {
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + '$' + parseInt(eval(v.Formula)).formatMoney(0) + '</td>';
                    }
                    if (tabletree.data[tblfl].Data[k].type == "percent") {
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)).toFixed(2) + '" class="' + classadd + '">' + plusminus + Number(eval(v.Formula)).toFixed(2) + '%</td>';
                    }
                    if (tabletree.data[tblfl].Data[k].type == "regular") {
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + eval(v.Formula) + '</td>';
                    }
                    if (tabletree.data[tblfl].Data[k].type == "number") {
                        var resprec = (eval(v.Formula) + "").split(".")[1];
                        if (!resprec) {
                            resprec = 0;
                        } else {
                            resprec = resprec.length;
                        }
                        rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + parseFloat(eval(v.Formula)).formatMoney(resprec) + '</td>';
                    }

                });

                rowstr = rowstr + '</tr>';

            }

            $('#tablebody').append(rowstr);

            //hide (or not) if class=moe
            var checkstate = $('input[name="my-checkbox"]').bootstrapSwitch('state');
            if (checkstate) {
                $('.moe').show();
            } else {
                $('.moe').hide();
            }

            //add item to array
            dataset.push(arr[1]);
        }

updatequerysearchstring();
      
        writeFooter();


    }




  
  
    populate();
    drawcolorschemes();
    legend.addTo(map);
    changeall('yes', '0');
  
  


    function populate() {

      //disable geo options at inappropriate zoom levels
            var curzoom=map.getZoom();
      if(curzoom<9){
        $("#rbplace").hide();
        $("#rbtract").hide();
        $("#rbbg").hide();
      }else{
        $("#rbplace").show();
        $("#rbtract").show();
        $("#rbbg").show();
      }
      
      
        //count different categories
        var sectionsarray = [];
        for (i = 0; i < datatree.data.length; i++) {
            sectionsarray.push(datatree.data[i].section);
        }
        //whittle down sectionsarray to only unique items
        var uniqueNames = [];
        $.each(sectionsarray, function(i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });

        //sort array alphabetically
        uniqueNames.sort();

        //populate accordion1
        for (i = 0; i < (parseInt((uniqueNames.length) / 2) + 1); i++) {
            $('#accordion1').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading1' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion1" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse1">' + uniqueNames[i] + '</a></h4></div><div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + uniqueNames[i] + '" class="panel-body"></div></div></div>');
        }

        //populate accordion2 instead
        for (i = (parseInt((uniqueNames.length) / 2) + 1); i < uniqueNames.length; i++) {
            $('#accordion2').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading2' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse1">' + uniqueNames[i] + '</a></h4></div><div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + uniqueNames[i] + '" class="panel-body"></div></div></div>');
        }

        var vchecked = "";

        //loop through - add all themes
        for (i = 0; i < datatree.data.length; i++) {
          if(params.v===undefined){
            if (i === 0) {
                vchecked = "checked";
            } else {
                vchecked = "";
            }
          }
          if(params.v!==undefined){          
            if (params.v==datatree.data[i].varcode) {
                vchecked = "checked";
            } else {
                vchecked = "";
            }
          }
            $('#id' + datatree.data[i].section).append('<div class="radio"><label><input type="radio" name="optionsRadios" value="' + datatree.data[i].varcode + '" ' + vchecked + '> ' + datatree.data[i].verbose + '</label></div>'); //to accordion
            $('#advattribute').append('<option value="' + datatree.data[i].varcode + '" > ' + datatree.data[i].verbose + '</option>'); //to advanced selection tool
        }

    }

    function drawcolorschemes() {
        $('#colorschemes').html('');
        var schemecount = 0;

        //populate colorschemes
        for (i = 0; i < colortree.colorschemes.length; i++) {



            var cclasses = colortree.colorschemes[i].count; //check for correct number of classes
            var prefix = colortree.colorschemes[i].schemename.substring(0, 2);

            //classes to be added
            var pt1 = "";
            var pt2 = "";

            if (prefix == 'mh') {
                pt1 = "jenks";
            }
            if (prefix == 'sh') {
                pt1 = "jenks";
            }
            if (prefix == 'ds') {
                pt1 = "quantile";
            }

            if (cclasses == 5) {
                pt2 = "c5";
            }
            if (cclasses == 7) {
                pt2 = "c7";
            }
            if (cclasses == 8) {
                pt2 = "c8";
            }
            if (cclasses == 9) {
                pt2 = "c9";
            }
            if (cclasses == 11) {
                pt2 = "c11";
            }


            var appendstring = '<label class="allradio radio-inline ' + pt1 + ' ' + pt2 + '"><input id="' + colortree.colorschemes[i].schemename + cclasses + '" type="radio" name="schemeRadios" class="allradio form-control ' + pt1 + ' ' + pt2 + '" value="' + colortree.colorschemes[i].schemename + '">';

            for (j = 0; j < colortree.colorschemes[i].count; j++) {
                appendstring = appendstring + '<span style="background-color:' + colortree.colorschemes[i].colors[j] + ';">&nbsp;&nbsp;</span>';
            }

            appendstring = appendstring + '</label>';

            $('#colorschemes').append(appendstring);

     

          

            if (classes == 5) {
                $('.c7').hide();
                $('.c8').hide();
                $('.c9').hide();
                $('.c11').hide();
            }
            if (classes == 7) {
                $('.c5').hide();
                $('.c8').hide();
                $('.c9').hide();
                $('.c11').hide();
            }
            if (classes == 8) {
                $('.c5').hide();
                $('.c7').hide();
                $('.c9').hide();
                $('.c11').hide();
            }
            if (classes == 9) {
                $('.c5').hide();
                $('.c7').hide();
                $('.c8').hide();
                $('.c11').hide();
            }
            if (classes == 11) {
                $('.c5').hide();
                $('.c7').hide();
                $('.c8').hide();
                $('.c9').hide();
            }

          
          
            if (schemename == "jenks") {
                $('.quantile').hide();
            }
            if (schemename == "quantile" || schemename == "stddev") {
                $('.jenks').hide();
            }
        }

          if(params.cs!==undefined){	

		          colorscheme=params.cs;

            $('#'+colorscheme+classes).prop('checked',true);

              delete params.cs;
  updatequerysearchstring();
	        }else{
                    //set default
        $('#mh17').prop('checked', true);
              updatequerysearchstring();
          }

    }

    function filtercolorschemes() {

        $('.allradio').show();

        if (classes == 5) {
            $('.c7').hide();
            $('.c8').hide();
            $('.c9').hide();
            $('.c11').hide();
        }
        if (classes == 7) {
            $('.c5').hide();
            $('.c8').hide();
            $('.c9').hide();
            $('.c11').hide();
        }
        if (classes == 8) {
            $('.c5').hide();
            $('.c7').hide();
            $('.c9').hide();
            $('.c11').hide();
        }
        if (classes == 9) {
            $('.c5').hide();
            $('.c7').hide();
            $('.c8').hide();
            $('.c11').hide();
        }
        if (classes == 11) {
            $('.c5').hide();
            $('.c7').hide();
            $('.c8').hide();
            $('.c9').hide();
        }

        if (schemename == "jenks") {
            $('.quantile').hide();
        }
        if (schemename == "quantile" || schemename == "stddev") {
            $('.jenks').hide();
        }

    }


    //START ALL FUNCTIONS- DO THEY NEED TO BE WITHIN DOCUMENT READY?

    //change data theme
    $('input[name=optionsRadios]:radio').change(function() {
      varcode=this.value;
      updatequerysearchstring();
        createnewtable = 0;
        changeall('yes', '1');
    });

    //change colorscheme
    $('input[name=schemeRadios]:radio').change(function() {
        colorscheme = this.value;
      updatequerysearchstring();
        changeall('no', '0');
    });

    //change geo
    $('input[name=geoRadios]:radio').change(function() {

        sumlev = $('input:radio[name ="geoRadios"]:checked').val();

        if (sumlev == '50') {
          map.options.minZoom = 4;
            $('#advgeo').text('counties');
        }
        if (sumlev == '40') {
          map.options.minZoom = 4;
            $('#advgeo').text('states');
        }
        if (sumlev == '140') {
                    map.options.minZoom = 9;
            $('#advgeo').text('tracts');
        }
        if (sumlev == '150') {
                    map.options.minZoom = 9;
            $('#advgeo').text('block groups');
        }
        if (sumlev == '160') {
                    map.options.minZoom = 9;
            $('#advgeo').text('places');
        }

        //dataset = [];
        updatequerysearchstring();
        changeall('yes', '0');
    });



    //change in classes dropdown
    $('#classes').change(function() {
        classes = this.value;
      updatequerysearchstring();
        filtercolorschemes();
    });


    //get all datatheme data from datatree.js and colortree.js for breaks and sybolizing
    function changeall(redraw, override) {


        var i, j, k;

        legend.removeFrom(map);

        var manageradio = $('input:radio[name ="optionsRadios"]:checked').val();

        for (i = 0; i < datatree.data.length; i++) {

            if (manageradio == datatree.data[i].varcode) {
                current_desc = datatree.data[i].verbose;
                table = datatree.data[i].table;
                type = datatree.data[i].type;
                mininc = datatree.data[i].mininc;
                minval = Number(datatree.data[i].minval);
                numerator = datatree.data[i].numerator;
                //console.log(numerator);
                denominator = datatree.data[i].denominator;
                moenumerator = datatree.data[i].moenumerator;
                moedenominator = datatree.data[i].moedenominator;
                moeformula = "(" + moenumerator + ")" + "/" + "(" + moedenominator + ")";
                //console.log(denominator);
                formula = "(" + numerator + ")" + "/" + "(" + denominator + ")";
                //console.log('result: '+formula);
                summable = false;
                favtable = datatree.data[i].favtable;
                varcode = datatree.data[i].varcode;
                usenull = datatree.data[i].usenull;
                usezeroasnull = datatree.data[i].usezeroasnull;
                var symbarray = (datatree.data[i].favstyle).split(',');
                if (override == '1') {
                    schemename = symbarray[0];
                    classes = symbarray[1];
                    colorscheme = symbarray[2];
                    //change value in dropdowns
                    $('#classification').val(schemename);
                    $('#classes').val(classes);
                    $('#' + colorscheme + classes).prop('checked', true);
                    filtercolorschemes();
                }
            }
        }

        var dd;
        var breakstreeindex;

        for (dd = 0; dd < breakstree.data.length; dd++) {
            if (breakstree.data[dd].varcode == varcode) {
                breakstreeindex = dd;
            }
        }

        for (j = 0; j < breakstree.data[breakstreeindex].symbol.length; j++) {


            //if statement below for each type of geography
            if (breakstree.data[breakstreeindex].symbol[j].geo == "state" && sumlev == '40') {

                if (schemename == "jenks") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks9;
                    }
                }
                if (schemename == "quantile") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile9;
                    }
                    if (classes == 11) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile11;
                    }
                }
                if (schemename == "stddev") {
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard7;
                    }
                    if (classes == 8) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard8;
                    }
                }

            }

            //if statement below for each type of geography
            if (breakstree.data[breakstreeindex].symbol[j].geo == "county" && sumlev == '50') {

                if (schemename == "jenks") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks9;
                    }
                }
                if (schemename == "quantile") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile9;
                    }
                    if (classes == 11) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile11;
                    }
                }
                if (schemename == "stddev") {
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard7;
                    }
                    if (classes == 8) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard8;
                    }
                }

            }

            //if statement below for each type of geography
            if (breakstree.data[breakstreeindex].symbol[j].geo == "place" && sumlev == '160') {

                if (schemename == "jenks") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks9;
                    }
                }
                if (schemename == "quantile") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile9;
                    }
                    if (classes == 11) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile11;
                    }
                }
                if (schemename == "stddev") {
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard7;
                    }
                    if (classes == 8) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard8;
                    }
                }

            }


            //if statement below for each type of geography
            if (breakstree.data[breakstreeindex].symbol[j].geo == "tract" && sumlev == '140') {

                if (schemename == "jenks") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks9;
                    }
                }
                if (schemename == "quantile") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile9;
                    }
                    if (classes == 11) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile11;
                    }
                }
                if (schemename == "stddev") {
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard7;
                    }
                    if (classes == 8) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard8;
                    }
                }

            }


            //if statement below for each type of geography
            if (breakstree.data[breakstreeindex].symbol[j].geo == "bg" && sumlev == '150') {

                if (schemename == "jenks") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].jenks9;
                    }
                }
                if (schemename == "quantile") {
                    if (classes == 5) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile5;
                    }
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile7;
                    }
                    if (classes == 9) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile9;
                    }
                    if (classes == 11) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].quantile11;
                    }
                }
                if (schemename == "stddev") {
                    if (classes == 7) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard7;
                    }
                    if (classes == 8) {
                        breaks = breakstree.data[breakstreeindex].symbol[j].standard8;
                    }
                }

            }

        }




        //loop through colorschemes only - we have breaks info and colorscheme    
        for (k = 0; k < colortree.colorschemes.length; k++) {

            if (colortree.colorschemes[k].schemename == colorscheme && colortree.colorschemes[k].count == classes) {
                ifnulljson = colortree.colorschemes[k].ifnull;
                ifzerojson = colortree.colorschemes[k].ifzero;
                symbolcolors = colortree.colorschemes[k].colors;
            }
        }

        legend.addTo(map);

        if (redraw == "yes") {
            ajaxcall();
        } else {
            geojsonLayer.setStyle(feat1);
        }

    }

      map.on('movestart', function() {
      var d = new Date();
      globalbusy = d.getTime(); 
      });
 
    map.on('moveend', function() {

      updatequerysearchstring();

      var d = new Date();
      globalbusy = d.getTime(); 

      
      setTimeout(function(){ 
        var e=new Date();
        var curtime = e.getTime();
              if(curtime>= (globalbusy+1000)){
                
        //get center of map point
        var c = map.getCenter();
        var clat = c.lat;
        var clng = c.lng;

        //if center point is still within the current map bounds, then dont do anything.  otherwise, run query again
        if (clat < nelat && clat > swlat && clng < nelng && clng > swlng) {
          
          if(map.getZoom()!==lastzoom){ ajaxcall(); }
          
        } else {
            ajaxcall();
        }
                
                
                
              }
        }, 1000);
      
      
    }); // end 'on moveend'

    map.on('zoomstart', function() {
      var d = new Date();
      globalbusy = d.getTime(); 
    });
  
    //when map is zoomed in or out
    map.on('zoomend', function() {

      updatequerysearchstring();

      var d = new Date();
      globalbusy = d.getTime(); 
      
      setTimeout(function(){ 
        var e=new Date();
        var curtime = e.getTime();
        
              if(curtime>= (globalbusy+1000)){

          if(map.getZoom()!==lastzoom){ ajaxcall(); }

              }
        }, 1000);
      
      //grey radio buttons for geography levels if zoomed out too far
      var curzoom=map.getZoom();
      if(curzoom<9){
        $("#rbplace").hide();
        $("#rbtract").hide();
        $("#rbbg").hide();
      }else{
        $("#rbplace").show();
        $("#rbtract").show();
        $("#rbbg").show();
      }
      //rbplace
      
    });



    //change table flavor
    function chgtblfl() {

        tblfl = $('#tableoption').val();

        if (tblfl == -1) {
            favtable = "Plain";
        } else {
            favtable = tabletree.data[tblfl].TableAlias;
        }

        stopafterheader = 0;
        var geonums = '';

        //turn dataset into a comma delimited string and call it geoids
        geonums = dataset.join(",");

        $('#tablebody').empty();
        $('#tableheader').empty();
        $('#tablefooter').empty();

        //ajax call to load selected features

        if (dataset.length === 0) {
            stopafterheader = 1;
            geonums = '108079';
        } //if nothing selected, we still need to query database to get header info.  We give the query a dummy goenum to chew on.  It won't add that row due to the stopafterhearder variable.


        $.ajax({
            type: "POST",
            url: "assets/php/demogpost.php",
            data: "db=acs0913&schema=data&table=" + table + "&geonum=" + geonums + "&moe=yes",
            dataType: 'json',
            jsonpCallback: 'getJson',
            success: addRows
        });


    }



    //after successfull ajax call, data is sent here
    function getJson(data) {
        $("#popup").remove();
        // createnewtable=0;

        geojsonLayer.clearLayers(); //eliminates double-draw
        geojsonLayer.addData(data);

        geojsonLayer.setStyle(feat1); //WOULD THIS BE FASTER IF WE USE ONEACHFEATURE???!!!!      
        map.addLayer(geojsonLayer);
        map.spin(false);

        //OMG OMG, I Figured out how to bring selected features to the front
        map.eachLayer(function(layer) {
            //console.log(layer.options);
            if (layer.options) {
                if (layer.options.color) {
                    if (layer.options.linecap == 'butt') {
                        //bring feature to front
                        if (!L.Browser.ie && !L.Browser.opera) {
                            layer.bringToFront();
                        }
                    }
                }

            }
        });
      
        if(params.dt!==undefined){
          
          if(params.dt=='yes'){
            $('#resizediv').toggle();
          }
          
          if(params.dt=='max'){
            $('#resizediv').toggle();
                $('#resizediv').css('max-height','100%');  
    $('#resizediv').css('height','100%');
    $('#resizediv').css('padding-top','50px');  
  $('#closebtn').css('top','53px');
  $('#minmaxbtn').css('top','53px');
$( "#minmaxbtn2" ).removeClass( "glyphicon-plus-sign" ).addClass( "glyphicon-minus-sign" );
          }
          
          delete params.dt;
        }

              if(params.ch!==undefined){
          
          if(params.ch=='yes'){
        $('#chartModal').modal('toggle');
        $('#chartdiv').empty();
        addchart();
      setTimeout(function(){updatequerysearchstring();},1000);
          }
          
          delete params.ch;
        }
      
      
    }

    function ajaxcall() {

        geojsonLayer.clearLayers();

        lastzoom = map.getZoom();
        var r = map.getBounds();
        nelat = (r._northEast.lat);
        nelng = (r._northEast.lng);
        swlat = (r._southWest.lat);
        swlng = (r._southWest.lng);

        var diff1 = (nelat - swlat) / 2;
        var diff2 = (nelng - swlng) / 2;

        //we calculate a bounding box equal much larger than the actual visible map.  This preloades shapes that are off the map.  Combined with the center point query, this will allow us to not have to requery the database on every map movement.
        var newbounds = (swlng - diff2) + "," + (swlat - diff1) + "," + (nelng + diff2) + "," + (nelat + diff1);

        geojsonLayer.refresh("../CensusAPI/geojson.php?db=" + db + "&schema=" + schema + "&sumlev=" + sumlev + "&limit=" + limit + "&table=" + table + "&bb=" + newbounds + "&zoom=" + map.getZoom() + "&moe=yes"); //add a new layer replacing whatever is there

    }

    function commafy(nStr) {
        var x, x1, x2, rgx;
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }


}); //end document on ready

function redrawTable() {

    //will need to move this code somewhere else - otherwise tableflavor will always be 0
    //not necessarily

    var str = '';
    var parsehtml;
    var seltext = '';

    if (tblfl == '-1') {
        seltext = 'selected';
    } else {
        seltext = '';
    }

    $('#tableoption').empty();
    $('#tableoption').append($.parseHTML("<option value='-1' " + seltext + ">Plain Table</option>"));

    //get table id, search for table id in tabletree (tableflavor.js) to populate select box 'tableoption'

    for (i = 0; i < tabletree.data.length; i++) {

        //setting value=array index for tabletree
        if (tabletree.data[i].ActualTable == table) {
            if (tabletree.data[i].TableAlias == favtable) {
                tblfl = String(i);
            }
            if (String(i) == tblfl) {
                seltext = 'selected';
            } else {
                seltext = '';
            }
            str = "<option value='" + i + "' " + seltext + ">" + tabletree.data[i].TableAlias + "</option>";
            parsehtml = $.parseHTML(str);
            $('#tableoption').append(parsehtml);
        }
    }

    stopafterheader = 0;
    var geonums = '';


    //turn dataset into a comma delimited string and call it geoids
    geonums = dataset.join(",");


    $('#tablebody').empty();
    $('#tableheader').empty();
    $('#tablefooter').empty();
    $('#tablefooter').hide();
    //ajax call to load selected features

    if (dataset.length === 0) {
        stopafterheader = 1;
        geonums = '108079';
    } //if nothing selected, we still need to query database to get header info.  We give the query a dummy goenum to chew on.  It won't add that row due to the stopafterhearder variable.


    $.ajax({
        type: "POST",
        url: "assets/php/demogpost.php",
        data: "db=acs0913&schema=data&table=" + table + "&geonum=" + geonums + "&moe=yes",
        dataType: 'json',
        jsonpCallback: 'getJson',
        success: addRows
    });



}



function addRows(data) {

        //create column headers
        var tblstr = '';
        var datatype = 'float';
        var tableclassadd = '';


        tblfl = $('#tableoption').val();

        //Plain Table
        //if select value is 0, it means plain table is selected
        if (tblfl == '-1') {
            $.each(data.data[0], function(k, v) {

                if (k.search("moe") != -1) {
                    tableclassadd = "moe";
                } else {
                    tableclassadd = "";
                }
                if (k != 'state' && k != 'county' && k != 'place' && k != 'tract' && k != 'bg') {

                    if (k == 'geoname') {
                        datatype = "string";
                    } else {
                        datatype = "float";
                    }
                    tblstr = tblstr + '<th data-sort="' + datatype + '" class="' + tableclassadd + '">' + k + '</th>';
                }
            });
        } else {

            //Table Flavor
            //if select value >0 that means a table flavor is selected        

            //First Two Columns Are Always Geoname and Geonum
            tblstr = tblstr + '<th data-sort="string">Name</th>';
            tblstr = tblstr + '<th data-sort="int">ID</th>';

            for (i = 0; i < tabletree.data[tblfl].Data.length; i++) {

                //console.log(tabletree.data[tblfl].Data[i].Formula);
                if ((tabletree.data[tblfl].Data[i].Formula).search("moe") != -1) {
                    tableclassadd = "moe";
                } else {
                    tableclassadd = "";
                }

                tblstr = tblstr + '<th data-sort="' + datatype + '" class="' + tableclassadd + '">' + tabletree.data[tblfl].Data[i].FieldName + '</th>';

            }


        }


        //Both Plain and Table Favor Append tblstr
        $('#tableheader').append(tblstr);



        if (stopafterheader === 0) {
            //add rows
            var rowstr = '';
            var classadd = '';
            var plusminus = '';

            if (tblfl == '-1') {
                //Plain
                for (i = 0; i < (data.data).length; i++) {

                    //add matched records to table
                    rowstr = '<tr class="' + data.data[i].geonum + '">';

                    $.each(data.data[i], function(k, v) {
                        if (k == 'geoname' || k == 'geonum') {
                            rowstr = rowstr + '<td>' + v + '</td>';
                        }
                        if (k != 'state' && k != 'county' && k != 'place' && k != 'tract' && k != 'bg' && k != 'geoname' && k != 'geonum') {

                            if (k.search("moe") != -1) {
                                classadd = "moe";
                                plusminus = '&plusmn; ';
                            } else {
                                classadd = "";
                                plusminus = '';
                            }

                            if (type == "currency") {
                                rowstr = rowstr + '<td data-sort-value="' + Number(v) + '" class="' + classadd + '">' + plusminus + '$' + parseInt(v).formatMoney(0) + '</td>';
                            }
                            if (type == "number" || type == "percent") {
                                var resprec = (v + "").split(".")[1];
                                if (!resprec) {
                                    resprec = 0;
                                } else {
                                    resprec = resprec.length;
                                }
                                rowstr = rowstr + '<td data-sort-value="' + Number(v) + '" class="' + classadd + '">' + plusminus + parseFloat(v).formatMoney(resprec) + '</td>';
                            }
                            if (type == "regular") {
                                rowstr = rowstr + '<td data-sort-value="' + Number(v) + '" class="' + classadd + '">' + plusminus + v + '</td>';
                            }


                        }
                    });

                    rowstr = rowstr + '</tr>';

                    //Both Plain and Table Flavor Append Rows Here
                    $('#tablebody').append(rowstr);
                }


            } else {

                var fp;

                // console.log(data);
                //Table Flavor
                for (i = 0; i < (data.data).length; i++) {
                    //console.log(i);
                    //add matched records to table
                    rowstr = '<tr class="' + data.data[i].geonum + '">';
                    rowstr = rowstr + '<td>' + data.data[i].geoname + '</td>';
                    rowstr = rowstr + '<td>' + data.data[i].geonum + '</td>';


                    $.each(tabletree.data[tblfl].Data, function(k, v) {
                        fp = data.data[i];

                        if ((tabletree.data[tblfl].Data[k].Formula).search("moe") != -1) {
                            classadd = "moe";
                            plusminus = '&plusmn; ';
                        } else {
                            classadd = "";
                            plusminus = '';
                        }
                        if ((tabletree.data[tblfl].Data[k].FieldName) == "CV") {
                            plusminus = '';
                        } //no plusmn on coefficient of variance

                        if (tabletree.data[tblfl].Data[k].type == "currency") {
                            rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + '$' + parseInt(eval(v.Formula)).formatMoney(0) + '</td>';
                        }
                        if (tabletree.data[tblfl].Data[k].type == "regular") {
                            rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + eval(v.Formula) + '</td>';
                        }
                        if (tabletree.data[tblfl].Data[k].type == "number") {
                            var resprec = (eval(v.Formula) + "").split(".")[1];
                            if (!resprec) {
                                resprec = 0;
                            } else {
                                resprec = resprec.length;
                            }
                            rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + parseFloat(eval(v.Formula)).formatMoney(resprec) + '</td>';
                        }
                        if (tabletree.data[tblfl].Data[k].type == "percent") {
                            rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)).toFixed(2) + '" class="' + classadd + '">' + plusminus + Number(eval(v.Formula)).toFixed(2) + '%</td>';
                        }
                        //rowstr=rowstr+'<td>'+eval(v.Formula)+'</td>';        

                    });
                    rowstr = rowstr + '</tr>';

                    //Both Plain and Table Flavor Append Rows Here
                    $('#tablebody').append(rowstr);
                }

            }


            //hide (or not) if class=moe
            var checkstate = $('input[name="my-checkbox"]').bootstrapSwitch('state');
            if (checkstate) {
                $('.moe').show();
            } else {
                $('.moe').hide();
            }


            writeFooter();


        } //stop after header
    } //end addRows



function writeFooter() {


    //write table to an array
    var array = [];
    var headers = [];

    $('#table th').each(function(index, item) {
        headers[index] = $(item).html();
    });

    $('#tablebody tr').has('td').each(function() {
        var arrayItem = {};
        $('td', $(this)).each(function(index, item) {
            arrayItem[headers[index]] = $(item).html();
        });
        array.push(arrayItem);
    });

    //console.log(headers);  
    //console.log(array);


    //console.log(array.length);

    if (array.length === 0) {
        $('#tablefooter').hide();
    } else {
        $('#tablefooter').show();
    }

    //clear whatever was in the sum row previously
    $('#tablefooter').empty();

    //check to make sure summable is possible
    if (summable) {

        //first two cells will always look like this
        var footstr = '<td>Totals</td>';
        footstr = footstr + '<td></td>';


        //plain
        var runningval = 0;
        var runningmoe = 0;
        var n = '';
        var o = '';
        var p;
        var addmoeclass = '';
        var plusminus = '';

        for (var l = 2; l < headers.length; l++) {

            runningval = 0;
            runningmoe = 0;

            if ((headers[l]).search("moe") !== -1) {
                addmoeclass = 'moe';
            } else {
                addmoeclass = '';
            }

            for (var m = 0; m < array.length; m++) {

                runningval = runningval + Number((array[m][headers[l]]).replace(/[^a-zA-Z0-9]/g, '')); //replace all charcters not numbers and ???letters
                runningmoe = runningmoe + Math.pow(runningval, 2); //revisit this.  This isn't right
                if (array[m][headers[l]].search(/\$/g) !== -1) {
                    n = '$';
                } //dollar flag
                if (array[m][headers[l]].search(/%/g) !== -1) {
                    o = '%';
                } //pct flag
                if (array[m][headers[l]].search(",") !== -1) {
                    p = 1;
                } //comma flag

            }

            runningmoe = Math.sqrt(runningmoe);

            //if we're in an moe field, switch to give the moe calculation
            if (addmoeclass == "moe") {
                runningval = runningmoe;
                plusminus = '&plusmn; ';
            } else {
                plusminus = '';
            }

            footstr = footstr + '<td class="' + addmoeclass + '">' + plusminus + n + runningval.formatMoney(0) + o + '</td>';
        }

        //write new footer
        $('#tablefooter').html(footstr);

        //hide (or not) if class=moe
        var checkstate = $('input[name="my-checkbox"]').bootstrapSwitch('state');
        if (checkstate) {
            $('.moe').show();
        } else {
            $('.moe').hide();
        }

    } else {

        $('#tablefooter').hide();

    } // end if summable

}