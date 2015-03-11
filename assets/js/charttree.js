
//not complete at all

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
        }
    
    
    ]
}