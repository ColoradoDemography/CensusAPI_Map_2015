//called from index.html.  Determines whether to show or hide form controls based on whether the value of the select by attribute dropdown is equal to 'None'

module.exports = function(curval) {

    if (curval === 'none') {
        $("#advsign").prop("disabled", true);
        $("#advtext").prop("disabled", true);
    } else {
        $("#advsign").prop("disabled", false);
        $("#advtext").prop("disabled", false);
    }

}