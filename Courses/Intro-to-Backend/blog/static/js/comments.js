var api_url = "http://localhost:11080/api";

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
            data = $('#comments-form').serializeArray();
            data.push({"user_id" : user_id, "post_id" :post_id});
            console.log($('#comments-form').serialize());
            $.ajax({
                type: 'POST',
                url: api_url + "/posts/" + "comments",
                data: data,
                success: function(data) {
                    // dinamically delete post from table
                    console.log(data)
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.status + " " + textStatus);
                }
            });
        });
    });
});