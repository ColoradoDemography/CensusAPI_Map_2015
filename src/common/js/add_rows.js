var accounting = require("accounting");
var tabletree = require("./tableflavor.js");

module.exports = function(data, cMap) {


        //create column headers
        var tblstr = '',
            datatype = 'float',
            tableclassadd = '',
            rowstr = '',
            classadd = '',
            plusminus = '',
            resprec, checkstate, i;


        cMap.tblfl = $('#tableoption').val();

        //Plain Table
        //if select value is 0, it means plain table is selected
        if (cMap.tblfl === '-1') {
            $.each(data.data[0], function(k) {

                if (k.search("moe") !== -1) {
                    tableclassadd = "moe";
                } else {
                    tableclassadd = "";
                }
                if (k !== 'state' && k !== 'county' && k !== 'place' && k !== 'tract' && k !== 'bg') {

                    if (k === 'geoname') {
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

            for (i = 0; i < tabletree.data[cMap.tblfl].Data.length; i = i + 1) {

                //console.log(tabletree.data[cMap.tblfl].Data[i].Formula);
                if ((tabletree.data[cMap.tblfl].Data[i].Formula).search("moe") !== -1) {
                    tableclassadd = "moe";
                } else {
                    tableclassadd = "";
                }

                tblstr = tblstr + '<th data-sort="' + datatype + '" class="' + tableclassadd + '">' + tabletree.data[cMap.tblfl].Data[i].FieldName + '</th>';

            }


        }


        //Both Plain and Table Favor Append tblstr
        $('#tableheader').append(tblstr);



        if (cMap.stopafterheader === 0) {
            //add rows

            if (cMap.tblfl === '-1') {
                //Plain
                for (i = 0; i < (data.data).length; i = i + 1) {

                    //add matched records to table
                    rowstr = '<tr class="' + data.data[i].geonum + '">';

                    $.each(data.data[i], function(k, v) {
                        if (k === 'geoname' || k === 'geonum') {
                            rowstr = rowstr + '<td>' + v + '</td>';
                        }
                        if (k !== 'state' && k !== 'county' && k !== 'place' && k !== 'tract' && k !== 'bg' && k !== 'geoname' && k !== 'geonum') {

                            if (k.search("moe") !== -1) {
                                classadd = "moe";
                                plusminus = '&plusmn; ';
                            } else {
                                classadd = "";
                                plusminus = '';
                            }

                            if (cMap.type === "currency") {
                                rowstr = rowstr + '<td data-sort-value="' + Number(v) + '" class="' + classadd + '">' + plusminus + '' + accounting.formatMoney(parseInt(v, 10), "$", 0) + '</td>';
                            }
                            if (cMap.type === "number" || cMap.type === "percent") {
                                resprec = (String(v)).split(".")[1];
                                if (!resprec) {
                                    resprec = 0;
                                } else {
                                    resprec = resprec.length;
                                }
                                rowstr = rowstr + '<td data-sort-value="' + Number(v) + '" class="' + classadd + '">' + plusminus + (parseFloat(v)).toFixed(resprec) + '</td>';
                            }
                            if (cMap.type === "regular") {
                                rowstr = rowstr + '<td data-sort-value="' + Number(v) + '" class="' + classadd + '">' + plusminus + v + '</td>';
                            }


                        }
                    });

                    rowstr = rowstr + '</tr>';

                    //Both Plain and Table Flavor Append Rows Here
                    $('#tablebody').append(rowstr);
                }


            } else {

                //Table Flavor
                for (i = 0; i < (data.data).length; i = i + 1) {
                    //console.log(i);
                    //add matched records to table
                    rowstr = '<tr class="' + data.data[i].geonum + '">';
                    rowstr = rowstr + '<td>' + data.data[i].geoname + '</td>';
                    rowstr = rowstr + '<td>' + data.data[i].geonum + '</td>';


                    $.each(tabletree.data[cMap.tblfl].Data, function(k, v) {
                        //fp = data.data[i];

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
                            rowstr = rowstr + '<td data-sort-value="' + Number(eval(v.Formula)) + '" class="' + classadd + '">' + plusminus + accounting.formatMoney(parseInt(eval(v.Formula), 10), "$", 0) + '</td>';
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
                        if (tabletree.data[cMap.tblfl].Data[k].type === "percent") {
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
            checkstate = $('input[name="my-checkbox"]').bootstrapSwitch('state');
            if (checkstate) {
                $('.moe').show();
            } else {
                $('.moe').hide();
            }


            // writeFooter();  //todo


        } //stop after header
    } //end addRows