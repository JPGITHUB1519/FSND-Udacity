alert("HOLA");

$( document ).ready(function() {
    $(document).on("click", '.updater', function(e) {
        // open modal
        $("#edit-modal").modal();
        var post_id = $(this).attr("id");
        console.log("post id");
    });
});
