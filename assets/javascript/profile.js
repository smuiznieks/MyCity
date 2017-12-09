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


database.ref("places/").on('child_added', function(snapshot) {

 
    var savedPlace = snapshot.val();
    var favePlace = savedPlace.id;

    console.log(savedPlace);

    logPlaceDetails(favePlace);

});

function logPlaceDetails(placeId) {
    var service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails({
    placeId: placeId
          }, function (place) {
            console.log('Place details:', place);
            var div = $('<div>');
            div.append(place.name + '<br />');
            div.append('Address: ' + place.adr_address + '<br />');
            div.append('Phone Number: ' + place.formatted_phone_number + '<br />');
            div.append('Category: ' + place.types[0] + '<br />');
            div.append('Website: ' + place.website + '<br />');
            $('#favorites').prepend(div);
          });

}

// Code to sign in with Google profile via Firebase
var user;

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    // [START signin]
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      //document.getElementById('quickstart-oauthtoken').textContent = token;
      database.ref("users/").push(user.displayName);
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
      //var displayName = user.displayName;
      //var email = user.email;
      //var emailVerified = user.emailVerified;
      //var photoURL = user.photoURL;
      //var isAnonymous = user.isAnonymous;
      //var uid = user.uid;
      //var providerData = user.providerData;
      //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
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
    //INSERT ASHLEE'S CODE HERE????????????
    console.log('User is signed in.');
    //$('#user-name').text(', ' + user.displayName);
    //$('#favorites').empty();
  }
  else {
    console.log('No user signed in.');
    //$('#user-name').empty();
    //$('#favorites').empty();
    //var noUser = ('<h5>' + 'Sign in to see your favorites!' + '</h5>');
    //$('#favorites').append(noUser);
  }
});
