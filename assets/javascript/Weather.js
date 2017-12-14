
var APIKey = "0125b2de9a0d42856e9c4048d13e8577";

    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Cleveland,US&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
  
      .done(function(response) {

       
        console.log(queryURL);

        
        console.log(response);

        
        $(".city").html("<h3>Current Weather in " + response.name + "</h3>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);

        
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });
  