var config = {
    apiKey: "AIzaSyDMqNQ9pA7C5sKkMHm8U6BAdExqtprHAwE",
    authDomain: "mycity-188015.firebaseapp.com",
    databaseURL: "https://mycity-188015.firebaseio.com",
    projectId: "mycity-188015",
    storageBucket: "mycity-188015.appspot.com",
    messagingSenderId: "986949142496"
};

firebase.initializeApp(config);
var database = firebase.database();

var map;
var uluru;
var marker;
var infowindow;
var service;


function initMap() {
    uluru = {lat: 41.505493, lng: -81.681290};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    //Commented out initial marker
    //var marker = new google.maps.Marker({
      //  position: uluru,
      //  map: map
    //});
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
	google.maps.event.addListener(marker, 'click', function() {
		console.log(place);
		//not sure how to add an ID to the Save button, the portion that is commented out does not work
		//button = $('<button>');
		//button.text('Save')
		//button.attr('id', 'save');
		infowindow.setContent('<div><strong>' + place.name + '</strong><br />' + place.vicinity + '<br />' + '<button>' + 'Save' + '</button>' + '</div>');
		//infowindow.append(button);
		infowindow.open(map, this);
	});
}

function clearResults() {
	
}


$('#restaurants').on('click', function() {
	//if you initMap again, it clears all other searches but don't think this looks as nice as it could??
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['restaurant']
	}, callback);
});

$('#bars').on('click', function() {
	//this doesn't work either:
	//marker.remove();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['bar']
	}, callback);
});

$('#entertainment').on('click', function() {
	//searching movie_theather comes up with a lot of hotels, which is kinda weird?
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['casino']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['bowling_alley']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['stadium']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['amusement_park']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['aquarium']
	}, callback);
});

$('#museums').on('click', function() {
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['museum']
	}, callback);
});

$('#shopping').on('click', function() {
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['shopping_mall']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['clothing_store']
	}, callback);
});

//This would save info to firebase but can't get the #save id to appear on the button?? Something is missing here....
$('#save').on('click', function() {
	var newName = place.name;
	var newId = place.id;
	console.log(newName);
	console.log(newId);
	var newPlace = {
		name: newName,
		id: newId
	}
	database.ref().push(newPlace)
})