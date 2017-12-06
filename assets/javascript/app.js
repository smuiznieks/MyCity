function initMap() {
    var uluru = {lat: 41.505493, lng: -81.681290};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

