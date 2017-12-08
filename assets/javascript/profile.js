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
var favePlace;
var newPlace;
var service;
var placeId;

var queryURL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + 'ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyC519iOJi8tbM45WPdfph3XP-nxkdtez-o'


// idk if 'child_added' is the correct code to use here but it works so I guess we can leave it?
database.ref().on('child_added', function(snapshot) {
	// Finds Place ID and pushes it to the faveArray
	var savedPlace = snapshot.val();
	favePlace = savedPlace.id;
	var request = {
  		placeId: favePlace
	};

	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
});


 $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#movie-view").text(JSON.stringify(response));
        });










