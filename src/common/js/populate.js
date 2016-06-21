    var datatree = require("./datatree.js");

    module.exports = function(cMap) {

        var i, sectionsarray = [],
            uniqueNames = [],
            vchecked;

        //count different categories
        for (i = 0; i < datatree.data.length; i = i + 1) {
            sectionsarray.push(datatree.data[i].section);
        }
        //whittle down sectionsarray to only unique items
        $.each(sectionsarray, function(i, el) {
            if ($.inArray(el, uniqueNames) === -1) {
                uniqueNames.push(el);
            }
        });

        //sort array alphabetically
        uniqueNames.sort();

        //populate accordion1
        for (i = 0; i < (parseInt(((uniqueNames.length) / 2), 10) + 1); i = i + 1) {
            $('#accordion1').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading1' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion1" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse1">' + uniqueNames[i] + '</a></h4></div><div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + uniqueNames[i] + '" class="panel-body"></div></div></div>');
        }

        //populate accordion2 instead
        for (i = (parseInt(((uniqueNames.length) / 2), 10) + 1); i < uniqueNames.length; i = i + 1) {
            $('#accordion2').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading2' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse1">' + uniqueNames[i] + '</a></h4></div><div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '"><div id="id' + uniqueNames[i] + '" class="panel-body"></div></div></div>');
        }

        vchecked = "";

        //loop through - add all themes
        for (i = 0; i < datatree.data.length; i = i + 1) {
            if (cMap.params.v === undefined) {
                if (i === 0) {
                    vchecked = "checked";
                } else {
                    vchecked = "";
                }
            }
            if (cMap.params.v !== undefined) {
                if (cMap.params.v === datatree.data[i].varcode) {
                    vchecked = "checked";
                } else {
                    vchecked = "";
                }
            }
            $('#id' + datatree.data[i].section).append('<div class="radio"><label><input type="radio" name="optionsRadios" value="' + datatree.data[i].varcode + '" ' + vchecked + '> ' + datatree.data[i].verbose + '</label></div>'); //to accordion
            $('#advattribute').append('<option value="' + datatree.data[i].varcode + '" > ' + datatree.data[i].verbose + '</option>'); //to advanced selection tool
        }


    }