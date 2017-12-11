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
		//not sure how to add an ID to the Save button, the portion that is commented out does not work
		// button = $('<button>');
		// button.text('Save')
		// button.attr('id', 'save');
		infowindow.setContent('<div><strong>' + place.name + '</strong><br />' + place.vicinity + '<br />' + 'Rating: ' + place.rating + '<br />' + '<button id="save">' + 'Save' + '</button>' + '</div>');
		infowindow.open(map, this);
		if (user) {
			$('#save').on('click', function() {
			var newName = place.name;
			var newId = place.place_id;
			console.log(newName);
			console.log(newId);
			var savePlace = {
	    		name: newName,
	    		id: newId,
	    		user: uid
	  		};

	  		database.ref().push(savePlace);
			});
		}
		
	});
};

// ----------------------------- //
// CATEGORY BUTTONS
// ----------------------------- //
// Restaurant Search Button
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

// Bars Search Button
$('#bars').on('click', function() {
	initMap();
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

// Entertainment Search Button
$('#entertainment').on('click', function() {
	initMap();
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

// Museum Search Button
$('#museums').on('click', function() {
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
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
		radius: 1000,
		type: ['shopping_mall']
	}, callback);
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		type: ['clothing_store']
	}, callback);
});

// function initAutocomplete() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: 41.505493, lng: -81.681290},
//           zoom: 13,
//           mapTypeId: 'roadmap'
//         });

//         // Create the search box and link it to the UI element.
//         var input = $('#searchInput');
//         var searchBox = new google.maps.places.SearchBox(input);
//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//         // Bias the SearchBox results towards current map's viewport.
//         map.addListener('bounds_changed', function() {
//           searchBox.setBounds(map.getBounds());
//         });

//         var markers = [];
//         // Listen for the event fired when the user selects a prediction and retrieve
//         // more details for that place.
//         searchBox.addListener('places_changed', function() {
//           var places = searchBox.getPlaces();

//           if (places.length == 0) {
//             return;
//           }

//           // Clear out the old markers.
//           markers.forEach(function(marker) {
//             marker.setMap(null);
//           });
//           markers = [];

//           // For each place, get the icon, name and location.
//           var bounds = new google.maps.LatLngBounds();
//           places.forEach(function(place) {
//             if (!place.geometry) {
//               console.log("Returned place contains no geometry");
//               return;
//             }
//             var icon = {
//               url: place.icon,
//               size: new google.maps.Size(71, 71),
//               origin: new google.maps.Point(0, 0),
//               anchor: new google.maps.Point(17, 34),
//               scaledSize: new google.maps.Size(25, 25)
//             };

//             // Create a marker for each place.
//             markers.push(new google.maps.Marker({
//               map: map,
//               icon: icon,
//               title: place.name,
//               position: place.geometry.location
//             }));

//             if (place.geometry.viewport) {
//               // Only geocodes have viewport.
//               bounds.union(place.geometry.viewport);
//             } else {
//               bounds.extend(place.geometry.location);
//             }
//           });
//           map.fitBounds(bounds);
//         });
//       }

$('#searchButton').on('click', function() {
	initMap();
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	// var search = $('#searchInput').val().trim().
	service.nearbySearch({
		location: uluru,
		radius: 1000,
		// types: search,
		// type: ['shopping_mall']
	}, callback);
	// service.nearbySearch({
	// 	location: uluru,
	// 	radius: 1000,
	// 	type: ['clothing_store']
	// }, callback);
});

// Code to sign in with Google profile via Firebase
var user;
var uid;

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    // [START signin]
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      //document.getElementById('quickstart-oauthtoken').textContent = token;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
      } else {
        console.error(error);
      }
    });
    // [END signin]
  } else {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}


function initApp() {
// Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      uid = user.uid;
      var providerData = user.providerData;
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
    } else {
      // User is signed out.
      //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
      //document.getElementById('quickstart-account-details').textContent = 'null';
      //document.getElementById('quickstart-oauthtoken').textContent = 'null';
    }
    document.getElementById('quickstart-sign-in').disabled = false;
  });
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
  initApp();
};

$('#quickstart-sign-in-status').hide();
$('#quickstart-account-details').hide();
$('#quickstart-oauthtoken').hide();

firebase.auth().onIdTokenChanged(function(user) {
  if (user) {
    // User is signed in or token was refreshed.
    console.log('User is signed in.')
  }
  else {
    console.log('No user signed in.');
  }
});
