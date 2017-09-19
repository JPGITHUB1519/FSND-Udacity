var default_cant = 0;

$(document).ready(function() {
	var clicker_cant_elem  = $("#clicker-cant");
	var cat_clicker_button = $("#cat-clicker");

	clicker_cant_elem.text(default_cant);

	// increase cont on click
	cat_clicker_button.click(function(e) {
		var actual_clicker_value = parseInt(clicker_cant_elem.text());
		clicker_cant_elem.text(actual_clicker_value + 1);
	});
});