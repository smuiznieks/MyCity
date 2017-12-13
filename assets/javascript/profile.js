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
var count = 0;

function logPlaceDetails(placeId) {
    var service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails({
        placeId: placeId
    }, function (place) {
        console.log('Place details:', place);
        var panel = $('<div class="panel panel-default" id="place' + count + '">');
        var div = $('<div class="panel-body">');
        div.append('<strong>' + place.name + '</strong>' + '<br />');
        div.append('Address: ' + place.adr_address + '<br />');
        div.append('<span class="glyphicon glyphicon-phone-alt" aria-hidden="true"></span>' + ': ' + place.formatted_phone_number + '<br />');
        div.append('Category: ' + place.types[0] + '<br />');
        div.append('<span class="glyphicon glyphicon-globe" aria-hidden="true"></span>' + ': ' + '<a href="' + place.website + '" target="_blank">' + 'Website' + '</a>' + '<br />');
        var buttonGroup = $('<div class="btn-group" role="group" aria-label="...">')
        var button = $('<button id="place-visited" data="' + count + '" type="button" class="btn btn-default btn-sm">' + '<span class="glyphicon glyphicon-ok" aria-hidden="true">' + '</span>' + ' Complete' + '</button>');
        buttonGroup.append(button);
        var deleteButton = $('<button id="delete-place" data="' + count + '" type="button" class="btn btn-default btn-sm">' + '<span class="glyphicon glyphicon-remove" aria-hidden="true">' + '</span>' + ' Delete' + '</button>');
        buttonGroup.append(deleteButton);
        div.append(buttonGroup);
        panel.append(div);
        $('#favorites').prepend(panel);
        count++;
    });
};

function logRecentDetails(placeId) {
    var service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails({
        placeId: placeId
    }, function (place) {
        console.log('Place details:', place);
        var icon;
        if (place.types[0] === 'restaurant' || 'meal_takeaway' || 'bakery' || 'food') {
            icon = ('<span class="glyphicon glyphicon-cutlery" aria-hidden="true">' + '</span>');
        } else if (place.types[0] === 'bar') {
            icon = ('<span class="glyphicon glyphicon-glass" aria-hidden="true">' + '</span>');
        } else if (place.types[0] === 'casino' || 'bowling_alley' || 'stadium' || 'amusement_park' || 'aquarium') {
            icon = ('<span class="glyphicon glyphicon-sunglasses" aria-hidden="true">' + '</span>');
        } else if (place.types[0] === 'museum') {
            icon = ('<span class="glyphicon glyphicon-knight" aria-hidden="true">' + '</span>');
        } else if (place.types[0] === 'shopping_mall' || 'clothing_store') {
            icon = ('<span class="glyphicon glyphicon-credit-card" aria-hidden="true">' + '</span>');
        } else {
            icon = ('<span class="glyphicon glyphicon-heart" aria-hidden="true">' + '</span>');
        }
        var panel = $('<div class="panel panel-default" id="place' + count + '">');
        var div = $('<div class="panel-body">');
        div.append('<strong>' + place.name + '</strong>' + icon + '<br />');
        div.append('Address: ' + place.adr_address + '<br />');
        div.append('Phone Number: ' + place.formatted_phone_number + '<br />');
        div.append('Category: ' + place.types[0] + '<br />');
        div.append('<a href="' + place.website + '" target="_blank">' + 'Website' + '</a>' + '<br />');
        //var button = $('<button id="place-visited" data="' + count + '" type="button" class="btn btn-default btn-sm">' + '<span class="glyphicon glyphicon-ok" aria-hidden="true">' + '</span>' + ' Complete' + '</button>');
        //div.append(button);
        var deleteButton = $('<button id="delete-place" data="' + count + '" type="button" class="btn btn-default btn-sm">' + '<span class="glyphicon glyphicon-remove" aria-hidden="true">' + '</span>' + ' Delete' + '</button>');
        div.append(deleteButton);
        panel.append(div);
        $('#recents').prepend(panel);
        count++;
    });
};

function placeVisited() {
    var placeValue = ($(this).attr('data'));
    $('#place' + placeValue).detach('#favorites');
    $('#recents').prepend($('#place' + placeValue));
    //database.ref().set({
      //  recent: true
    //});
};

function deletePlace() {
    var placeValue = ($(this).attr('data'));
    $('#place' + placeValue).remove();
    //database.ref().remove();
};

$(document).on('click', '#place-visited', placeVisited);
$(document).on('click', '#delete-place', deletePlace);

$('#map').hide();
$('#profile-page').hide();

//Code to sign in with Google profile via Firebase
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
                console.log('User has already signed up with a different auth provider for that email.');
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
        console.log('User signed in.');
        upcomingEvents();
        $('#login-message').empty();
        $('#profile-page').show();
        $('#user-name').text(', ' + user.displayName);
        $('#prof-pic').append('<img src="' + user.photoURL + '" alt="Profile Picture" />');
        $('#favorites').empty();
        database.ref().on('child_added', function(snapshot) {
            var savedPlace = snapshot.val();
            var favePlace = savedPlace.id;
            var recent = savedPlace.recent;
            if (uid === savedPlace.user) {
                console.log(savedPlace);
                if (recent === false) {
                    logPlaceDetails(favePlace);
                } 
                if (recent === true) {
                    logRecentDetails(favePlace);
                }
            }
        });
    } else {
        console.log('No user signed in.');
        $('#profile-page').hide();
        $('#user-name').empty();
        $('#prof-pic').empty();
        $('#favorites').empty();
        var noUser = ('<h5>' + 'Sign in to see your favorites.' + '</h5>');
        $('#login-message').append(noUser);
    }
});

function upcomingEvents() {
    var queryURL = 'https://app.ticketmaster.com/discovery/v2/events.json?size=5&city=cleveland&apikey=xTXoZckO39bpw42IEjyvpBl3eJGMrOtG';
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        for (i = 0; i < 5; i++) {
            var event = response._embedded.events[i];
            var panel = $('<div class="panel panel-default">');
            var div = $('<div class="panel-body">');
            div.append('<strong>' + event.name + '</strong>' + '<br />');
            div.append('On ' + event.dates.start.localDate + ' at ' + event.dates.start.localTime + '<br />');
            div.append(event._embedded.venues[0].name + '<br />');
            div.append('<a href="' + event.url + '" target="_blank">' + 'Buy tickets' + '</a>' + '<br />');
            panel.append(div);
            $('#recommendations').append(panel);
        }
    }).fail(function(err) {
        throw err;
        console.log('ERROR!');
    });
};

