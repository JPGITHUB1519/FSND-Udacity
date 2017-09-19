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

var cat_html = `
	<div class="cat">
		<h1>{{cat_name}}</h1>
		<img src="{{cat_image}}">
		<h2 id="clicker_count_{{cat_id}}">{{cat_click_count}}</h2>
		<button class="clicker_button" id="cat_{{cat_id}}_button" data-cat_id={{cat_id}}>Vote for {{cat_name}}</button>
	</div>
`;

// this will be generated
var cats_html = "";
// console.log(cat_html.replace("{{cat_name}}", cats["1"]["cat_name"]));


$(document).ready(function() {
	// generate cats html from datastructure
	for (var cat_id in cats) {
		var cat_html_aux = cat_html;
		for (cat_attr in cats[cat_id]) {
			if (cat_attr == "cat_image") {
				cat_html_aux = cat_html_aux.replaceAll("{{" + cat_attr + "}}", config["images_dir"] + cats[cat_id][cat_attr]);	
			} else {
				cat_html_aux = cat_html_aux.replaceAll("{{" + cat_attr + "}}", cats[cat_id][cat_attr]);
			}
			
			cat_html_aux = cat_html_aux.replaceAll("{{cat_id}}", cat_id);
		}
		cats_html += cat_html_aux;
	}

	$("#cats-container").append(cats_html);

	$("#cats-container").on('click', '.clicker_button', function(e) {
		var cat_id = $(this).data("cat_id");
		cats[cat_id]["cat_click_count"] = cats[cat_id]["cat_click_count"] + 1;
		// update count view
		$("#clicker_count_" + cat_id).text(cats[cat_id]["cat_click_count"]);
		console.log(cats[cat_id]["cat_click_count"]);
	});
});
