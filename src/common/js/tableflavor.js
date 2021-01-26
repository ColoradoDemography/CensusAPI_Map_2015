module.exports = {
    "tree": "acs1115",
    "data": [{
            "ActualTable": "b19013",
            "TableAlias": "Median Household Income",
            "Summable": "no",
            "Type": "currency",
            "Data": [{
                "FieldName": "Median Household Income",
                "Formula": "fp.b19013001",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "Margin of Error",
                "Formula": "fp.b19013_moe001",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "CV",
                "Formula": "(((fp.b19013_moe001/1.645)/fp.b19013001)*100)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b25077",
            "TableAlias": "Median Home Value",
            "Summable": "no",
            "Type": "currency",
            "Data": [{
                "FieldName": "Median Home Value",
                "Formula": "fp.b25077001",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "Margin of Error",
                "Formula": "fp.b25077_moe001",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "CV",
                "Formula": "(((fp.b25077_moe001/1.645)/fp.b25077001)*100)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b19113",
            "TableAlias": "Median Family Income",
            "Summable": "no",
            "Type": "currency",
            "Data": [{
                "FieldName": "Median Family Income",
                "Formula": "fp.b19113001",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "Margin of Error",
                "Formula": "fp.b19113_moe001",
                "type": "currency",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b25035",
            "TableAlias": "Median Year Built",
            "Summable": "no",
            "Type": "regular",
            "Data": [{
                "FieldName": "Median Year Housing Unit Built",
                "Formula": "fp.b25035001",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Margin of Error",
                "Formula": "fp.b25035_moe001",
                "type": "regular",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b03002",
            "TableAlias": "Race-Ethnicity (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                    "FieldName": "Percent Hispanic",
                    "Formula": "((fp.b03002012/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }, {
                    "FieldName": "Percent White, Non-Hispanic",
                    "Formula": "((fp.b03002003/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }, {
                    "FieldName": "Percent Black, Non-Hispanic",
                    "Formula": "((fp.b03002004/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }, {
                    "FieldName": "Percent Native American, Non-Hispanic",
                    "Formula": "((fp.b03002005/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }, {
                    "FieldName": "Percent Asian, Non-Hispanic",
                    "Formula": "((fp.b03002006/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }, {
                    "FieldName": "Percent Hawaiian / Pacific Islander, Non-Hispanic",
                    "Formula": "((fp.b03002007/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }, {
                    "FieldName": "Percent Other Race, Non-Hispanic",
                    "Formula": "((fp.b03002008/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }, {
                    "FieldName": "Percent Two or More Races, Non-Hispanic",
                    "Formula": "((fp.b03002009/fp.b03002001)*100).toFixed(2)",
                    "type": "percent",
                    "sum": "none"
                }

            ]
        }, {
            "ActualTable": "b03002",
            "TableAlias": "Race-Ethnicity (total)",
            "Summable": "yes",
            "Type": "number",
            "Data": [{
                    "FieldName": "Hispanic",
                    "Formula": "fp.b03002012",
                    "type": "number",
                    "sum": "total"
                }, {
                    "FieldName": "White, Non-Hispanic",
                    "Formula": "fp.b03002003",
                    "type": "number",
                    "sum": "total"
                }, {
                    "FieldName": "Black, Non-Hispanic",
                    "Formula": "fp.b03002004",
                    "type": "number",
                    "sum": "total"
                }, {
                    "FieldName": "Native American, Non-Hispanic",
                    "Formula": "fp.b03002005",
                    "type": "number",
                    "sum": "total"
                }, {
                    "FieldName": "Asian, Non-Hispanic",
                    "Formula": "fp.b03002006",
                    "type": "number",
                    "sum": "total"
                }, {
                    "FieldName": "Hawaiian / Pacific Islander, Non-Hispanic",
                    "Formula": "fp.b03002007",
                    "type": "number",
                    "sum": "total"
                }, {
                    "FieldName": "Other Race, Non-Hispanic",
                    "Formula": "fp.b03002008",
                    "type": "number",
                    "sum": "total"
                }, {
                    "FieldName": "Two or More Races, Non-Hispanic",
                    "Formula": "fp.b03002009",
                    "type": "number",
                    "sum": "total"
                }

            ]
        }, {
            "ActualTable": "b01001",
            "TableAlias": "Age by Tens (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Age 0 to 9",
                "Formula": "(((Number(fp.b01001003)+Number(fp.b01001004)+Number(fp.b01001027)+Number(fp.b01001028))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 10 to 19",
                "Formula": "(((Number(fp.b01001005)+Number(fp.b01001006)+Number(fp.b01001007)+Number(fp.b01001029)+Number(fp.b01001030)+Number(fp.b01001031))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 20 to 29",
                "Formula": "(((Number(fp.b01001008)+Number(fp.b01001009)+Number(fp.b01001010)+Number(fp.b01001011)+Number(fp.b01001032)+Number(fp.b01001033)+Number(fp.b01001034)+Number(fp.b01001035))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 30 to 39",
                "Formula": "(((Number(fp.b01001012)+Number(fp.b01001013)+Number(fp.b01001036)+Number(fp.b01001037))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 40 to 49",
                "Formula": "(((Number(fp.b01001014)+Number(fp.b01001015)+Number(fp.b01001038)+Number(fp.b01001039))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 50 to 59",
                "Formula": "(((Number(fp.b01001016)+Number(fp.b01001017)+Number(fp.b01001040)+Number(fp.b01001041))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 60 to 69",
                "Formula": "(((Number(fp.b01001018)+Number(fp.b01001019)+Number(fp.b01001020)+Number(fp.b01001021)+Number(fp.b01001042)+Number(fp.b01001043)+Number(fp.b01001044)+Number(fp.b01001045))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 70 to 79",
                "Formula": "(((Number(fp.b01001022)+Number(fp.b01001023)+Number(fp.b01001046)+Number(fp.b01001047))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 80 plus",
                "Formula": "(((Number(fp.b01001024)+Number(fp.b01001025)+Number(fp.b01001048)+Number(fp.b01001049))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b01001",
            "TableAlias": "Age Group (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Age 0 to 9",
                "Formula": "(((Number(fp.b01001003)+Number(fp.b01001004)+Number(fp.b01001027)+Number(fp.b01001028) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 10 to 17",
                "Formula": "(((Number(fp.b01001005)+Number(fp.b01001006)+Number(fp.b01001029)+Number(fp.b01001030) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 18 to 24",
                "Formula": "(((Number(fp.b01001007)+Number(fp.b01001008)+Number(fp.b01001009)+Number(fp.b01001010)+Number(fp.b01001031)+Number(fp.b01001032)+Number(fp.b01001033)+Number(fp.b01001034) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 25 to 34",
                "Formula": "(((Number(fp.b01001011)+Number(fp.b01001012)+Number(fp.b01001035)+Number(fp.b01001036) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 35 to 44",
                "Formula": "(((Number(fp.b01001013)+Number(fp.b01001014)+Number(fp.b01001037)+Number(fp.b01001038) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 45 to 54",
                "Formula": "(((Number(fp.b01001015)+Number(fp.b01001016)+Number(fp.b01001039)+Number(fp.b01001040) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 55 to 64",
                "Formula": "(((Number(fp.b01001017)+Number(fp.b01001018)+Number(fp.b01001019)+Number(fp.b01001041)+Number(fp.b01001042)+Number(fp.b01001043) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Age 65 plus",
                "Formula": "(((Number(fp.b01001020)+Number(fp.b01001021)+Number(fp.b01001022)+Number(fp.b01001023)+Number(fp.b01001024)+Number(fp.b01001025)+Number(fp.b01001044)+Number(fp.b01001045)+Number(fp.b01001046)+Number(fp.b01001047)+Number(fp.b01001048)+Number(fp.b01001049) )/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b01002",
            "TableAlias": "Median Age",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Total",
                "Formula": "Number(fp.b01002001)",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Male",
                "Formula": "Number(fp.b01002002)",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Female",
                "Formula": "Number(fp.b01002003)",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Total (moe)",
                "Formula": "Number(fp.b01002_moe001)",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Male (moe)",
                "Formula": "Number(fp.b01002_moe002)",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Female (moe)",
                "Formula": "Number(fp.b01002_moe003)",
                "type": "regular",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b01001",
            "TableAlias": "Basic Population (total)",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Total",
                "Formula": "Number(fp.b01001001)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Male",
                "Formula": "Number(fp.b01001002)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Female",
                "Formula": "Number(fp.b01001026)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Total (moe)",
                "Formula": "Number(fp.b01001_moe001)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "Male (moe)",
                "Formula": "Number(fp.b01001_moe002)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "Female (moe)",
                "Formula": "Number(fp.b01001_moe026)",
                "type": "number",
                "sum": "total_moe"
            }]
        }, {
            "ActualTable": "b01001",
            "TableAlias": "Male & Female (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent Male",
                "Formula": "(((Number(fp.b01001002))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Female",
                "Formula": "(((Number(fp.b01001026))/Number(fp.b01001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b05002",
            "TableAlias": "Birthplace (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Native, Born in State of Residence",
                "Formula": "(((Number(fp.b05002003))/Number(fp.b05002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Native, Born in Different State",
                "Formula": "(((Number(fp.b05002004))/Number(fp.b05002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Native, Born Outside USA",
                "Formula": "(((Number(fp.b05002009))/Number(fp.b05002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Foreign Born",
                "Formula": "(((Number(fp.b05002013))/Number(fp.b05002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b05001",
            "TableAlias": "Citizenship (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "US Citizen by Birth",
                "Formula": "(((Number(fp.b05001002)+Number(fp.b05001003)+Number(fp.b05001004))/Number(fp.b05001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "US Citizen by Naturalization",
                "Formula": "(((Number(fp.b05001005))/Number(fp.b05001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Not a US Citizen",
                "Formula": "(((Number(fp.b05001006))/Number(fp.b05001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b18101",
            "TableAlias": "Disability (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Disabled",
                "Formula": "(((Number(fp.b18101004)+Number(fp.b18101007)+Number(fp.b18101010)+Number(fp.b18101013)+Number(fp.b18101016)+Number(fp.b18101019)+Number(fp.b18101023)+Number(fp.b18101026)+Number(fp.b18101029)+Number(fp.b18101032)+Number(fp.b18101035)+Number(fp.b18101038))/Number(fp.b18101001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Not Disabled",
                "Formula": "(((Number(fp.b18101005)+Number(fp.b18101008)+Number(fp.b18101011)+Number(fp.b18101014)+Number(fp.b18101017)+Number(fp.b18101020)+Number(fp.b18101024)+Number(fp.b18101027)+Number(fp.b18101030)+Number(fp.b18101033)+Number(fp.b18101036)+Number(fp.b18101039))/Number(fp.b18101001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b14001",
            "TableAlias": "Enrolled in School (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Enrolled in School",
                "Formula": "(((Number(fp.b14001002))/Number(fp.b14001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Enrolled in K-8",
                "Formula": "(((Number(fp.b14001004)+Number(fp.b14001005)+Number(fp.b14001006))/Number(fp.b14001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Enrolled in 9-12",
                "Formula": "(((Number(fp.b14001007))/Number(fp.b14001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Enrolled in College (all)",
                "Formula": "(((Number(fp.b14001008)+Number(fp.b14001009))/Number(fp.b14001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Not Enrolled in School",
                "Formula": "(((Number(fp.b14001010))/Number(fp.b14001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b23025",
            "TableAlias": "Unemployment (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent Unemployed",
                "Formula": "(((Number(fp.b23025005))/Number(fp.b23025002))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent of Labor Force in Armed Forces",
                "Formula": "(((Number(fp.b23025006))/Number(fp.b23025002))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent of Population in Labor Force",
                "Formula": "(((Number(fp.b23025002))/Number(fp.b23025001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent of Population Not in Labor Force",
                "Formula": "(((Number(fp.b23025007))/Number(fp.b23025001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b23025",
            "TableAlias": "Unemployment & Labor Force (total)",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Total Population",
                "Formula": "Number(fp.b23025001)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": " In Labor Force",
                "Formula": "Number(fp.b23025002)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "  Civilian Labor Force",
                "Formula": "Number(fp.b23025003)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "   Employed",
                "Formula": "Number(fp.b23025004)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "   Unemployed",
                "Formula": "Number(fp.b23025005)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "  Armed Forces",
                "Formula": "Number(fp.b23025006)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": " Not in Labor Force",
                "Formula": "Number(fp.b23025007)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Total Population (moe)",
                "Formula": "Number(fp.b23025_moe001)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": " In Labor Force (moe)",
                "Formula": "Number(fp.b23025_moe002)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "  Civilian Labor Force (moe)",
                "Formula": "Number(fp.b23025_moe003)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "   Employed (moe)",
                "Formula": "Number(fp.b23025_moe004)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "   Unemployed (moe)",
                "Formula": "Number(fp.b23025_moe005)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "  Armed Forces (moe)",
                "Formula": "Number(fp.b23025_moe006)",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": " Not in Labor Force (moe)",
                "Formula": "Number(fp.b23025_moe007)",
                "type": "number",
                "sum": "total_moe"
            }]
        }, {
            "ActualTable": "b19301",
            "TableAlias": "Per Capita Income",
            "Summable": "no",
            "Type": "currency",
            "Data": [{
                "FieldName": "Per Capita Income",
                "Formula": "fp.b19301001",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "Margin of Error",
                "Formula": "fp.b19301_moe001",
                "type": "currency",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b25010",
            "TableAlias": "Average Household Size",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Average Household Size",
                "Formula": "fp.b25010001",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Average Household Size - Owner Occupied",
                "Formula": "fp.b25010002",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Average Household Size - Renter Occupied",
                "Formula": "fp.b25010003",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Average Household Size (moe)",
                "Formula": "fp.b25010_moe001",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Average Household Size - Owner Occupied (moe)",
                "Formula": "fp.b25010_moe002",
                "type": "regular",
                "sum": "none"
            }, {
                "FieldName": "Average Household Size - Renter Occupied (moe)",
                "Formula": "fp.b25010_moe003",
                "type": "regular",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b25002",
            "TableAlias": "Housing Units (total)",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Total Housing Units",
                "Formula": "fp.b25002001",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Occupied Housing Units",
                "Formula": "fp.b25002002",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Vacant Housing Units",
                "Formula": "fp.b25002003",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Total Housing Units (moe)",
                "Formula": "fp.b25002_moe001",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "Occupied Housing Units (moe)",
                "Formula": "fp.b25002_moe002",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "Vacant Housing Units (moe)",
                "Formula": "fp.b25002_moe003",
                "type": "number",
                "sum": "total_moe"
            }]
        }, {
            "ActualTable": "b25002",
            "TableAlias": "Occupancy (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent Housing Units Occupied",
                "Formula": "(((Number(fp.b25002002))/Number(fp.b25002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Housing Units Vacant",
                "Formula": "(((Number(fp.b25002003))/Number(fp.b25002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b25058",
            "TableAlias": "Median Contract Rent",
            "Summable": "no",
            "Type": "currency",
            "Data": [{
                "FieldName": "Median Contract Rent",
                "Formula": "Number(fp.b25058001)",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "Margin of Error",
                "Formula": "Number(fp.b25058_moe001)",
                "type": "currency",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b25064",
            "TableAlias": "Median Gross Rent",
            "Summable": "no",
            "Type": "currency",
            "Data": [{
                "FieldName": "Median Gross Rent",
                "Formula": "Number(fp.b25064001)",
                "type": "currency",
                "sum": "none"
            }, {
                "FieldName": "Margin of Error",
                "Formula": "Number(fp.b25064_moe001)",
                "type": "currency",
                "sum": "none"
            }]
        }, {
            "ActualTable": "c17002",
            "TableAlias": "Poverty (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent Below 50% of Poverty",
                "Formula": "((Number(fp.c17002002)/Number(fp.c17002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Below 100% of Poverty",
                "Formula": "(((Number(fp.c17002002)+Number(fp.c17002003))/Number(fp.c17002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Below 150% of Poverty",
                "Formula": "(((Number(fp.c17002002)+Number(fp.c17002003)+Number(fp.c17002004)+Number(fp.c17002005))/Number(fp.c17002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Below 200% of Poverty",
                "Formula": "(((Number(fp.c17002002)+Number(fp.c17002003)+Number(fp.c17002004)+Number(fp.c17002005)+Number(fp.c17002006)+Number(fp.c17002007))/Number(fp.c17002001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b08006",
            "TableAlias": "Transportation to Work (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Drove a Car, Truck, or Van",
                "Formula": "((Number(fp.b08006002)/Number(fp.b08006001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Used Public Transportation",
                "Formula": "((Number(fp.b08006008)/Number(fp.b08006001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Biked to Work",
                "Formula": "((Number(fp.b08006014)/Number(fp.b08006001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Walked to Work",
                "Formula": "((Number(fp.b08006015)/Number(fp.b08006001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Other Transportation to Work",
                "Formula": "((Number(fp.b08006016)/Number(fp.b08006001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Worked at Home",
                "Formula": "((Number(fp.b08006017)/Number(fp.b08006001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b07003",
            "TableAlias": "Migration (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Did Not Move",
                "Formula": "((Number(fp.b07003004)/Number(fp.b07003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Moved Within County",
                "Formula": "((Number(fp.b07003007)/Number(fp.b07003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Moved from Different County Within State",
                "Formula": "((Number(fp.b07003010)/Number(fp.b07003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Moved from Different State",
                "Formula": "((Number(fp.b07003013)/Number(fp.b07003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Moved From Abroad",
                "Formula": "((Number(fp.b07003016)/Number(fp.b07003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b07003",
            "TableAlias": "Migration (total)",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Did Not Move",
                "Formula": "Number(fp.b07003004)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Moved Within County",
                "Formula": "Number(fp.b07003007)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Moved from Different County Within State",
                "Formula": "Number(fp.b07003010)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Moved from Different State",
                "Formula": "Number(fp.b07003013)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Moved From Abroad",
                "Formula": "Number(fp.b07003016)",
                "type": "number",
                "sum": "total"
            }]
        }, {
            "ActualTable": "b27001",
            "TableAlias": "Insurance (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent Insured",
                "Formula": "(((Number(fp.b27001004)+Number(fp.b27001007)+Number(fp.b27001010)+Number(fp.b27001013)+Number(fp.b27001016)+Number(fp.b27001019)+Number(fp.b27001022)+Number(fp.b27001025)+Number(fp.b27001028)+Number(fp.b27001032)+Number(fp.b27001035)+Number(fp.b27001038)+Number(fp.b27001041)+Number(fp.b27001044)+Number(fp.b27001047)+Number(fp.b27001050)+Number(fp.b27001053)+Number(fp.b27001056))/Number(fp.b27001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Uninsured",
                "Formula": "(((Number(fp.b27001005)+Number(fp.b27001008)+Number(fp.b27001011)+Number(fp.b27001014)+Number(fp.b27001017)+Number(fp.b27001020)+Number(fp.b27001023)+Number(fp.b27001026)+Number(fp.b27001029)+Number(fp.b27001033)+Number(fp.b27001036)+Number(fp.b27001039)+Number(fp.b27001042)+Number(fp.b27001045)+Number(fp.b27001048)+Number(fp.b27001051)+Number(fp.b27001054)+Number(fp.b27001057))/Number(fp.b27001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b27001",
            "TableAlias": "Insurance (total)",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Number Insured",
                "Formula": "(Number(fp.b27001004)+Number(fp.b27001007)+Number(fp.b27001010)+Number(fp.b27001013)+Number(fp.b27001016)+Number(fp.b27001019)+Number(fp.b27001022)+Number(fp.b27001025)+Number(fp.b27001028)+Number(fp.b27001032)+Number(fp.b27001035)+Number(fp.b27001038)+Number(fp.b27001041)+Number(fp.b27001044)+Number(fp.b27001047)+Number(fp.b27001050)+Number(fp.b27001053)+Number(fp.b27001056))",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Number Uninsured",
                "Formula": "(Number(fp.b27001005)+Number(fp.b27001008)+Number(fp.b27001011)+Number(fp.b27001014)+Number(fp.b27001017)+Number(fp.b27001020)+Number(fp.b27001023)+Number(fp.b27001026)+Number(fp.b27001029)+Number(fp.b27001033)+Number(fp.b27001036)+Number(fp.b27001039)+Number(fp.b27001042)+Number(fp.b27001045)+Number(fp.b27001048)+Number(fp.b27001051)+Number(fp.b27001054)+Number(fp.b27001057))",
                "type": "number",
                "sum": "total"
            }]
        }, {
            "ActualTable": "b25003",
            "TableAlias": "Tenure (total)",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Total Occupied Housing Units",
                "Formula": "fp.b25003001",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Owner Occupied",
                "Formula": "fp.b25003002",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Renter Occupied",
                "Formula": "fp.b25003003",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Total Occupied Housing Units (moe)",
                "Formula": "fp.b25003_moe001",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "Owner Occupied (moe)",
                "Formula": "fp.b25003_moe002",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "Renter Occupied (moe)",
                "Formula": "fp.b25003_moe003",
                "type": "number",
                "sum": "total_moe"
            }]
        }, {
            "ActualTable": "b25003",
            "TableAlias": "Tenure (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent Owner Occupied",
                "Formula": "((Number(fp.b25003002)/Number(fp.b25003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Renter Occupied",
                "Formula": "((Number(fp.b25003003)/Number(fp.b25003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b11001",
            "TableAlias": "Household Type (total)",
            "Summable": "no",
            "Type": "number",
            "Data": [{
                "FieldName": "Total Households",
                "Formula": "fp.b11001001",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "  Family Households",
                "Formula": "fp.b11001002",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "   Married-couple family",
                "Formula": "fp.b11001003",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "   Other family",
                "Formula": "fp.b11001004",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "    Male Householder, no Wife Present",
                "Formula": "fp.b11001005",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "    Female Householder, no Husband Present",
                "Formula": "fp.b11001006",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "  Nonfamily households",
                "Formula": "fp.b11001007",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "   Householder Living Alone",
                "Formula": "fp.b11001008",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "   Householder Not Living Alone",
                "Formula": "fp.b11001009",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Total Households (moe)",
                "Formula": "fp.b11001_moe001",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "  Family Households (moe)",
                "Formula": "fp.b11001_moe002",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "   Married-couple family (moe)",
                "Formula": "fp.b11001_moe003",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "   Other family (moe)",
                "Formula": "fp.b11001_moe004",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "    Male Householder, no Wife Present (moe)",
                "Formula": "fp.b11001_moe005",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "    Female Householder, no Husband Present (moe)",
                "Formula": "fp.b11001_moe006",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "  Nonfamily households (moe)",
                "Formula": "fp.b11001_moe007",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "   Householder Living Alone (moe)",
                "Formula": "fp.b11001_moe008",
                "type": "number",
                "sum": "total_moe"
            }, {
                "FieldName": "   Householder Not Living Alone (moe)",
                "Formula": "fp.b11001_moe009",
                "type": "number",
                "sum": "total_moe"
            }]
        }, {
            "ActualTable": "b11001",
            "TableAlias": "Household Type (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent Family Households",
                "Formula": "((Number(fp.b11001002)/Number(fp.b11001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Nonfamily households",
                "Formula": "((Number(fp.b11001007)/Number(fp.b11001001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent of Nonfamily Householders Living Alone",
                "Formula": "((Number(fp.b11001008)/Number(fp.b11001007))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent of Nonfamily Householders Not Living Alone",
                "Formula": "((Number(fp.b11001009)/Number(fp.b11001007))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b15003",
            "TableAlias": "Educational Attainment (percent)",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Percent No High School Diploma",
                "Formula": "(((Number(fp.b15003002)+Number(fp.b15003003)+Number(fp.b15003004)+Number(fp.b15003005)+Number(fp.b15003006)+Number(fp.b15003007)+Number(fp.b15003008)+Number(fp.b15003009)+Number(fp.b15003010)+Number(fp.b15003011)+Number(fp.b15003012)+Number(fp.b15003013)+Number(fp.b15003014)+Number(fp.b15003015)+Number(fp.b15003016))/Number(fp.b15003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent High School Diploma, No College",
                "Formula": "(((Number(fp.b15003017)+Number(fp.b15003018))/Number(fp.b15003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent High School Diploma, Some College",
                "Formula": "(((Number(fp.b15003019)+Number(fp.b15003020)+Number(fp.b15003021))/Number(fp.b15003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Bachelors Degree, No Postgraduate",
                "Formula": "((Number(fp.b15003022)/Number(fp.b15003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Percent Advanced Degree",
                "Formula": "(((Number(fp.b15003023)+Number(fp.b15003024)+Number(fp.b15003025))/Number(fp.b15003001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b11005",
            "TableAlias": "Percent of Households with Children Under 18",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Total Households",
                "Formula": "Number(fp.b11005001)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Total Households w Children < 18",
                "Formula": "Number(fp.b11005002)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Percent Households w Children < 18",
                "Formula": "((Number(fp.b11005002)/Number(fp.b11005001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b06007",
            "TableAlias": "Place of Birth by Language Spoken at Home and Ability to Speak English",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Population 5 Years and Over",
                "Formula": "Number(fp.b06007001)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Speak Spanish",
                "Formula": "((Number(fp.b06007003)/Number(fp.b06007001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }, {
                "FieldName": "Speak English less than very well",
                "Formula": "(((Number(fp.b06007008)+Number(fp.b06007005))/Number(fp.b06007001))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }, {
            "ActualTable": "b25101",
            "TableAlias": "Mortgage Status by Monthly Housing Costs as a Percentage of Household Income",
            "Summable": "no",
            "Type": "percent",
            "Data": [{
                "FieldName": "Owner Occupied Households",
                "Formula": "Number(fp.b25101001)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "With a Mortgage",
                "Formula": "Number(fp.b25101002)",
                "type": "number",
                "sum": "total"
            }, {
                "FieldName": "Cost Burdened",
                "Formula": "(((Number(fp.b25101006)+Number(fp.b25101010)+Number(fp.b25101014)+Number(fp.b25101018)+Number(fp.b25101022))/Number(fp.b25101002))*100).toFixed(2)",
                "type": "percent",
                "sum": "none"
            }]
        }
        //
    ]
}