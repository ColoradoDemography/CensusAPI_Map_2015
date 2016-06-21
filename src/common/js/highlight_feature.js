    var accounting = require("accounting");


    //mouseover highlight
    module.exports = function(e, cMap) {


        var layer = e.target;
        var fp = e.target.feature.properties;
        var popupresult = eval(cMap.formula);
        var resprec;
        var popup;


        //can turn to off for no mouseover
        if (cMap.params.cmo !== 'off') {
            layer.setStyle({
                opacity: 1,
                weight: 2,
                color: cMap.params.cmo
            });

            //bring feature to front
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
        }



        if (cMap.type === 'currency') {
            popupresult = ' ' + accounting.formatMoney(popupresult, "$", 0);
        }

        if (cMap.type === 'number') {
            resprec = (String(cMap.mininc)).split(".")[1];
            if (!resprec) {
                resprec = 0;
            } else {
                resprec = resprec.length;
            }
            popupresult = popupresult.toFixed(resprec);
        }

        if (cMap.type === 'percent') {
            popupresult = (popupresult * 100).toFixed(2) + ' %';
        }

        //no formatting for type=regular - think: median year housing unit built (only one)

        // Create a popup
        popup = $("<div></div>", {
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
        });

        hed.appendTo(popup);

        // Add the popup to the map
        popup.appendTo("#map");


    }