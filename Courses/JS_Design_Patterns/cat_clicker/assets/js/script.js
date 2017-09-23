String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(function() {
	var model = {
		currentCat: null,
		cats: [],
		isAdmin: false
	};

	var octopus = {
		/* Model Changing data methods */
		addNewCat: function(cat_obj) {
			model.add(cat_obj);
		},

		updadeCatInfo: function(cat_obj) {
			model.currentCat.cat_name = cat_obj.cat_name;
			model.currentCat.cat_image = cat_obj.cat_image;
			model.currentCat.cat_click_count = cat_obj.cat_click_count;
			viewCatList.render();
			viewCatProfile.render();
			viewCatAdmin.render();
		},

		fillModelWithDummyData: function() {
			var cats_initial_data = [
				{
					"cat_id": 1,
					"cat_name": "Xuxa",
					'cat_image': "assets/images/xuxa_cat.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 2,
					"cat_name": "Chewie",
					'cat_image': "assets/images/chewie_cat.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 3,
					"cat_name": "Jetske",
					'cat_image': "assets/images/jetske.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 4,
					"cat_name": "Larry",
					'cat_image': "assets/images/larry.jpg",
					"cat_click_count": 0
				},
				{
					"cat_id": 5,
					"cat_name": "Miso",
					'cat_image': "assets/images/miso.jpg",
					"cat_click_count": 0
				}
			];

			model.cats = cats_initial_data;

		},

		getCurrentCat: function() {
			return model.currentCat;
		},

		setCurrentCat: function(cat_obj) {
			model.currentCat = cat_obj;
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

		/* View Methods */

		voteCat: function() {
			/**
			 * Vote for a cat and update the view
			 * 
			 */
			 model.currentCat["cat_click_count"] = parseInt(model.currentCat["cat_click_count"]) + 1;
			 viewCatProfile.render();
		},

		updateCatProfile: function(cat_id) {
			/**
             * Show the cat info of the clicked cat on the list
             * 
             */
			var cat_obj = this.getCatById(cat_id);
			octopus.setCurrentCat(cat_obj);
			viewCatProfile.render();
			viewCatAdmin.render();
		},	

		setAdminFalse: function() {
			model.isAdmin = false;
		},

		activeAdmin: function() {
			model.isAdmin = true;
			viewCatAdmin.render();
			viewCatAdmin.adminForm.show()
		},

		disableAdmin: function() {
			model.isAdmin = false;
			viewCatAdmin.render();
			viewCatAdmin.adminForm.hide();
		},

		init: function() {
			this.fillModelWithDummyData();
			this.setCurrentCat(model.cats[0]);
			viewCatList.init();
			viewCatProfile.init();
			viewCatAdmin.init();
		}
	}

	var viewCatList = {
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
			this.catsList.html("");
			model.cats.forEach(function(cat_obj, index) {
				var this_template = this.cat_list_template.replaceAll("{{cat_name}}", cat_obj.cat_name);
				this_template = this_template.replaceAll("{{cat_id}}", cat_obj.cat_id);
				this.catsList.append(this_template);
			}.bind(this));
		}
	}

	var viewCatProfile = {
		init: function() {
			this.cat_info = $("#cat-info");
			this.cat_info_template = $('script[data-template="cat-info"]').html();
			this.render();

			// Vote on click button and update cont info
			$("#cat-info").on('click', '.clicker_button', function(e) {
				octopus.voteCat();
			});

		},

		render: function() {
			var currentCat = octopus.getCurrentCat();
			var this_template = this.cat_info_template.replaceAll("{{cat_id}}", currentCat.cat_id);
			this_template = this_template = this_template.replaceAll("{{cat_name}}", currentCat.cat_name);
			this_template = this_template.replaceAll("{{cat_image}}", currentCat.cat_image);
			this_template = this_template.replaceAll("{{cat_click_count}}", currentCat.cat_click_count);
			this.cat_info.html(this_template);
		}
	}

	var viewCatAdmin = {
		init: function() {
			this.adminForm = $("#admin-form");
			this.adminSaveButton = $("#admin-save-button");
			this.adminCancelButton = $("#admin-cancel-button");
			this.adminTriggerButton = $("#admin-trigger-button");
			this.catNameInput = $("#cat-name-input");
			this.catImageInput = $("#cat-image-input");
			this.catVotesInput = $("#cat-votes-input");
			
			// events listeners
			this.adminTriggerButton.click(function(e) {
				octopus.activeAdmin();
			});

			this.adminSaveButton.click(function(e) {
				// prevent trigger button for get
				e.preventDefault();
				octopus.updadeCatInfo({
					cat_name: this.catNameInput.val(),
					cat_image: this.catImageInput.val(),
					cat_click_count: this.catVotesInput.val()
				});
			}.bind(this));

			this.adminCancelButton.click(function(e) {
				e.preventDefault();
				octopus.disableAdmin();
			});

			this.adminForm.hide();
		},

		render: function() {
			var currentCat = octopus.getCurrentCat();
			this.catNameInput.val(currentCat.cat_name);
			this.catImageInput.val(currentCat.cat_image)
			this.catVotesInput.val(currentCat.cat_click_count);
		}
	}

	octopus.init();
});
