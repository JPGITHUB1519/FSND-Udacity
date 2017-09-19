// forces
// replace all force
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var default_cant = 0;

var config = {
	"images_dir": "assets/images/"
}

var cats = {
	"1": {
		"cat_name": "Xuxa",
		'cat_image': "xuxa_cat.jpg",
		"cat_click_count": 0
	},
	"2": {
		"cat_name": "Chewie",
		'cat_image': "chewie_cat.jpg",
		"cat_click_count": 0
	}
}

// html template for the list item
var cat_list_html = `
	<a href="#" class="list-group-item cat-link" id="cat_{{cat_id}}_link" data-cat_id={{cat_id}}>{{cat_name}}</a>
`;

// html template for the info container
var cat_html = `
	<h2 class="text-center">{{cat_name}}</h2>
	<img src="{{cat_image}}" class="img-responsive img-circle center-block">
	<h2 id="clicker_count_{{cat_id}}" class="text-center">Clicks: <strong>{{cat_click_count}}</strong></h2>
	<button class="clicker_button btn btn-primary center-block" id="cat_{{cat_id}}_button" data-cat_id={{cat_id}}>Vote for {{cat_name}}</button>
`

/// this will be generated
var cats_list_html = "";

$(document).ready(function() {
	// generate list cats html from datastructure
	for (var cat_id in cats) {
		var cat_list_html_aux = cat_list_html;
		for (cat_attr in cats[cat_id]) {
			cat_list_html_aux = cat_list_html_aux.replaceAll("{{cat_name}}", cats[cat_id]["cat_name"]);
			cat_list_html_aux = cat_list_html_aux.replaceAll("{{cat_id}}", cat_id);
		}
		cats_list_html += cat_list_html_aux;
	}

	// when click on a cat link show the cat info on the pane
	$("#cats-list").on('click', '.cat-link', function(e) {
		var cat_id = $(this).data("cat_id");
		var cat_html_aux = cat_html;
		cat_html_aux = cat_html_aux.replaceAll("{{cat_id}}", cat_id);
		cat_html_aux = cat_html_aux.replaceAll("{{cat_name}}", cats[cat_id]["cat_name"]);
		cat_html_aux = cat_html_aux.replaceAll("{{cat_image}}", config["images_dir"] + cats[cat_id]["cat_image"]);
		cat_html_aux = cat_html_aux.replaceAll("{{cat_click_count}}", cats[cat_id]["cat_click_count"]);
		$("#cat-info").html(cat_html_aux);
	});

	$("#cats-list").append(cats_list_html);

	// Vote on click button and update cont info
	$("#cat-info").on('click', '.clicker_button', function(e) {
		var cat_id = $(this).data("cat_id");
		cats[cat_id]["cat_click_count"] = cats[cat_id]["cat_click_count"] + 1;
		// update count view
		$("#clicker_count_" + cat_id).text("Clicks: " + cats[cat_id]["cat_click_count"]);
		console.log(cats[cat_id]["cat_click_count"]);
	});
});
