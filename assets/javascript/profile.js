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

// idk if 'child_added' is the correct code to use here but it works
database.ref().on('child_added', function(snapshot) {
	var savedPlace = snapshot.val();
	
	var newPlace = $('<p>' + '<strong>' + savedPlace.name + '</strong>' + '</p>');
	var info = $('<ul>');
	var placeID = $('<li>' + 'Place ID: ' + savedPlace.id + '</li>');
	newPlace.append(placeID);
	$('#favorites').append(newPlace);
}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});

// https://developers.google.com/maps/documentation/javascript/places#place_details
// We should be able to use the Place ID to pull more info from Place Details (see above link)
// Must initiate map for Google Places to work
function initMap() {
		var service = new google.maps.places.PlacesService(map);
		service.getDetails({
			//We want to insert out saved places here... have been messing around with it but can't quite figure it out
			placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
		}, function(place, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				console.log(place);
			}
		});
	};

// Hiding map on Profile page because do not
$('#map').hide();