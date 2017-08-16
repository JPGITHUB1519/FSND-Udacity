var api_url = "http://localhost:11080/api";

// replace all helper function
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function getUserId() {
    var cookie = getCookie("user_id");
    var user_id = cookie.split('|')[0];
    return user_id;
}
console.log(getUserId());

$(document).ready(function() {
    $("#comments-form-submit").click(function(e) {
        $("#comments-form").submit(function(e) {
            e.preventDefault();
            user_id = getUserId();
            post_id = $("#post_id").val();
            // data to send to the api
            data = $('#comments-form').serialize();
            data = data + "&user_id=" + user_id;
            console.log(data);
            $.ajax({
                type: 'POST',
                url: api_url + "/posts/" + "comments",
                data: data,
                success: function(data) {
                    // dinamically delete post from table
                    console.log(data);
                    comment_string_html = '<div class="media"> <div class="media-body"> <h4 class="media-heading"> <%username%> <small> <%date%> </small> </h4> <%content%> </div> <div class="row"> <div class="col-xs-12 comment-action-panel"> <a href="/blog/updatecomment/<%comment_id%>" class="btn btn-success">Editar</a> <form id="delete-comment-form" method="post" action="/blog/deletecomment/<%comment_id%>" class="display-inline"> <a href="#" class="btn btn-danger comment-deleter">Eliminar</a> </form> </div> </div> </div>'
                    comment_string_html = comment_string_html.replace("<%username%>", data.username);
                    comment_string_html = comment_string_html.replace("<%date%>", data.date);
                    comment_string_html = comment_string_html.replace("<%content%>", data.content);
                    comment_string_html = comment_string_html.replaceAll("<%comment_id%>", data.id);
                    $("#comments").prepend(comment_string_html);
                    $("#comment-input").val("");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.status + " " + textStatus);
                }
            });
        });
    });

    $(document).on("click", '.comment-deleter', function(e) {
        e.preventDefault();
        $("#delete-comment-form").submit();
    });
});