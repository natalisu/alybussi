// KELLO

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('klo').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

window.onload = function () {
    startTime();
}




// UUTISVIRTA

$('.uvirta').marquee({
    //speed in milliseconds of the marquee
    duration: 10000,
    //gap in pixels between the tickers
    // gap: 100,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: false
});




// LEAFLET KARTTA

/*var map = L.map('map').setView([60.1810352, 24.83190479999996], 17);

L.tileLayer('https://api.mapbox.com/styles/v1/koenshi/cj9o4wl4g42jk2spcfq4v3eiu/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 17,
    minZoom: 17,
    id: 'mapbox.streets',
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken: 'pk.eyJ1Ijoia29lbnNoaSIsImEiOiJjajludnExaXQyZ2dnMnFzMmczMWNoMW4yIn0.ksZiBFRbpfKuxbSzDXaJBA'
}).addTo(map);

// interaktiivisuuden poistaminen
/* map._handlers.forEach(function (handler) {
    handler.disable();
});
$(".leaflet-control-zoom").css("visibility", "hidden");


var point = turf.point(24.83190479999996, 60.180602, {
    "marker-color": "#8E8E8E",
    "title": "Determining Point",
    "marker-symbol": "star",
    "marker-size": "large"
});

var features = [
    turf.point(24.832415999999967, 60.180602, {
        "marker-color": "#6BC65F",
        "title": "Too Far",
        "marker-size": "small"
    }),
    turf.point(24.830848599999968, 60.18155189999999, {
        "marker-color": "#6BC65F",
        "title": "Too Far",
        "marker-size": "small"
    }),
    turf.point(24.831505900000025, 60.1836679, {
        "marker-color": "#6BC65F",
        "title": "Too Far",
        "marker-size": "small"
    })
];

var fc = turf.featurecollection(features);

var nearest = turf.nearest(point, fc);

nearest.properties["marker-color"] = "#25561F";
nearest.properties["title"] = "Nearest Point";
nearest.properties["marker-size"] = "large";
nearest.properties["marker-symbol"] = "star-stroked";

var nearest_fc = turf.featurecollection([point, nearest]);

L.mapbox.accessToken = 'pk.eyJ1Ijoia29lbnNoaSIsImEiOiJjajludnExaXQyZ2dnMnFzMmczMWNoMW4yIn0.ksZiBFRbpfKuxbSzDXaJBA';
L.mapbox.featureLayer().setGeoJSON(fc).addTo(map);
L.mapbox.featureLayer().setGeoJSON(nearest_fc).addTo(map);


/*
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [50.1810352, 2.83190479999996]
    }
};

L.geoJSON(geojsonFeature).addTo(map);
*/

//GOOGLE MAPS KARTTA

      var map;
      var infowindow;

      function initMap() {
        var otaniemi = {lat: 60.1841396, lng: 24.83008380000001};

        map = new google.maps.Map(document.getElementById('map'), {
          center: otaniemi,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: otaniemi,
          radius: 500,
          type: ['store, restaurant']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }