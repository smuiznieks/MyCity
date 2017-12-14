var config = {
    apiKey: 'AIzaSyDMqNQ9pA7C5sKkMHm8U6BAdExqtprHAwE',
    authDomain: 'mycity-188015.firebaseapp.com',
    databaseURL: 'https://mycity-188015.firebaseio.com',
    projectId: 'mycity-188015',
    storageBucket: 'mycity-188015.appspot.com',
    messagingSenderId: '986949142496'
};

firebase.initializeApp(config);

var database = firebase.database();

var map;
var uluru;
var marker;
var infowindow;
var service;


// Initiates Google map
function initMap() {
    uluru = {lat: 41.505493, lng: -81.681290};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
};

// Pulls Google Maps results, and loops through results for a given category
// Runs createMarker function and passes in Google Maps results
function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
};
// Creates a new marker and display it on the map

function createMarker(place) {
	var placeLoc = place.geometry.location;
	marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
	google.maps.event.addListener(marker, 'click', function() {
		console.log(place);
        if (place.vicinity) {
            infowindow.setContent('<div class="infoWindow"><h4>' + place.name + '</h4><p>' + place.vicinity + '</p><p>' + 'Rating: ' + place.rating + '</p>' + '<button id="save">' + 'Save' + '</button>' + '</div>');
        }
        if (place.formatted_address) {
            infowindow.setContent('<div class="infoWindow"><h4>' + place.name + '</h4><p>' + place.formatted_address + '</p><p>' + 'Rating: ' + place.rating + '</p>' + '<button id="save">' + 'Save' + '</button>' + '</div>');
        }
		infowindow.open(map, this);
		$('#save').on('click', function() {
			var newName = place.name;
			var newId = place.place_id;
			console.log(newName);
			console.log(newId);
			var savePlace = {
    			name: newName,
    			id: newId,
    			user: uid,
    			recent: false,
            };
            database.ref().push(savePlace);
		});
	});
};

// CATEGORY BUTTONS
// ----------------------------- //
// Restaurant Search Button
$('#restaurants').on('click', function() {
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['restaurant']
	}, callback);
});

// Bars Search Button
$('#bars').on('click', function() {
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['bar']
	}, callback);
});

// Entertainment Search Button
$('#entertainment').on('click', function() {
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['casino']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['bowling_alley']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['stadium']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['amusement_park']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['aquarium']
	}, callback);
});

// Museum Search Button
$('#museums').on('click', function() {
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['museum']
	}, callback);
});

// Shopping Search Button
$('#shopping').on('click', function() {
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['shopping_mall']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 10000,
		type: ['clothing_store']
	}, callback);
});

$('#searchButton').on('click', function() {
    var searchLocation = $("#searchInput").val().trim();
    infowindow = new google.maps.InfoWindow();
    initMap();
    var request = {
        location: uluru,
        radius: 10000,
        query: searchLocation
    }
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
});

// Code to sign in with Google profile via Firebase
var user;
var uid;

function toggleSignIn() {
	if (!firebase.auth().currentUser) {
    	var provider = new firebase.auth.GoogleAuthProvider();
    	firebase.auth().signInWithPopup(provider).then(function(result) {
    		var token = result.credential.accessToken;
      		user = result.user;
      	}).catch(function(error) {
      		var errorCode = error.code;
      		var errorMessage = error.message;
      		var email = error.email;
      		var credential = error.credential;
      		if (errorCode === 'auth/account-exists-with-different-credential') {
        		console.log('User already signed up with a different auth provider for that email.');
      		} else {
        		console.error(error);
      		}
    	});
  	} else {
    	firebase.auth().signOut();
  	}
  	document.getElementById('quickstart-sign-in').disabled = true;
};

function initApp() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
      		// User is signed in.
      		console.log(user);
      		uid = user.uid;
      		document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      	} else {
      		document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
      	}
      	document.getElementById('quickstart-sign-in').disabled = false;
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
};

window.onload = function() {
    initApp();
};

firebase.auth().onIdTokenChanged(function(user) {
	if (user) {
    	// User is signed in or token was refreshed.
    	console.log('User signed in.')
  	} else {
  		console.log('No user signed in.');
  	}
});
