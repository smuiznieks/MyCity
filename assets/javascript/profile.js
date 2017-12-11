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

// database.ref().on('child_added', function(snapshot) {
//     var savedPlace = snapshot.val();
//     var favePlace = savedPlace.id;
//     console.log(savedPlace);
//     logPlaceDetails(favePlace);
// });

function logPlaceDetails(placeId) {
    var service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails({
        placeId: placeId
    }, function (place) {
        console.log('Place details:', place);
        var panel = $('<div class="panel panel-default">');
        var div = $('<div class="panel-body">');
        div.append('<strong>' + place.name + '</strong>' + '<br />');
        div.append('Address: ' + place.adr_address + '<br />');
        div.append('Phone Number: ' + place.formatted_phone_number + '<br />');
        div.append('Category: ' + place.types[0] + '<br />');
        div.append('<a href="' + place.website + '" target="_blank">' + 'Website' + '</a>' + '<br />');
        var button = $('<button id="place-visited" type="button" class="btn btn-default">' + '<span class="glyphicon glyphicon-ok" aria-hidden="true">' + '</span>' + ' Complete' + '</button>');
        div.append(button);
        var deleteButton = $('<button id="delete-place" type="button" class="btn btn-default">' + 'Delete' + '</button>');
        div.append(deleteButton);
        panel.append(div);
        $('#favorites').prepend(panel);
    });
}

$('#map').hide();
$('#profile-page').hide();

$('#place-visited').on('click', function() {
    console.log('User has visited a new location.');
    $('#recents').prepend(this);
});

$('#delete-place').on('click', function() {
    console.log('User has deleted a saved location.');
    $(this).remove();
});

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
                alert('You have already signed up with a different auth provider for that email.');
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
        $('#login-message').empty();
        $('#profile-page').show();
        $('#user-name').text(', ' + user.displayName);
        $('#prof-pic').append('<img src="' + user.photoURL + '" alt="Profile Picture" />');
        $('#favorites').empty();
        database.ref().on('child_added', function(snapshot) {
            var savedPlace = snapshot.val();
            var favePlace = savedPlace.id;
            if (uid === savedPlace.user) {
                console.log(savedPlace);
                logPlaceDetails(favePlace);
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
