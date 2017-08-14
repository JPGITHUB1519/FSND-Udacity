$(document).ready(function() {
    $("#like-button").click(function(e) {
        e.preventDefault();
        $("#like-form").submit();
    });
});