/*
This is empty on purpose! Your code to build the resume will go here.
 */

// Json with my personal information

//bio 

var map;    // declares a global map variable

model = {
	"bio": {
		"name" : "Jean Pierre",
		"role" : "Web Developer",
		"welcomeMessage" : "Hello, I am Jean :-). I like Mathematics, Physics, Chess and of course... PROGRAMMING. My favorite Programming Languages are : Python and C++.",
	    "image" : "images/computer_science.jpg",
		"contacts" : {

			"mobile" : "8095555555",
			"email" : "juanpedro1519@gmail.com",
			"github" : "JPGITHUB1519",
			"twitter" : "@JEANPIERRE1519",
			"location" : "Santo Domingo, Distrito Nacional, República Dominicana"
		},

		"skills" : ["Respectful", "Smart", "Pro-active"]

	},

	"education": {
		"schools": [
			{
				"name": "PBP",
				"location": "Santo Domingo, Distrito Nacional, República Dominicana",
				"degree": "High School",
				"majors": ["Informatics"],
				"dates": 2014,
				"url" : "http://politecnicobrauliopaulino.com"

			},

			{
				"name" : "UTESA",
				"location" : "Santo Domingo, Distrito Nacional, República Dominicana",
				"degree" : "Bachelor",
				"majors" : ["Computer Science"],
				"dates": 2014,
				"url" : "http://www.utesa.edu"

					
			}
			],

			"Online-Courses" : [
			{
				"title" : "Intro To Computer Science",
				"school" : "Udacity",
				"dates" : 2015,
				"url" : "https://www.udacity.com/course/intro-to-computer-science--cs101"
			},
			{
				"title" : "Javascript Basics",
				"school" : "Udacity",
				"dates" : 2016,
				"url" : "https://www.udacity.com/course/javascript-basics--ud804"
			}
		]
	},

	"work": {
		"Jobs" : [
			{
				"employer" : "JPSOFTWARE",
				"title" : "CEO",
				"location" : "Santo Domingo, Distrito Nacional, República Dominicana",
				"dates" : 2010,
				"description" : "GOOD JOB"

			},
			{
				"employer" : "JSOFT",
				"title" : "Web Developer",
				"location" : "Santo Domingo, Distrito Nacional, República Dominicana",
				"dates" : 2014,
				"description" : "Hard Job!"
			}
		]
	},

	"projects": {
		"projects" : [
			{
				"title" : "Search Engine",
				"dates" : 2016,
				"description" : "Educational project",
				"images" : ["images/computer_science2.jpg","images/computer_science2.jpg","images/computer_science2.jpg","images/computer_science2.jpg"]

			},
			{
				"title" : "Social Network",
				"dates" : 2016,
				"description" : "Make my own Social Newtwork",
				"images" : ["images/computer_science2.jpg","images/computer_science2.jpg","images/computer_science2.jpg","images/computer_science2.jpg"]
			}
		]
	}
}


var octupus = {
	init: function() {
		bioView.init();
		workView.init();
		projectsView.init();
		educationView.init();
		googleMapView.init();
	},

	getBio: function() {
		return model.bio;
	},

	getEducation: function() {
		return model.education;
	},

	getWork: function() {
		return model.work;
	},

	getProjects: function() {
		return model.projects;
	},
	/*
	locationFinder() returns an array of every location string from the JSONs
	written for bio, education, and work.
	*/
	locationFinder: function() {
		// initializes an empty array
		var locations = [];

		// adds the single location property from bio to the locations array
		locations.push(model.bio.contacts.location);

		// iterates through school locations and appends each location to
		// the locations array. Note that forEach is used for array iteration
		// as described in the Udacity FEND Style Guide: 
		// https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
		model.education.schools.forEach(function(school){
		  locations.push(school.location);
		});

		// iterates through work locations and appends each location to
		// the locations array. Note that forEach is used for array iteration
		// as described in the Udacity FEND Style Guide: 
		// https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
		model.work.Jobs.forEach(function(job){
		  locations.push(job.location);
		});

		return locations;
	},

	/*
	createMapMarker(placeData) reads Google Places search results to create map pins.
	placeData is the object returned from search results containing information
	about a single location.
	*/
	createMapMarker: function(placeData) {
		// The next lines save location data from the search result object to local variables
		var lat = placeData.geometry.location.lat();  // latitude from the place service
		var lon = placeData.geometry.location.lng();  // longitude from the place service
		var name = placeData.formatted_address;   // name of the place from the place service
		var bounds = window.mapBounds;            // current boundaries of the map window

		// marker is an object with additional data about the pin for a single location
		var marker = new google.maps.Marker({
		  map: map,
		  position: placeData.geometry.location,
		  title: name
		});

		// infoWindows are the little helper windows that open when you click
		// or hover over a pin on a map. They usually contain more information
		// about a location.
		var infoWindow = new google.maps.InfoWindow({
		  content: name
		});

		// hmmmm, I wonder what this is about...
		google.maps.event.addListener(marker, 'click', function() {
		    
		    infowindow.open(map, marker);
		});

		// this is where the pin actually gets added to the map.
		// bounds.extend() takes in a map location object
		bounds.extend(new google.maps.LatLng(lat, lon));
		// fit the map to the new marker
		map.fitBounds(bounds);
		// center the map
		map.setCenter(bounds.getCenter());
	},

	/*
	callback(results, status) makes sure the search returned results for a location.
	If so, it creates a new map marker for that location.
	*/
	callback: function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
		  createMapMarker(results[0]);
		}
	},

	/*
	pinPoster(locations) takes in the array of locations created by locationFinder()
	and fires off Google place searches for each location
	*/
	pinPoster: function(locations) {
		// creates a Google place search service object. PlacesService does the work of
		// actually searching for location data.
		var service = new google.maps.places.PlacesService(map);

		// Iterates through the array of locations, creates a search object for each location
		  locations.forEach(function(place){
		  // the search request object
		  var request = {
		    query: place
		  };

		  // Actually searches the Google Maps API for location data and runs the callback
		  // function with the search results after each search.
		  service.textSearch(request, this.callback);
		});
	},

	/*
	Start here! initializeMap() is called when page is loaded.
	*/
	initializeMap: function() {
		var locations;

		var mapOptions = {
			disableDefaultUI: true
		};

		/* 
		For the map to be displayed, the googleMap var must be
		appended to #mapDiv in resumeBuilder.js. 
		*/
		map = new google.maps.Map(document.querySelector('#map'), mapOptions);

		// Sets the boundaries of the map based on pin locations
		window.mapBounds = new google.maps.LatLngBounds();

		// locations is an array of location strings returned from locationFinder()
		locations = octupus.locationFinder();

		// pinPoster(locations) creates pins on the map for each location in
		// the locations array
		octupus.pinPoster(locations);
	}
}

// View for display the BIO information
var bioView = {
	init: function() {
		this.HTMLheaderName = '<h1 id="name">%data%</h1>';
		this.HTMLheaderRole = '<span>%data%</span><hr>';

		this.HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
		this.HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
		this.HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
		this.HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
		this.HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
		this.HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
		this.HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

		this.HTMLbioPic = '<img src="%data%" class="biopic">';
		this.HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

		this.HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
		this.HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';


		this.render();
	},

	render: function() {
		var bio = octupus.getBio();
		var formattedName = this.HTMLheaderName.replace("%data%",bio.name);
		var formattedRole = this.HTMLheaderRole.replace("%data%", bio.role);
		var formattedWelcomeMessage = this.HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
		var formattedImage = this.HTMLbioPic.replace("%data%", bio.image);
		

		$("#header").prepend(formattedRole);
		$("#header").prepend(formattedName);

		var formattedMobile = this.HTMLmobile.replace("%data%", bio.contacts.mobile);
		var formattedEmail = this.HTMLemail.replace("%data%", bio.contacts.email);
		var formattedGithub = this.HTMLgithub.replace("%data%", bio.contacts.github);
		var formattedLocation = this.HTMLlocation.replace("%data%", bio.contacts.location);

		$("#topContacts").append(formattedEmail);
		$("#topContacts").append(formattedMobile);
		$("#topContacts").append(formattedGithub);
		$("#topContacts").append(formattedLocation);

		$("#header").append(formattedImage);
		$("#header").append(formattedWelcomeMessage);

		$("#footerContacts").append(formattedEmail);
		$("#footerContacts").append(formattedMobile);
		$("#footerContacts").append(formattedGithub);
		$("#footerContacts").append(formattedLocation);

		// if quiz
		if(bio.skills.length > 0)
		{
			$("#header").append(this.HTMLskillsStart);

			var formattedSkill = this.HTMLskills.replace("%data%", bio.skills[0]);

			$("#skills").append(formattedSkill);

			formattedSkill = this.HTMLskills.replace("%data%", bio.skills[1]);

			$("#skills").append(formattedSkill);

			formattedSkill = this.HTMLskills.replace("%data%", bio.skills[2]);
			$("#skills").append(formattedSkill);


		}
	}
}

// View for display the worls information
var workView = {
	init: function() {
		this.HTMLworkStart = '<div class="work-entry"></div>';
		this.HTMLworkEmployer = '<a href="#">%data%';
		this.HTMLworkTitle = ' - %data%</a>';
		this.HTMLworkDates = '<div class="date-text">%data%</div>';
		this.HTMLworkLocation = '<div class="location-text">%data%</div>';
		this.HTMLworkDescription = '<p><br>%data%</p>';

		this.render();
	},

	render: function() {
		var work = octupus.getWork();

		for(cont in work.Jobs)
		{
			$("#workExperience").append(this.HTMLworkStart);
			var formattedEmployer = this.HTMLworkEmployer.replace("%data%", work.Jobs[cont].employer);
			var formattedTitle = this.HTMLworkTitle.replace("%data%", work.Jobs[cont].title);
			var formattedLocation = this.HTMLworkLocation.replace("%data%", work.Jobs[cont].location);

			var formattedEmployerTitle = formattedEmployer + formattedTitle;
			$(".work-entry:last").append(formattedEmployerTitle);

			var formattedDates = this.HTMLworkDates.replace("%data%", work.Jobs[cont].dates);
			$(".work-entry:last").append(formattedDates);

			var formattedDescription = this.HTMLworkDescription.replace("%data%", work.Jobs[cont].description);
			$(".work-entry:last").append(formattedDescription);

		}
	}
}

// View Function for display the projects information
var projectsView = {
	init: function() {
		this.HTMLprojectStart = '<div class="project-entry"></div>';
		this.HTMLprojectTitle = '<a href="#">%data%</a>';
		this.HTMLprojectDates = '<div class="date-text">%data%</div>';
		this.HTMLprojectDescription = '<p><br>%data%</p>';
		this.HTMLprojectImage = '<img src="%data%">';

		this.render();
	},

	render: function() {
		var projects = octupus.getProjects();

		for(pro in projects.projects)
		{
			$("#projects").append(this.HTMLprojectStart);

			var formattedTitle = this.HTMLprojectTitle.replace("%data%", projects.projects[pro].title);
			$(".project-entry:last").append(formattedTitle);

			var formattedDates = this.HTMLprojectDates.replace("%data%", projects.projects[pro].dates)
			$(".project-entry:last").append(formattedDates);

			var formattedDescription = this.HTMLprojectDescription.replace("%data%", projects.projects[pro].description)
			$(".project-entry:last").append(formattedDescription);

			if(projects.projects[pro].images.length > 0)
			{
				for(img in projects.projects[pro].images)
				{
					var formattedImage = this.HTMLprojectImage.replace("%data%", projects.projects[pro].images[img]);
					$(".project-entry:last").append(formattedImage);

				}
				
			}		
		}
	}
}	

var educationView = {
	init: function() {
		this.HTMLschoolStart = '<div class="education-entry"></div>';
		this.HTMLschoolName = '<a href="#">%data%';
		this.HTMLschoolDegree = ' -- %data%</a>';
		this.HTMLschoolDates = '<div class="date-text">%data%</div>';
		this.HTMLschoolLocation = '<div class="location-text">%data%</div>';
		this.HTMLschoolMajor = '<em><br>Major: %data%</em>';

		this.HTMLonlineClasses = '<h3>Online Classes</h3>';
		this.HTMLonlineTitle = '<a href="#">%data%';
		this.HTMLonlineSchool = ' - %data%</a>';
		this.HTMLonlineDates = '<div class="date-text">%data%</div>';
		this.HTMLonlineURL = '<br><a href="#">%data%</a>';

		this.render();
	},

	render: function() {
		var education = octupus.getEducation();

		for(edu in education.schools)
		{
			$("#education").append(this.HTMLschoolStart);
			var formattedSchoolName = this.HTMLschoolName.replace("%data%", education.schools[edu].name);
			var formattedSchoolLocation = this.HTMLschoolLocation.replace("%data%", education.schools[edu].location);
			var formattedSchoolDegree =  this.HTMLschoolDegree.replace("%data%", education.schools[edu].degree);
			var formattedSchoolDates = this.HTMLschoolDates.replace("%data%", education.schools[edu].dates);

			
			
			formattedSchoolMajors = this.HTMLschoolMajor.replace("%data%", "hola");

			if(education.schools[edu].majors.length > 0)
			{
				for(maj in education.schools[edu].majors)
				{
					formattedSchoolMajors = ""
					formattedSchoolMajors += this.HTMLschoolMajor.replace("%data%", education.schools[edu].majors[maj]);
					
				}
			}

			$(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree + formattedSchoolDates + formattedSchoolLocation + formattedSchoolMajors);

		}

		// online courses information
		$(".education-entry:last").append(this.HTMLonlineClasses);
		for(oc in education["Online-Courses"])
		{
			var formattedTitle = this.HTMLonlineTitle.replace("%data%",education["Online-Courses"][oc].title);
			var formattedSchool = this.HTMLonlineSchool.replace("%data%", education["Online-Courses"][oc].school);
			var formattedDates = this.HTMLonlineDates.replace("%data%", education["Online-Courses"][oc].dates);
			var formmatedUrl =  this.HTMLonlineURL.replace("%data%", education["Online-Courses"][oc].url)
			$(".education-entry:last").append(formattedTitle + formattedSchool + formattedDates + formmatedUrl);
			
		}
	}
}

var googleMapView = {
	init: function() {
		this.googleMap = '<div id="map"></div>';

		/*
		This is the fun part. Here's where we generate the custom Google Map for the website.
		See the documentation below for more details.
		https://developers.google.com/maps/documentation/javascript/reference
		*/

		/*
		Uncomment the code below when you're ready to implement a Google Map!
		*/

		// Calls the initializeMap() function when the page loads
		window.addEventListener('load', octupus.initializeMap);

		// Vanilla JS way to listen for resizing of the window
		// and adjust map bounds
		window.addEventListener('resize', function(e) {
			//Make sure the map bounds get updated on page resize
			map.fitBounds(mapBounds);
		});

		this.render();

	},

	render: function() {
		$("#mapDiv").append(this.googleMap);
	}
}

octupus.init();