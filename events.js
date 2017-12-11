var apiKey= "afc5e14f80351e549a070c4d57d47073"

// build URL
var queryURL = "api.openweathermap.org/data/2.5/forecast?id=4461030"

//run AJAX
$.ajax({
	url:queryURL,
	method: "GET",
	}
})
.done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        

        // Log the data in the console as well
        
      });

console.log(queryURL);