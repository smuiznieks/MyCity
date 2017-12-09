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

// Code to sign in with Google profile via Firebase
var displayName;
var token;
var user;


function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    // [START createprovider]
    var provider = new firebase.auth.GoogleAuthProvider();
    // [END createprovider]
    // [START addscopes]
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // [END addscopes]
    // [START signin]
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      // [START_EXCLUDE]
      document.getElementById('quickstart-oauthtoken').textContent = token;
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // [START_EXCLUDE]
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END signin]
  } else {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
  // [START_EXCLUDE]
  document.getElementById('quickstart-sign-in').disabled = true;
  // [END_EXCLUDE]
}
// [END buttoncallback]
/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*/

function initApp() {
// Listening for auth state changes.
// [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
      //document.getElementById('quickstart-account-details').textContent = 'null';
      //document.getElementById('quickstart-oauthtoken').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
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
    console.log('Token: ' + token);
    $('#user-name').text(', ' + user.displayName);
    $('#favorites').empty();
    $('#favorites').text('Cool, these are my saved places!');
  }
  else {
    $('#user-name').empty();
    $('#favorites').empty();
    var noUser = ('<h5>' + 'Sign in to see your favorites!' + '</h5>');
    $('#favorites').append(noUser);
  }
});











