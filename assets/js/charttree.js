

var charttree = {
    "tree": "acs0913",
    "data": [
        {
            "ActualTable": "b19013",
            "ChartTable": "b19001",
            "ChartAlias": "Household Income",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Less than $20k",
                    "Formula": "c.b19001002+c.b19001003+c.b19001004",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19001_moe002,2)+Math.pow(m.b19001_moe003,2)+Math.pow(m.b19001_moe004,2))"
                },
                {
                    "FieldName": "$20k to $30k",
                    "Formula": "c.b19001005+c.b19001006",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19001_moe005,2)+Math.pow(m.b19001_moe006,2))"
                },
                {
                    "FieldName": "$30k to $40k",
                    "Formula": "c.b19001007+c.b19001008",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19001_moe007,2)+Math.pow(m.b19001_moe008,2))"
                },
                {
                    "FieldName": "$40k to $50k",
                    "Formula": "c.b19001009+c.b19001010",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19001_moe009,2)+Math.pow(m.b19001_moe010,2))"
                },
                {
                    "FieldName": "$50k to $60k",
                    "Formula": "c.b19001011",
                    "MoeFormula": "m.b19001_moe011"
                },
                {
                    "FieldName": "$60k to $75k",
                    "Formula": "c.b19001012",
                    "MoeFormula": "m.b19001_moe012"
                },
                {
                    "FieldName": "$75k to $100k",
                    "Formula": "c.b19001013",
                    "MoeFormula": "m.b19001_moe013"
                },
                {
                    "FieldName": "$100k to $125k",
                    "Formula": "c.b19001014",
                    "MoeFormula": "m.b19001_moe014"
                },
                {
                    "FieldName": "$125k to $150k",
                    "Formula": "c.b19001015",
                    "MoeFormula": "m.b19001_moe015"
                },
                {
                    "FieldName": "$150k to $200k",
                    "Formula": "c.b19001016",
                    "MoeFormula": "m.b19001_moe016"
                },
                {
                    "FieldName": "$200k +",
                    "Formula": "c.b19001017",
                    "MoeFormula": "m.b19001_moe017"
                }
            ]
        },{
            "ActualTable": "b01001,b01002",
            "ChartTable": "b01001",
            "ChartAlias": "Age Distribution",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Age 0 to 9",
                    "Formula": "c.b01001003+c.b01001004+c.b01001027+c.b01001028",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe003,2)+Math.pow(m.b01001_moe004,2)+Math.pow(m.b01001_moe027,2)+Math.pow(m.b01001_moe028,2))"
                },
                {
                    "FieldName": "Age 10 to 19",
                    "Formula": "c.b01001005+c.b01001006+c.b01001007+c.b01001029+c.b01001030+c.b01001031",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe005,2)+Math.pow(m.b01001_moe006,2)+Math.pow(m.b01001_moe007,2)+Math.pow(m.b01001_moe029,2)+Math.pow(m.b01001_moe030,2)+Math.pow(m.b01001_moe031,2))"
                },
                {
                    "FieldName": "Age 20 to 29",
                    "Formula": "c.b01001008+c.b01001009+c.b01001010+c.b01001011+c.b01001032+c.b01001033+c.b01001034+c.b01001035",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe008,2)+Math.pow(m.b01001_moe009,2)+Math.pow(m.b01001_moe010,2)+Math.pow(m.b01001_moe011,2)+Math.pow(m.b01001_moe032,2)+Math.pow(m.b01001_moe033,2)+Math.pow(m.b01001_moe034,2)+Math.pow(m.b01001_moe035,2))"
                },
                {
                    "FieldName": "Age 30 to 39",
                    "Formula": "c.b01001012+c.b01001013+c.b01001036+c.b01001037",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe012,2)+Math.pow(m.b01001_moe013,2)+Math.pow(m.b01001_moe036,2)+Math.pow(m.b01001_moe037,2))"
                },
                {
                    "FieldName": "Age 40 to 49",
                    "Formula": "c.b01001014+c.b01001015+c.b01001038+c.b01001039",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe014,2)+Math.pow(m.b01001_moe015,2)+Math.pow(m.b01001_moe038,2)+Math.pow(m.b01001_moe039,2))"
                },
                {
                    "FieldName": "Age 50 to 59",
                    "Formula": "c.b01001016+c.b01001017+c.b01001040+c.b01001041",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe016,2)+Math.pow(m.b01001_moe017,2)+Math.pow(m.b01001_moe040,2)+Math.pow(m.b01001_moe041,2))"
                },
                {
                    "FieldName": "Age 60 to 69",
                    "Formula": "c.b01001018+c.b01001019+c.b01001020+c.b01001021+c.b01001042+c.b01001043+c.b01001044+c.b01001045",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe018,2)+Math.pow(m.b01001_moe019,2)+Math.pow(m.b01001_moe020,2)+Math.pow(m.b01001_moe021,2)+Math.pow(m.b01001_moe042,2)+Math.pow(m.b01001_moe043,2)+Math.pow(m.b01001_moe044,2)+Math.pow(m.b01001_moe045,2))"
                },
                {
                    "FieldName": "Age 70 to 79",
                    "Formula": "c.b01001022+c.b01001023+c.b01001046+c.b01001047",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe022,2)+Math.pow(m.b01001_moe023,2)+Math.pow(m.b01001_moe046,2)+Math.pow(m.b01001_moe047,2))"
                },
                {
                    "FieldName": "Age 80 +",
                    "Formula": "c.b01001024+c.b01001025+c.b01001048+c.b01001049",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b01001_moe024,2)+Math.pow(m.b01001_moe025,2)+Math.pow(m.b01001_moe048,2)+Math.pow(m.b01001_moe049,2))"
                }
            ]
        },{
            "ActualTable": "b15003",
            "ChartTable": "b15003",
            "ChartAlias": "Educational Attainment",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "No High School Diploma",
                    "Formula": "c.b15003002+c.b15003003+c.b15003004+c.b15003005+c.b15003006+c.b15003007+c.b15003008+c.b15003009+c.b15003010+c.b15003011+c.b15003012+c.b15003013+c.b15003014+c.b15003015+c.b15003016",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b15003_moe002,2)+Math.pow(m.b15003_moe003,2)+Math.pow(m.b15003_moe004,2)+Math.pow(m.b15003_moe005,2)+Math.pow(m.b15003_moe006,2)+Math.pow(m.b15003_moe007,2)+Math.pow(m.b15003_moe008,2)+Math.pow(m.b15003_moe009,2)+Math.pow(m.b15003_moe010,2)+Math.pow(m.b15003_moe011,2)+Math.pow(m.b15003_moe012,2)+Math.pow(m.b15003_moe013,2)+Math.pow(m.b15003_moe014,2)+Math.pow(m.b15003_moe015,2)+Math.pow(m.b15003_moe016,2))"
                },
                {
                    "FieldName": "High School or Equivalent",
                    "Formula": "c.b15003017+c.b15003018",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b15003_moe017,2)+Math.pow(m.b15003_moe018,2))"
                },
                {
                    "FieldName": "Some College or Associates",
                    "Formula": "c.b15003019+c.b15003020+c.b15003021",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b15003_moe019,2)+Math.pow(m.b15003_moe020,2)+Math.pow(m.b15003_moe021,2))"
                },
                {
                    "FieldName": "Bachelors Degree",
                    "Formula": "c.b15003022",
                    "MoeFormula": "m.b15003_moe022"
                },
                {
                    "FieldName": "Masters Degree or Higher",
                    "Formula": "c.b15003023+c.b15003024+c.b15003025",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b15003_moe023,2)+Math.pow(m.b15003_moe024,2)+Math.pow(m.b15003_moe025,2))"
                }
            ]
        },{
            "ActualTable": "b08012",
            "ChartTable": "b08012",
            "ChartAlias": "Commute Time",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Less than 10 minutes",
                    "Formula": "c.b08012002+c.b08012003",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b08012_moe002,2)+Math.pow(m.b08012_moe003,2))"
                },
                {
                    "FieldName": "10 to 19 minutes",
                    "Formula": "c.b08012004+c.b08012005",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b08012_moe004,2)+Math.pow(m.b08012_moe005,2))"
                },
                {
                    "FieldName": "20 to 29 minutes",
                    "Formula": "c.b08012006+c.b08012007",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b08012_moe006,2)+Math.pow(m.b08012_moe007,2))"
                },
                {
                    "FieldName": "30 to 39 minutes",
                    "Formula": "c.b08012008+c.b08012009",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b08012_moe008,2)+Math.pow(m.b08012_moe009,2))"
                },
                {
                    "FieldName": "40 to 59 minutes",
                    "Formula": "c.b08012010+c.b08012011",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b08012_moe010,2)+Math.pow(m.b08012_moe011,2))"
                },
                {
                    "FieldName": "Commute 60 minutes +",
                    "Formula": "c.b08012012+c.b08012013",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b08012_moe012,2)+Math.pow(m.b08012_moe013,2))"
                }
            ]
        },{
            "ActualTable": "b25035",
            "ChartTable": "b25034",
            "ChartAlias": "Year Housing Unit Built",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Built Before 1940",
                    "Formula": "c.b25034010",
                    "MoeFormula": "m.b25034_moe010"
                },
                {
                    "FieldName": "Built 1940 to 1949",
                    "Formula": "c.b25034009",
                    "MoeFormula": "m.b25034_moe009"
                },
                {
                    "FieldName": "Built 1950 to 1959",
                    "Formula": "c.b25034008",
                    "MoeFormula": "m.b25034_moe008"
                },              
                {
                    "FieldName": "Built 1960 to 1969",
                    "Formula": "c.b25034007",
                    "MoeFormula": "m.b25034_moe007"
                },
                {
                    "FieldName": "Built 1970 to 1979",
                    "Formula": "c.b25034006",
                    "MoeFormula": "m.b25034_moe006"
                },
                {
                    "FieldName": "Built 1980 to 1989",
                    "Formula": "c.b25034005",
                    "MoeFormula": "m.b25034_moe005"
                },
                {
                    "FieldName": "Built 1990 to 1999",
                    "Formula": "c.b25034004",
                    "MoeFormula": "m.b25034_moe004"
                },
                {
                    "FieldName": "Built 2000 to 2009",
                    "Formula": "c.b25034003",
                    "MoeFormula": "m.b25034_moe003"
                },
                {
                    "FieldName": "Built 2010 or later",
                    "Formula": "c.b25034002",
                    "MoeFormula": "m.b25034_moe002"
                }
            ]
        },{
            "ActualTable": "b25077",
            "ChartTable": "b25075",
            "ChartAlias": "Value of Owner Occupied Housing Units",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Value < $50k",
                    "Formula": "c.b25075002+c.b25075003+c.b25075004+c.b25075005+c.b25075006+c.b25075007+c.b25075008+c.b25075009",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25075_moe002,2)+Math.pow(m.b25075_moe003,2)+Math.pow(m.b25075_moe004,2)+Math.pow(m.b25075_moe005,2)+Math.pow(m.b25075_moe006,2)+Math.pow(m.b25075_moe007,2)+Math.pow(m.b25075_moe008,2)+Math.pow(m.b25075_moe009,2))"
                },
                {
                    "FieldName": "$50k to $100k",
                    "Formula": "c.b25075010+c.b25075011+c.b25075012+c.b25075013+c.b25075014",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25075_moe010,2)+Math.pow(m.b25075_moe011,2)+Math.pow(m.b25075_moe012,2)+Math.pow(m.b25075_moe013,2)+Math.pow(m.b25075_moe014,2))"
                },
                {
                    "FieldName": "$100k to $150k",
                    "Formula": "c.b25075015+c.b25075016",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25075_moe015,2)+Math.pow(m.b25075_moe016,2))"
                },              
                {
                    "FieldName": "$150k to $200k",
                    "Formula": "c.b25075017+c.b25075018",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25075_moe017,2)+Math.pow(m.b25075_moe018,2))"
                },
                {
                    "FieldName": "$200k to $250k",
                    "Formula": "c.b25075019",
                    "MoeFormula": "m.b25075_moe019"
                },
                {
                    "FieldName": "$250k to $300k",
                    "Formula": "c.b25075020",
                    "MoeFormula": "m.b25075_moe020"
                },
                {
                    "FieldName": "$300k to $400k",
                    "Formula": "c.b25075021",
                    "MoeFormula": "m.b25075_moe021"
                },
                {
                    "FieldName": "$400k to $500k",
                    "Formula": "c.b25075022",
                    "MoeFormula": "m.b25075_moe022"
                },
                {
                    "FieldName": "$500k to $750k",
                    "Formula": "c.b25075023",
                    "MoeFormula": "m.b25075_moe023"
                },
                {
                    "FieldName": "$750k to $1m",
                    "Formula": "c.b25075024",
                    "MoeFormula": "m.b25075_moe024"
                },
                {
                    "FieldName": "$1 million +",
                    "Formula": "c.b25075025",
                    "MoeFormula": "m.b25075_moe025"
                }
            ]
        },{
            "ActualTable": "b25064",
            "ChartTable": "b25063",
            "ChartAlias": "Gross Rent",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Rent < $400/mo",
                    "Formula": "c.b25063003+c.b25063004+c.b25063005+c.b25063006+c.b25063007+c.b25063008+c.b25063009",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25063_moe003,2)+Math.pow(m.b25063_moe004,2)+Math.pow(m.b25063_moe005,2)+Math.pow(m.b25063_moe006,2)+Math.pow(m.b25063_moe007,2)+Math.pow(m.b25063_moe008,2)+Math.pow(m.b25063_moe009,2))"
                },              
                {
                    "FieldName": "$400 to $599",
                    "Formula": "c.b25063010+c.b25063011+c.b25063012+c.b25063013",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25063_moe010,2)+Math.pow(m.b25063_moe011,2)+Math.pow(m.b25063_moe012,2)+Math.pow(m.b25063_moe013,2))"
                },
                {
                    "FieldName": "$600 to $799",
                    "Formula": "c.b25063014+c.b25063015+c.b25063016+c.b25063017",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25063_moe014,2)+Math.pow(m.b25063_moe015,2)+Math.pow(m.b25063_moe016,2)+Math.pow(m.b25063_moe017,2))"
                },
                {
                    "FieldName": "$800 to $999",
                    "Formula": "c.b25063018+c.b25063019",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25063_moe018,2)+Math.pow(m.b25063_moe019,2))"
                },
                {
                    "FieldName": "$1,000 to $1,249",
                    "Formula": "c.b25063020",
                    "MoeFormula": "m.b25063_moe020"
                },
                {
                    "FieldName": "$1,250 to $1,499",
                    "Formula": "c.b25063021",
                    "MoeFormula": "m.b25063_moe021"
                },
                {
                    "FieldName": "$1,500 to $1,999",
                    "Formula": "c.b25063022",
                    "MoeFormula": "m.b25063_moe022"
                },
                {
                    "FieldName": "$2,000 +",
                    "Formula": "c.b25063023",
                    "MoeFormula": "m.b25063_moe023"
                },
                {
                    "FieldName": "No Cash Rent",
                    "Formula": "c.b25063024",
                    "MoeFormula": "m.b25063_moe024"
                }
            ]
        },{
            "ActualTable": "b05002",
            "ChartTable": "b05002",
            "ChartAlias": "Place of Birth",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Native: Born in State",
                    "Formula": "c.b05002003",
                    "MoeFormula": "m.b05002_moe003"
                },
                {
                    "FieldName": "Native: Born in Other State",
                    "Formula": "c.b05002004",
                    "MoeFormula": "m.b05002_moe004"
                },
                {
                    "FieldName": "Native: Born Outside USA",
                    "Formula": "c.b05002009",
                    "MoeFormula": "m.b05002_moe009"
                },
                {
                    "FieldName": "Foreign Born",
                    "Formula": "c.b05002013",
                    "MoeFormula": "m.b05002_moe013"
                }
            ]
        },{
            "ActualTable": "b05001",
            "ChartTable": "b05001",
            "ChartAlias": "Citizenship",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Native: Born in State",
                    "Formula": "c.b05001002+c.b05001003+c.b05001004",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b05001_moe002,2)+Math.pow(m.b05001_moe003,2)+Math.pow(m.b05001_moe004,2))"
                },
                {
                    "FieldName": "Native: Born in Other State",
                    "Formula": "c.b05001005",
                    "MoeFormula": "m.b05001_moe005"
                },
                {
                    "FieldName": "Native: Born Outside USA",
                    "Formula": "c.b05001006",
                    "MoeFormula": "m.b05001_moe006"
                }
            ]
        },{
            "ActualTable": "b18101",
            "ChartTable": "b18101",
            "ChartAlias": "Disability by Age",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Under 18: With a Disability",
                    "Formula": "c.b18101004+c.b18101007+c.b18101023+c.b18101026",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe004,2)+Math.pow(m.b18101_moe007,2)+Math.pow(m.b18101_moe023,2)+Math.pow(m.b18101_moe026,2))"
                },
                {
                    "FieldName": "Under 18: No Disability",
                    "Formula": "c.b18101005+c.b18101008+c.b18101024+c.b18101027",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe005,2)+Math.pow(m.b18101_moe008,2)+Math.pow(m.b18101_moe024,2)+Math.pow(m.b18101_moe027,2))"
                },
                {
                    "FieldName": "18 to 34: With a Disability",
                    "Formula": "c.b18101010+c.b18101029",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe010,2)+Math.pow(m.b18101_moe029,2))"
                },
                {
                    "FieldName": "18 to 34: No Disability",
                    "Formula": "c.b18101011+c.b18101030",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe011,2)+Math.pow(m.b18101_moe030,2))"
                },                
                {
                    "FieldName": "35 to 64: With a Disability",
                    "Formula": "c.b18101013+c.b18101032",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe013,2)+Math.pow(m.b18101_moe032,2))"
                },
                {
                    "FieldName": "35 to 64: No Disability",
                    "Formula": "c.b18101014+c.b18101033",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe014,2)+Math.pow(m.b18101_moe033,2))"
                },                
                {
                    "FieldName": "65 to 74: With a Disability",
                    "Formula": "c.b18101016+c.b18101035",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe016,2)+Math.pow(m.b18101_moe035,2))"
                },
                {
                    "FieldName": "65 to 74: No Disability",
                    "Formula": "c.b18101017+c.b18101036",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe017,2)+Math.pow(m.b18101_moe036,2))"
                },                
                {
                    "FieldName": "75 + : With a Disability",
                    "Formula": "c.b18101019+c.b18101038",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe019,2)+Math.pow(m.b18101_moe038,2))"
                },
                {
                    "FieldName": "75 + : No Disability",
                    "Formula": "c.b18101020+c.b18101039",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b18101_moe020,2)+Math.pow(m.b18101_moe039,2))"
                }
            ]
        },{
            "ActualTable": "b14001",
            "ChartTable": "b14001",
            "ChartAlias": "School Enrollment",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Enrolled: PK to 8th",
                    "Formula": "c.b14001003+c.b14001004+c.b14001005+c.b14001006",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b14001_moe003,2)+Math.pow(m.b14001_moe004,2)+Math.pow(m.b14001_moe005,2)+Math.pow(m.b14001_moe006,2))"
                },
                {
                    "FieldName": "Enrolled: 9th to 12th",
                    "Formula": "c.b14001007",
                    "MoeFormula": "m.b14001_moe007"
                },
                {
                    "FieldName": "Enrolled: In College (all)",
                    "Formula": "c.b14001008+c.b14001009",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b14001_moe008,2)+Math.pow(m.b14001_moe009,2))"
                },
                {
                    "FieldName": "Not Enrolled",
                    "Formula": "c.b14001010",
                    "MoeFormula": "m.b14001_moe010"
                }
            ]
        },{
            "ActualTable": "b23025",
            "ChartTable": "b23025",
            "ChartAlias": "Labor Force",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Civilian: Employed",
                    "Formula": "c.b23025004",
                    "MoeFormula": "m.b23025_moe004"
                },
                {
                    "FieldName": "Civilian: Unemployed",
                    "Formula": "c.b23025005",
                    "MoeFormula": "m.b23025_moe005"
                },
                {
                    "FieldName": "Armed Forces",
                    "Formula": "c.b23025006",
                    "MoeFormula": "m.b23025_moe006"
                },
                {
                    "FieldName": "Not in labor force",
                    "Formula": "c.b23025007",
                    "MoeFormula": "m.b23025_moe007"
                }
            ]
        },{
            "ActualTable": "b11001,b11005",
            "ChartTable": "b11001",
            "ChartAlias": "Family & Nonfamily Households",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Family households",
                    "Formula": "c.b11001002",
                    "MoeFormula": "m.b11001_moe002"
                },
                {
                    "FieldName": "Married-couple family",
                    "Formula": "c.b11001003",
                    "MoeFormula": "m.b11001_moe003"
                },
                {
                    "FieldName": "Male householder, no wife",
                    "Formula": "c.b11001005",
                    "MoeFormula": "m.b11001_moe005"
                },
                {
                    "FieldName": "Female householder, no husband",
                    "Formula": "c.b11001006",
                    "MoeFormula": "m.b11001_moe006"
                },
                {
                    "FieldName": "Nonfamily households",
                    "Formula": "c.b11001007",
                    "MoeFormula": "m.b11001_moe007"
                },
                {
                    "FieldName": "Nonfamily: Householder alone",
                    "Formula": "c.b11001008",
                    "MoeFormula": "m.b11001_moe008"
                },
                {
                    "FieldName": "Nonfamily: Householder not alone",
                    "Formula": "c.b11001009",
                    "MoeFormula": "m.b11001_moe009"
                }
            ]
        },{
            "ActualTable": "b25001,b25002",
            "ChartTable": "b25002",
            "ChartAlias": "Occupancy Status",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Occupied",
                    "Formula": "c.b25002002",
                    "MoeFormula": "m.b25002_moe002"
                },
                {
                    "FieldName": "Vacant",
                    "Formula": "c.b25002003",
                    "MoeFormula": "m.b25002_moe003"
                }
            ]
        },{
            "ActualTable": "b25004",
            "ChartTable": "b25004",
            "ChartAlias": "Vacancy Status",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "For Rent",
                    "Formula": "c.b25004002",
                    "MoeFormula": "m.b25004_moe002"
                },
                {
                    "FieldName": "Rented, Not Occupied",
                    "Formula": "c.b25004003",
                    "MoeFormula": "m.b25004_moe003"
                },
                {
                    "FieldName": "For Sale Only",
                    "Formula": "c.b25004004",
                    "MoeFormula": "m.b25004_moe004"
                },
                {
                    "FieldName": "Sold, Not Occupied",
                    "Formula": "c.b25004005",
                    "MoeFormula": "m.b25004_moe005"
                },
                {
                    "FieldName": "Seasonal or Occasional Use",
                    "Formula": "c.b25004006",
                    "MoeFormula": "m.b25004_moe006"
                },
                {
                    "FieldName": "Migrant Worker Housing",
                    "Formula": "c.b25004007",
                    "MoeFormula": "m.b25004_moe007"
                },
                {
                    "FieldName": "Other Vacant",
                    "Formula": "c.b25004008",
                    "MoeFormula": "m.b25004_moe008"
                }            
            ]
        },{
            "ActualTable": "b25003",
            "ChartTable": "b25003",
            "ChartAlias": "Tenure (Own/Rent) Status",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Owner Occupied",
                    "Formula": "c.b25003002",
                    "MoeFormula": "m.b25003_moe002"
                },
                {
                    "FieldName": "Renter Occupied",
                    "Formula": "c.b25003003",
                    "MoeFormula": "m.b25003_moe003"
                }
            ]
        },{
            "ActualTable": "b25010",
            "ChartTable": "b11016",
            "ChartAlias": "Household Size",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "1 Person",
                    "Formula": "c.b11016010",
                    "MoeFormula": "m.b11016_moe010"
                },
                {
                    "FieldName": "2 Persons",
                    "Formula": "c.b11016003+c.b11016011",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b11016_moe003,2)+Math.pow(m.b11016_moe011,2))"
                },
                {
                    "FieldName": "3 Persons",
                    "Formula": "c.b11016004+c.b11016012",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b11016_moe004,2)+Math.pow(m.b11016_moe012,2))"
                },
                {
                    "FieldName": "4 Persons",
                    "Formula": "c.b11016005+c.b11016013",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b11016_moe005,2)+Math.pow(m.b11016_moe013,2))"
                },
                {
                    "FieldName": "5 Persons",
                    "Formula": "c.b11016006+c.b11016014",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b11016_moe006,2)+Math.pow(m.b11016_moe014,2))"
                },
                {
                    "FieldName": "6 Persons",
                    "Formula": "c.b11016007+c.b11016015",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b11016_moe007,2)+Math.pow(m.b11016_moe015,2))"
                },
                {
                    "FieldName": "7+ Persons",
                    "Formula": "c.b11016008+c.b11016016",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b11016_moe008,2)+Math.pow(m.b11016_moe016,2))"
                }            
            ]
        },{
            "ActualTable": "b25058",
            "ChartTable": "b25056",
            "ChartAlias": "Contract Rent",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Rent < $400/mo",
                    "Formula": "c.b25056003+c.b25056004+c.b25056005+c.b25056006+c.b25056007+c.b25056008+c.b25056009",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25056_moe003,2)+Math.pow(m.b25056_moe004,2)+Math.pow(m.b25056_moe005,2)+Math.pow(m.b25056_moe006,2)+Math.pow(m.b25056_moe007,2)+Math.pow(m.b25056_moe008,2)+Math.pow(m.b25056_moe009,2))"
                },              
                {
                    "FieldName": "$400 to $599",
                    "Formula": "c.b25056010+c.b25056011+c.b25056012+c.b25056013",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25056_moe010,2)+Math.pow(m.b25056_moe011,2)+Math.pow(m.b25056_moe012,2)+Math.pow(m.b25056_moe013,2))"
                },
                {
                    "FieldName": "$600 to $799",
                    "Formula": "c.b25056014+c.b25056015+c.b25056016+c.b25056017",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25056_moe014,2)+Math.pow(m.b25056_moe015,2)+Math.pow(m.b25056_moe016,2)+Math.pow(m.b25056_moe017,2))"
                },
                {
                    "FieldName": "$800 to $999",
                    "Formula": "c.b25056018+c.b25056019",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b25056_moe018,2)+Math.pow(m.b25056_moe019,2))"
                },
                {
                    "FieldName": "$1,000 to $1,249",
                    "Formula": "c.b25056020",
                    "MoeFormula": "m.b2505_moe020"
                },
                {
                    "FieldName": "$1,250 to $1,499",
                    "Formula": "c.b25056021",
                    "MoeFormula": "m.b25056_moe021"
                },
                {
                    "FieldName": "$1,500 to $1,999",
                    "Formula": "c.b25056022",
                    "MoeFormula": "m.b25056_moe022"
                },
                {
                    "FieldName": "$2,000 +",
                    "Formula": "c.b25056023",
                    "MoeFormula": "m.b25056_moe023"
                },
                {
                    "FieldName": "No Cash Rent",
                    "Formula": "c.b25056024",
                    "MoeFormula": "m.b25056_moe024"
                }        
            ]
        },{
            "ActualTable": "b19113",
            "ChartTable": "b19101",
            "ChartAlias": "Family Income",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Less than $20k",
                    "Formula": "c.b19101002+c.b19101003+c.b19101004",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19101_moe002,2)+Math.pow(m.b19101_moe003,2)+Math.pow(m.b19101_moe004,2))"
                },
                {
                    "FieldName": "$20k to $30k",
                    "Formula": "c.b19101005+c.b19101006",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19101_moe005,2)+Math.pow(m.b19101_moe006,2))"
                },
                {
                    "FieldName": "$30k to $40k",
                    "Formula": "c.b19101007+c.b19101008",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19101_moe007,2)+Math.pow(m.b19101_moe008,2))"
                },
                {
                    "FieldName": "$40k to $50k",
                    "Formula": "c.b19101009+c.b19101010",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b19101_moe009,2)+Math.pow(m.b19101_moe010,2))"
                },
                {
                    "FieldName": "$50k to $60k",
                    "Formula": "c.b19101011",
                    "MoeFormula": "m.b19101_moe011"
                },
                {
                    "FieldName": "$60k to $75k",
                    "Formula": "c.b19101012",
                    "MoeFormula": "m.b19101_moe012"
                },
                {
                    "FieldName": "$75k to $100k",
                    "Formula": "c.b19101013",
                    "MoeFormula": "m.b19101_moe013"
                },
                {
                    "FieldName": "$100k to $125k",
                    "Formula": "c.b19101014",
                    "MoeFormula": "m.b19101_moe014"
                },
                {
                    "FieldName": "$125k to $150k",
                    "Formula": "c.b19101015",
                    "MoeFormula": "m.b19101_moe015"
                },
                {
                    "FieldName": "$150k to $200k",
                    "Formula": "c.b19101016",
                    "MoeFormula": "m.b19101_moe016"
                },
                {
                    "FieldName": "$200k +",
                    "Formula": "c.b19101017",
                    "MoeFormula": "m.b19101_moe017"
                }
            ]
        },{
            "ActualTable": "b19301",
            "ChartTable": "b19049",
            "ChartAlias": "Median Household Income by Age of Householder",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Median Income - All",
                    "Formula": "c.b19049001",
                    "MoeFormula": "m.b19049_moe001"
                },
                {
                    "FieldName": "Under 25",
                    "Formula": "c.b19049002",
                    "MoeFormula": "m.b19049_moe002"
                },
                {
                    "FieldName": "25 to 44",
                    "Formula": "c.b19049003",
                    "MoeFormula": "m.b19049_moe003"
                },
                {
                    "FieldName": "45 to 64",
                    "Formula": "c.b19049004",
                    "MoeFormula": "m.b19049_moe004"
                },
                {
                    "FieldName": "65 +",
                    "Formula": "c.b19049005",
                    "MoeFormula": "m.b19049_moe005"
                }
            ]
        },{
            "ActualTable": "b27001",
            "ChartTable": "b27001",
            "ChartAlias": "Insurance Coverage by Age",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Under 25: Insured",
                    "Formula": "c.b27001004+c.b27001007+c.b27001010+c.b27001032+c.b27001035+c.b27001038",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe004,2)+Math.pow(m.b27001_moe007,2)+Math.pow(m.b27001_moe010,2)+Math.pow(m.b27001_moe032,2)+Math.pow(m.b27001_moe035,2)+Math.pow(m.b27001_moe038,2))"
                },
                {
                    "FieldName": "Under 25: Uninsured",
                    "Formula": "c.b27001005+c.b27001008+c.b27001011+c.b27001033+c.b27001036+c.b27001039",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe005,2)+Math.pow(m.b27001_moe008,2)+Math.pow(m.b27001_moe011,2)+Math.pow(m.b27001_moe033,2)+Math.pow(m.b27001_moe036,2)+Math.pow(m.b27001_moe039,2))"
                },
                {
                    "FieldName": "25 to 44: Insured",
                    "Formula": "c.b27001013+c.b27001016+c.b27001041+c.b27001044",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe013,2)+Math.pow(m.b27001_moe016,2)+Math.pow(m.b27001_moe041,2)+Math.pow(m.b27001_moe044,2))"
                },
                {
                    "FieldName": "25 to 44: Uninsured",
                    "Formula": "c.b27001014+c.b27001017+c.b27001042+c.b27001045",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe014,2)+Math.pow(m.b27001_moe017,2)+Math.pow(m.b27001_moe042,2)+Math.pow(m.b27001_moe045,2))"
                },
                {
                    "FieldName": "45 to 64: Insured",
                    "Formula": "c.b27001019+c.b27001022+c.b27001047+c.b27001050",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe019,2)+Math.pow(m.b27001_moe022,2)+Math.pow(m.b27001_moe047,2)+Math.pow(m.b27001_moe050,2))"
                },
                {
                    "FieldName": "45 to 64: Uninsured",
                    "Formula": "c.b27001020+c.b27001023+c.b27001048+c.b27001051",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe020,2)+Math.pow(m.b27001_moe023,2)+Math.pow(m.b27001_moe048,2)+Math.pow(m.b27001_moe051,2))"
                },
                {
                    "FieldName": "65 + : Insured",
                    "Formula": "c.b27001025+c.b27001028+c.b27001053+c.b27001056",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe025,2)+Math.pow(m.b27001_moe028,2)+Math.pow(m.b27001_moe053,2)+Math.pow(m.b27001_moe056,2))"
                },
                {
                    "FieldName": "65 + : Uninsured",
                    "Formula": "c.b27001026+c.b27001029+c.b27001054+c.b27001057",
                    "MoeFormula": "Math.sqrt(Math.pow(m.b27001_moe026,2)+Math.pow(m.b27001_moe029,2)+Math.pow(m.b27001_moe054,2)+Math.pow(m.b27001_moe057,2))"
                }
            ]
        },{
            "ActualTable": "b07003",
            "ChartTable": "b07003",
            "ChartAlias": "Migration in the Last Year",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Did Not Move",
                    "Formula": "c.b07003004",
                    "MoeFormula": "m.b07003_moe004"
                },
                {
                    "FieldName": "Moved Within County",
                    "Formula": "c.b07003007",
                    "MoeFormula": "m.b07003_moe007"
                },
                {
                    "FieldName": "Moved Within State",
                    "Formula": "c.b07003010",
                    "MoeFormula": "m.b07003_moe010"
                },
                {
                    "FieldName": "Moved from Different State",
                    "Formula": "c.b07003013",
                    "MoeFormula": "m.b07003_moe013"
                },
                {
                    "FieldName": "Moved from Abroad",
                    "Formula": "c.b07003016",
                    "MoeFormula": "m.b07003_moe016"
                }
            ]
        },{
            "ActualTable": "c17002",
            "ChartTable": "c17002",
            "ChartAlias": "Persons by Poverty Level",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Below 50%",
                    "Formula": "c.c17002002",
                    "MoeFormula": "m.c17002_moe002"
                },
                {
                    "FieldName": "50% to 100%",
                    "Formula": "c.c17002003",
                    "MoeFormula": "m.c17002_moe003"
                },
                {
                    "FieldName": "100% to 150%",
                    "Formula": "c.c17002004+c.c17002005",
                    "MoeFormula": "Math.sqrt(Math.pow(m.c17002_moe004,2)+Math.pow(m.c17002_moe005,2))"
                },
                {
                    "FieldName": "150% to 200%",
                    "Formula": "c.c17002006+c.c17002007",
                    "MoeFormula": "Math.sqrt(Math.pow(m.c17002_moe006,2)+Math.pow(m.c17002_moe007,2))"
                },
                {
                    "FieldName": "> 200%",
                    "Formula": "c.c17002008",
                    "MoeFormula": "m.c17002_moe008"
                }
            ]
        },{
            "ActualTable": "b03002",
            "ChartTable": "b03002",
            "ChartAlias": "Race / Ethnicity",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Hispanic or Latino",
                    "Formula": "c.b03002012",
                    "MoeFormula": "m.b03002_moe012"
                },
                {
                    "FieldName": "White",
                    "Formula": "c.b03002003",
                    "MoeFormula": "m.b03002_moe003"
                },
                {
                    "FieldName": "Black or African American",
                    "Formula": "c.b03002004",
                    "MoeFormula": "m.b03002_moe004"
                },
                {
                    "FieldName": "American Indian or Alaska Native",
                    "Formula": "c.b03002005",
                    "MoeFormula": "m.b03002_moe005"
                },
                {
                    "FieldName": "Asian",
                    "Formula": "c.b03002006",
                    "MoeFormula": "m.b03002_moe006"
                },
                {
                    "FieldName": "Native Hawaiian or Other Pacific Islander",
                    "Formula": "c.b03002007",
                    "MoeFormula": "m.b03002_moe007"
                },
                {
                    "FieldName": "Other Race",
                    "Formula": "c.b03002008",
                    "MoeFormula": "m.b03002_moe008"
                },
                {
                    "FieldName": "Two or More Races",
                    "Formula": "c.b03002009",
                    "MoeFormula": "m.b03002_moe009"
                }
            ]
        },{
            "ActualTable": "b08006",
            "ChartTable": "b08006",
            "ChartAlias": "Transportation to Work",
            "ChartType": "barchart",          
            "Data": [
                {
                    "FieldName": "Car, Truck, or Van",
                    "Formula": "c.b08006002",
                    "MoeFormula": "m.b08006_moe002"
                },
                {
                    "FieldName": "Public Transportation",
                    "Formula": "c.b08006008",
                    "MoeFormula": "m.b08006_moe008"
                },
                {
                    "FieldName": "Bicycle",
                    "Formula": "c.b08006014",
                    "MoeFormula": "m.b08006_moe014"
                },
                {
                    "FieldName": "Walked",
                    "Formula": "c.b08006015",
                    "MoeFormula": "m.b08006_moe015"
                },
                {
                    "FieldName": "Other Transportation",
                    "Formula": "c.b08006016",
                    "MoeFormula": "m.b08006_moe016"
                },
                {
                    "FieldName": "Worked at home",
                    "Formula": "c.b08006017",
                    "MoeFormula": "m.b08006_moe017"
                }
            ]
        }
      
      
      
      
      
      
     
    
    ]
}
