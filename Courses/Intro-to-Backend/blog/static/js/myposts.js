var api_url = "http://localhost:11080/api";

$(document).ready(function() {
    var post_id;
    // update link modal caller
    // this sintax to support attach events to many links
    $(document).on("click", '.post-update-link', function(e) {
        // open modal
        $("#edit-modal").modal();
        post_id = $(this).data("post_id");
        $("#update_modal_idpost").text(post_id);

        // ajax call to get the data of the post
        $.getJSON(api_url + "/posts/" + post_id, function(data) {
            // updating values on modal form
            $("#subject").val(data["subject"]);
            $("#content").val(data["content"]);
        });
    });

    $("#update-form-button").click(function() {
        // Submit Update Form Whitout Reload Page
        var url = api_url + "/posts/" + post_id;
        $("#update-post-form").submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: url,
                data: $('#update-post-form').serialize(),
                success: function() {
                    // update table values
                    console.log($("#post-subject" + post_id).text());
                    $("#post-subject-" + post_id).text($("#subject").val());
                    $("#post-content-" + post_id).text($("#content").val());
                    $("#edit-modal").modal("hide");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.status);
                }
            });
        });
    });

    // delete link
    $(document).on("click", '.post-delete-link', function(e) {
        e.preventDefault();
        var post_id = $(this).data("post_id");
        bootbox.confirm({
            message: "Are you sure you want delete the post #" + post_id,
            buttons : {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            // check this please
            callback: function(result) {
                url = api_url + "/posts/" + post_id;
                if (result) {
                    $("#delete-post-form").submit();
                }
            }
        });
    });

    // it triggers when submit anchor tag, we must separate the submition from the trigger link
    $("#delete-post-form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url,
            data: $('#delete-post-form').serialize(),
            success: function(data) {
                // dinamically delete post from table
                $("#post-row-" + data["data"]).remove();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.status + " " + textStatus);
            }
        });
    });
});