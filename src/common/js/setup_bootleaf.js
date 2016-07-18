module.exports = function() {

    //bootleaf navbar controls
    $("#about-btn").click(function() {
        $("#aboutModal").modal("show");
        $(".navbar-collapse.in").collapse("hide");
        return false;
    });

    $("#dataset-btn").click(function() {
        $("#datasetModal").modal("show");
        $(".navbar-collapse.in").collapse("hide");
        return false;
    });

    $("#advanced-btn").click(function() {
        $("#symbologyModal").modal("show");
        $(".navbar-collapse.in").collapse("hide");
        return false;
    });
    $("#nav-btn").click(function() {
        $(".navbar-collapse").collapse("toggle");
        return false;
    });

}