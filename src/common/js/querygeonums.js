    var datatree = require("./datatree.js");
    var selectgeonums = require("./selectgeonums.js");

    //called from index.html when select button is pressed in advanced tools

    module.exports = function(cMap) {


        var advstate, advattribute, advsign, advtext, advtable, advnumerator, advdenominator, i;

        advstate = $("#advstate").val(); //state selected
        advattribute = $("#advattribute").val(); //criteria (median household income, etc)
        advsign = $("#advsign").val(); //sign; greater than, less than, etc
        advtext = $("#advtext").val(); //value (as in: median household income is greater than VALUE)

        advtext = advtext.replace(/[^0-9\.]+/g, ''); //strip non numeric from VALUE text


        //loop through datatree (where data themes are defined), find varcode that matches the CRITERIA and assigns table, numerator, and denominator variables
        for (i = 0; i < datatree.data.length; i = i + 1) {
            if (advattribute === datatree.data[i].varcode) {
                advtable = datatree.data[i].table;
                advnumerator = datatree.data[i].numerator;
                advdenominator = datatree.data[i].denominator;
            }
        }

        //send paramters found above to advsearch.php, where query will return a list of geonums that fit that qualification
        $.ajax({
            url: "https://gis.dola.colorado.gov/cmap/advsearch?advsumlev=" + cMap.params.s + "&advstate=" + advstate + "&advsign=" + advsign + "&advtext=" + advtext + "&advtable=" + advtable + "&advnumerator=" + encodeURIComponent(advnumerator) + "&advdenominator=" + encodeURIComponent(advdenominator),
            dataType: 'json',
            success: function(data) {
                selectgeonums(cMap, data);
            }
        });

    }