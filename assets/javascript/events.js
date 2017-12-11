<div id="weatherAPI">
      <div class="city"></div>
      <div class="wind"></div>
      <div class="humidity"></div>
      <div class="temp"></div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript">
    
    var APIKey = "0125b2de9a0d42856e9c4048d13e8577";

    
    var queryURL = "https://api.openweathermap.org/data/2.5/forcast?" +
      "q=Cleveland,US&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
  
      .done(function(response) {

       
        console.log(queryURL);

        
        console.log(response);

        
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);

        
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });
  </script>