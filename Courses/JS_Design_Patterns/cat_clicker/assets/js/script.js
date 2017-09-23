String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var config = {
	"images_dir": "assets/images/"
}


$(function() {
	var model = {
		currentCat: null,
		cats: []
	};

	var octopus = {

		addNewCat: function(cat_obj) {
			model.add(cat_obj);
		},

		fillModelWithDummyData: function() {
			var cats_initial_data = [
				{
					"cat_id": 1,
					"cat_name": "Xuxa",
					'cat_image': "xuxa_cat.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 2,
					"cat_name": "Chewie",
					'cat_image': "chewie_cat.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 3,
					"cat_name": "Jetske",
					'cat_image': "jetske.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 4,
					"cat_name": "Larry",
					'cat_image': "larry.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 5,
					"cat_name": "Miso",
					'cat_image': "miso.jpg",
					"cat_click_count": 0
				}
			];

			model.cats = cats_initial_data;

		},

		getCurrentCat: function() {
			return model.current_cat;
		},

		setCurrentCat: function(cat_obj) {
			model.current_cat = cat_obj;
		},

		getCatById: function(cat_id) {
			/**
             * get a car obj by its cat_id
             * return Cat
             */
			return model.cats.filter(function(cat_obj) {
				return cat_obj.cat_id == cat_id;
			})[0];
		},

		getFirstCat: function() {
			return model.cats[0];
		},

		voteCat: function(cat_id) {
			/**
             * Vote for a cat and update the view
             * 
             */
			model.cats.filter(function(cat_obj) {
				if(cat_obj.cat_id == cat_id) {
					cat_obj.cat_click_count += 1;
				}
			});
			view_cat_profile.render();
		},

		updateCatProfile: function(cat_id) {
			/**
             * Show the cat info of the clicked cat on the list
             * 
             */
			var cat_obj = this.getCatById(cat_id);
			octopus.setCurrentCat(cat_obj);
			view_cat_profile.render();
		},	

		init: function() {
			this.fillModelWithDummyData();
			this.setCurrentCat(model.cats[0]);
			view_cats_list.init();
			view_cat_profile.init();
		}
	}

	var view_cats_list = {
		init: function() {
			// saving the view elements on the view to performance 
			this.catsList = $("#cats-list");
			this.cat_list_template = $('script[data-template="cat-list"]').html();

			// binding click methods to show car profile
			$("#cats-list").on('click', '.cat-link', function(e) {
				var cat_id = $(this).data("cat_id");
				octopus.updateCatProfile(cat_id);
			});

			this.render();
		},

		render: function() {
			/* Render list of cats */
			model.cats.forEach(function(cat_obj, index) {
				var this_template = this.cat_list_template.replaceAll("{{cat_name}}", cat_obj.cat_name);
				this_template = this_template.replaceAll("{{cat_id}}", cat_obj.cat_id);
				this.catsList.append(this_template);
			}.bind(this));
		}
	}

	var view_cat_profile = {
		init: function() {
			this.cat_info = $("#cat-info");
			this.cat_info_template = $('script[data-template="cat-info"]').html();
			this.render();

			// Vote on click button and update cont info
			$("#cat-info").on('click', '.clicker_button', function(e) {
				var cat_id = $(this).data("cat_id");
				octopus.voteCat(cat_id);
			});

		},

		render: function() {
			var current_cat = octopus.getCurrentCat();
			var this_template = this.cat_info_template.replaceAll("{{cat_id}}", current_cat.cat_id);
			this_template = this_template = this_template.replaceAll("{{cat_name}}", current_cat.cat_name);
			this_template = this_template.replaceAll("{{cat_image}}", config["images_dir"] + current_cat.cat_image);
			this_template = this_template.replaceAll("{{cat_click_count}}", current_cat.cat_click_count);
			this.cat_info.html(this_template);
		}
	}

	octopus.init();
});
