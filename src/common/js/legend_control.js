var accounting = require("accounting");
var colortree = require("./colortree.js");


module.exports = function(cMap) {


    //legend control
    var legend = L.control({
        position: 'bottomright'
    });

    //create or recreate legend
    legend.onAdd = function() {

        var i, j, labels = [],
            color = [],
            div, lowlabel, toplabel, resprec;

        //retrieve individual colors depending on colorscheme and number of classes - puts those colors into color array
        for (j = 0; j < colortree.colorschemes.length; j = j + 1) {

            if (colortree.colorschemes[j].schemename === cMap.params.cs) {
                if (colortree.colorschemes[j].count === cMap.params.cl) {
                    color = colortree.colorschemes[j].colors;
                }
            }
        }

        //legend title
        div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = "<h4 style='color: black;'><b>" + cMap.current_desc + "</b></h4>";

        //retrieve breaks
        for (i = (cMap.breaks.length - 1); i > -1; i = i - 1) {
            labels.push(cMap.breaks[i]);
        }

        //format legend labels depending on number type: currency, number, regular, percent
        if (cMap.params.sn !== "stddev") {
            for (i = 0; i < labels.length; i = i + 1) {
                if (i === 0) {
                    lowlabel = cMap.minval;
                }
                if (cMap.type === 'currency') {
                    lowlabel = labels[i];
                    toplabel = labels[i + 1] - cMap.mininc;
                    lowlabel = accounting.formatMoney(lowlabel, "$", 0);
                    if (!toplabel) {
                        toplabel = " +";
                    } else {
                        toplabel = ' to ' + accounting.formatMoney(toplabel, "$", 0);
                    }
                }
                if (cMap.type === 'number') {
                    lowlabel = labels[i];
                    toplabel = labels[i + 1] - cMap.mininc;
                    resprec = (String(cMap.mininc)).split(".")[1];
                    if (!resprec) {
                        resprec = 0;
                    } else {
                        resprec = resprec.length;
                    }
                    lowlabel = lowlabel.toFixed(resprec); //still not correct
                    if (!toplabel) {
                        toplabel = " +";
                    } else {
                        toplabel = ' to ' + toplabel.toFixed(resprec);
                    }
                }
                if (cMap.type === 'percent') {
                    lowlabel = labels[i];
                    toplabel = labels[i + 1] - (cMap.mininc / 100);
                    lowlabel = (lowlabel * 100).toFixed(2) + ' %';
                    if (!toplabel) {
                        toplabel = " +";
                    } else {
                        toplabel = ' to ' + (toplabel * 100).toFixed(2) + ' %';
                    }
                }
                if (cMap.type === 'regular') {
                    lowlabel = labels[i];
                    toplabel = labels[i + 1] - cMap.mininc;
                    if (!toplabel) {
                        toplabel = " +";
                    } else {
                        toplabel = ' to ' + toplabel;
                    }

                }

                //if there is a negative anywhere in 'toplabel' dont display (causes havoc with quantile )
                if (toplabel.search('-') === -1) {
                    div.innerHTML += '<i style="background:' + color[i] + ';opacity: ' + cMap.feature.fillOpacity + ';"></i> ' + '&nbsp;&nbsp;&nbsp;' + lowlabel + toplabel + '<br />';
                }


            }
        } else {

            //labels for standard deviation are treated differently and dont depend on number type
            if (cMap.params.cl === 7) {
                labels = ['< -2.5 Std. Dev.', '-1.5 to -2.5 Std. Dev', '-0.5 to -1.5 Std. Dev.', '0.5 to -0.5 Std. Dev.', '0.5 to 1.5 Std. Dev.', '1.5 to 2.5 Std. Dev.', '> 2.5 Std. Dev.'];
            }
            if (cMap.params.cl === 8) {
                labels = ['< -1.5 Std. Dev.', '-1 to -1.5 Std. Dev', '-0.5 to -1 Std. Dev.', '0 to -0.5 Std. Dev.', '0 to 0.5 Std. Dev.', '0.5 to 1 Std. Dev.', '1 to 1.5 Std. Dev.', '> 1.5 Std. Dev.'];
            }

            for (i = 0; i < labels.length; i = i + 1) {

                div.innerHTML += '<i style="background:' + color[i] + ';opacity: ' + cMap.feature.fillOpacity + ';"></i> ' + '&nbsp;&nbsp;&nbsp;' + labels[i] + '<br />';

            }


        }
        return div;
    };

    return legend;

}