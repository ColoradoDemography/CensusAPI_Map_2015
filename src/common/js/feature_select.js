var accounting = require("accounting");
var tabletree = require("./tableflavor.js");
var updatequerysearchstring = require("./update_query_string.js");


module.exports = function(e, cMap) {


    var i, layer = e.target,
        curcolor = (e.layer.options.linecap),
        arr, rowstr = '',
        classadd = '',
        plusminus = '',
        resprec, checkstate, k;


    var fp = e.target.feature.properties;

    //convert json object to array
    arr = $.map(e.target.feature.properties, function(el) {
        return el;
    });

    //if currently selected - remove it
    if (curcolor === 'butt') {
        layer.setStyle({
            weight: cMap.feature.lineweight,
            color: cMap.feature.linecolor,
            lineopacity: cMap.feature.lineopacity,
            linecap: 'round'
        });

        //search dataset (geonum) array for item to remove
        for (i = 0; i < cMap.dataset.length; i = i + 1) {
            if (cMap.dataset[i] === arr[1]) {
                cMap.dataset.splice(i, 1);
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
            color: cMap.params.csel,
            lineopacity: 1,
            linecap: 'butt'
        });

        //bring feature to front
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        cMap.tblfl = $('#tableoption').val();

        //add row to table
        if (cMap.tblfl === '-1') {
            //plain
            rowstr = '<tr class="' + fp.geonum + '">';
            rowstr = rowstr + '<td>' + e.target.feature.properties.geoname + '</td>';
            rowstr = rowstr + '<td>' + e.target.feature.properties.geonum + '</td>';
            for (k in e.target.feature.properties) {
                if ((e.target.feature.properties).hasOwnProperty(k)) {

                    if (k !== 'geoname' && k !== 'geonum') {
                        if (k.search("moe") !== -1) {
                            classadd = "moe";
                            plusminus = '&plusmn; ';
                        } else {
                            classadd = "";
                            plusminus = '';
                        }

                        if (cMap.type === 'number' || cMap.type === 'percent') {
                            resprec = (String(e.target.feature.properties[k])).split(".")[1];
                            if (!resprec) {
                                resprec = 0;
                            } else {
                                resprec = resprec.length;
                            }
                            rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + parseFloat(e.target.feature.properties[k]).toFixed(resprec) + '</td>';
                        }

                        if (cMap.type === 'currency') {
                            resprec = (String(e.target.feature.properties[k])).split(".")[1];
                            if (!resprec) {
                                resprec = 0;
                            } else {
                                resprec = resprec.length;
                            }
                            rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + accounting.formatMoney(parseFloat(e.target.feature.properties[k]), "$", resprec) + '</td>';
                        }

                        /* if(cMap.type==='percent'){
                          resprec= ((e.target.feature.properties[k])+"").split(".")[1];
                          if(!resprec){resprec=0;}else{resprec = resprec.length;}
                          rowstr=rowstr+'<td class="'+classadd+'">'+plusminus+parseFloat(e.target.feature.properties[k]).formatMoney(resprec)+'%</td>'; 
                        } */ //percent cant happen

                        if (cMap.type === 'regular') {
                            rowstr = rowstr + '<td data-sort-value="' + Number(e.target.feature.properties[k]) + '" class="' + classadd + '">' + plusminus + e.target.feature.properties[k] + '</td>';
                        }

                    }
                }
            }
            rowstr = rowstr + '</tr>';

        } else {

            //descriptive      //Table Flavor

            rowstr = '';

            //add matched records to table
            rowstr = '<tr class="' + e.target.feature.properties.geonum + '">';
            rowstr = rowstr + '<td>' + e.target.feature.properties.geoname + '</td>';
            rowstr = rowstr + '<td>' + e.target.feature.properties.geonum + '</td>';



            $.each(tabletree.data[cMap.tblfl].Data, function(k, v) {

                if ((tabletree.data[cMap.tblfl].Data[k].Formula).search("moe") !== -1) {
                    classadd = "moe";
                    plusminus = '&plusmn; ';
                } else {
                    classadd = "";
                    plusminus = '';
                }
                if ((tabletree.data[cMap.tblfl].Data[k].FieldName) === "CV") {
                    plusminus = '';
                } //no plusmn on coefficient of variance

                if (tabletree.data[cMap.tblfl].Data[k].type === "currency") {
                    rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + accounting.formatMoney(parseInt((eval(v.Formula)), 10), "$", 0) + '</td>';
                }
                if (tabletree.data[cMap.tblfl].Data[k].type === "percent") {
                    rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)).toFixed(2) + '" class="' + classadd + '">' + plusminus + Number(eval(v.Formula)).toFixed(2) + '%</td>';
                }
                if (tabletree.data[cMap.tblfl].Data[k].type === "regular") {
                    rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + eval(v.Formula) + '</td>';
                }
                if (tabletree.data[cMap.tblfl].Data[k].type === "number") {
                    resprec = (String(eval(v.Formula))).split(".")[1];
                    if (!resprec) {
                        resprec = 0;
                    } else {
                        resprec = resprec.length;
                    }
                    rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + parseFloat(eval(v.Formula)).toFixed(resprec) + '</td>';
                }

            });

            rowstr = rowstr + '</tr>';

        }

        $('#tablebody').append(rowstr);

        //hide (or not) if class=moe
        checkstate = $('input[name="my-checkbox"]').bootstrapSwitch('state');
        if (checkstate) {
            $('.moe').show();
        } else {
            $('.moe').hide();
        }

        //add item to array
        cMap.dataset.push(arr[1]);
    }

    updatequerysearchstring(cMap);

    // writeFooter();



}