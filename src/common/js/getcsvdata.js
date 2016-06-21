//table2CSV plugin - from button

module.exports = function() {

    var csv_value = $('#table').table2CSV({
        delivery: 'value'
    });

    csv_value = csv_value.replace(/±/g, "");

    $("#csv_text").val(csv_value);

}