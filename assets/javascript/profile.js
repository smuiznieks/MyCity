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


// idk if 'child_added' is the correct code to use here but it works so I guess we can leave it?
database.ref().on('child_added', function(snapshot) {

    var favePlace;
    // var newPlace;
    // var service;
    var savedPlace = snapshot.val();
    var favePlace = savedPlace.id;
    var request = {
        placeId: favePlace
    };

    var queryURL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + request.placeId + '&key=AIzaSyDMqNQ9pA7C5sKkMHm8U6BAdExqtprHAwE'


	console.log(queryURL);


    $.ajax({
        url: queryURL,
        type: "GET"
    }).done(function(response) {

        console.log(response)
        
        // $.ajax({
        //     url: queryURL, 
        //     type: "GET",   
        //     dataType: 'json',
        //     cache: false,
        //     }).done(function(response) {                         
        //         console.log(response);                   
        //         })            
    

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        });
})



// $('#map').hide();













