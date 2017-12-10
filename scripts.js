// KELLO
var clock = document.getElementById('klo');

setInterval(function () {
  var time = moment().format('HH:mm:ss');
  clock.textContent = time;
}, 500);



// NÄYTÖNSÄÄSTÄJÄ, MODAL TIMEOUTIT

$("#naytons").click(function () {
  $("#naytons").fadeOut(800);
});

var idleTime = 0;
$(document).ready(function () {
  var idleInterval = setInterval(timerIncrement, 60000);
  $(this).mousemove(function (e) {
    idleTime = 0;
  });
  $(this).keypress(function (e) {
    idleTime = 0;
  });
});

function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime > 4) {
    $("#naytons").fadeIn(800); // Jos näyttö ollut inaktiivisena 5 min, näytönsäästäjä palautuu
  }
};

$('#nappi1').click(function () {
  setTimeout(function () {
    $('#hsl1').modal('hide');
  }, 3 * 60 * 1000);
});

$('#nappi2').click(function () {
  setTimeout(function () {
    $('#palv').modal('hide');
  }, 3 * 60 * 1000);
});

$('#nappi3').click(function () {
  setTimeout(function () {
    $('#info1').modal('hide');
  }, 3 * 60 * 1000);
});




// UUTISVIRTA JA KIELIASETUS

function uutisVirta() {
  $('.uvirta').marquee({
    duration: 15000,
    gap: 30,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true
  });
};

var fiUrl = "http://users.metropolia.fi/~ollial/web/proxy2.php?url=https://www.hsl.fi/newsApi/3";
var enUrl = "http://users.metropolia.fi/~ollial/web/proxy2.php?url=https://www.hsl.fi/en/newsApi/3";
var svUrl = "http://users.metropolia.fi/~ollial/web/proxy2.php?url=https://www.hsl.fi/sv/newsApi/3";
var urlSetting = "";

function chooseUrl(languageSetting) {
  if (languageSetting === 1) {
    urlSetting = fiUrl;
  } else if (languageSetting === 2) {
    urlSetting = enUrl;
  } else if (languageSetting === 3) {
    urlSetting = svUrl;
  }
  getNewsFeed(urlSetting);
}

function getNewsFeed(urlSetting) {
  document.getElementById("uvirta").innerHTML = '';

  $.post(
    urlSetting,
    function (data) {
      var fragment = document.createDocumentFragment();
      var results = data.contents.nodes.slice(0, 4);

      results.forEach(function (edge) {
        var news = edge.node.title.replace(/&quot;/g, '\"');
        var text = document.createTextNode(news);
        fragment.appendChild(text);
        fragment.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"));
      });

      document.getElementById("uvirta").appendChild(fragment);
      uutisVirta();
    }
  );
};




// KIELEN VAIHTO

var langbtn = document.getElementById("langbtn");

$(document).ready(function () {

  var kieli = "";

  $.post(
    "lang.json",
    function (kieli) {
      function changeFin() {
        document.getElementById("busHead").innerHTML = kieli.fi.busHead;
        document.getElementById("palvelut").innerHTML = kieli.fi.palvelut;
        document.getElementById("servicesHead").innerHTML = kieli.fi.servicesHead;
        document.getElementById("info").innerHTML = kieli.fi.info;
        document.getElementById("sohjoa1").innerHTML = kieli.fi.sohjoa1;
        document.getElementById("sohjoa2").innerHTML = kieli.fi.sohjoa2;
        document.getElementById("lang").innerHTML = kieli.fi.lang;
        document.getElementById("langlogo").src = "images/suomi.png";
      };

      function changeEng() {
        document.getElementById("busHead").innerHTML = kieli.en.busHead;
        document.getElementById("palvelut").innerHTML = kieli.en.palvelut;
        document.getElementById("servicesHead").innerHTML = kieli.en.servicesHead;
        document.getElementById("info").innerHTML = kieli.fi.info;
        document.getElementById("sohjoa1").innerHTML = kieli.en.sohjoa1;
        document.getElementById("sohjoa2").innerHTML = kieli.en.sohjoa2;
        document.getElementById("lang").innerHTML = kieli.en.lang;
        document.getElementById("langlogo").src = "images/english.png";
      };

      function changeSv() {
        document.getElementById("busHead").innerHTML = kieli.sv.busHead;
        document.getElementById("palvelut").innerHTML = kieli.sv.palvelut;
        document.getElementById("servicesHead").innerHTML = kieli.sv.servicesHead;
        document.getElementById("info").innerHTML = kieli.fi.info;
        document.getElementById("sohjoa1").innerHTML = kieli.sv.sohjoa1;
        document.getElementById("sohjoa2").innerHTML = kieli.sv.sohjoa2;
        document.getElementById("lang").innerHTML = kieli.sv.lang;
        document.getElementById("langlogo").src = "images/svenska.png";
      };

      var language = 1;
      changeFin();
      chooseUrl(1);
      console.log("\nKieli on " + language + " eli suomi");

      langbtn.onclick = function changeLang() {
        if (language === 1) {
          changeEng();
          chooseUrl(2);

          language = language + 1;
          console.log("\nLanguage is now " + language + " which is English");
        } else if (language === 2) {
          changeSv();
          chooseUrl(3);

          language = language + 1;
          console.log("\nSpråket är " + language + " som är svenska");
        } else if (language === 3) {
          changeFin();
          chooseUrl(1);

          language = language - 2;
          console.log("\nKieli on " + language + " eli suomi");
        }

      };
    }
  );

});



// GOOGLE SHEETS
// sijainti (lat & lon), locations (name, lat & lon), polyline markkerit (lat & lon)

function getJson(response) {
  return response.json();
}

function handleError(error) {
  console.error(error);
}




// GOOGLE MAPS -funktiot

var map;
var infowindow;

function createMap(sheetData) {
  var sijainti = {
    lat: parseFloat(sheetData.values[0][0]),
    lng: parseFloat(sheetData.values[0][1]),
  };

  console.log(sijainti);

  map = new google.maps.Map(document.getElementById('map'), {
    center: sijainti, // I need to access sijainti here
    zoom: 17,
    zoomControl: false,
    streetViewControl: false,
    scrollwheel: false,
    draggable: false,
    mapTypeControl: false,
    fullscreenControl: false
  });

  // Nämä Google Sheetsiin
  var locations = [
      ['VALIMO', 60.183431, 24.828609, ],
      ['ACRE', 60.182013, 24.830982],
      ['INNOVATION<br>ALLEY', 60.180732, 24.831549]
    ];

  var request = {
    location: sijainti,
    types: ['airport', 'amusement_park', 'aquarium', 'art-gallery', 'atm', 'bakery', 'bank', 'bar', 'beauty-salon', 'book_store', 'bowling_alley', 'cafe', 'cemetery', 'church', 'city_hall', 'clothing_store', 'convenience_store', 'dentist', 'department_store', 'doctor', 'electronics_store', 'florist', 'furniture-store', 'gas_station', 'gym', 'hair_care', 'hardware_store', 'home_goods_store', 'hospital', 'jewelry_store', 'laundry', 'library', 'liquor_store', 'lodging', 'meal_delivery', 'meal-takeaway', 'movie_rental', 'movie_theater', 'museum', 'night-club', 'park', 'pet_store', 'pharmacy', 'police', 'post_office', 'restaurant', 'school', 'shoe_store', 'shopping_mall', 'spa', 'stadium', 'store', 'university', 'zoo'],
    radius: '600'
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, getServices);

  // Tiedot kartan palveluille
  function getPlaceDetails(place, status, title) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var fragment = document.createDocumentFragment();
      var br = document.createElement('br');
      var container = document.createElement('div');
      container.classList.add('services-info');

      // Hakee palveluiden nimet
      var title = document.createElement('h3');
      title.classList.add('service-title');
      title.textContent = place.name;
      container.appendChild(title);

      // Hakee palveluiden osoitteet
      var address = document.createElement('p');
      address.classList.add('service-address');
      address.textContent = place.formatted_address;

      // Generoi QR-koodin
      var qrcode = document.createElement('img');
      qrcode.classList.add("qrcode");
      qrcode.setAttribute("id", place.id);
      var placeUrl = "https://www.google.com/maps/place/" + place.name.replace(/ /g, '+') + "/@" + place.geometry.location.lat() + "," + place.geometry.location.lng();
      // https://www.google.com/maps/place/Radisson+Blu+Espoo/@60.183647,24.8341114,17z
      qrcode.src = "http://api.qrserver.com/v1/create-qr-code/?data=" + placeUrl + "!&size=100x100";
      container.appendChild(qrcode);

      var open = place.opening_hours;
      var list = document.createElement('ul');
      list.classList.add('opening-hours-list');

      var isOpen = document.createElement('p');
      isOpen.classList.add('is-open');

      function checkOpeningHours() {
        list.innerHTML = "";
        isOpen.innerHTML = "";

        if (!open) {
          console.warn("No opening hours are available for " + place.name);
          isOpen.style.color = "#d12323";
          isOpen.textContent = "No details available";
          container.appendChild(address);
          container.appendChild(isOpen);
        } else {
          var date = new Date();
          var weekday = new Array(7);
          weekday[0] = "sunnuntai";
          weekday[1] = "maanantai";
          weekday[2] = "tiistai";
          weekday[3] = "keskiviikko";
          weekday[4] = "torstai";
          weekday[5] = "perjantai";
          weekday[6] = "lauantai";

          var currentDate = weekday[date.getDay()];

          if (open.open_now === true) {

            var openingHours = open.weekday_text.forEach(
              function (data) {
                var includes = JSON.stringify(data).includes(currentDate);

                if (includes === true) {
                  var closingTime = data.slice(-5);
                  isOpen.style.color = "#A0FF46";
                  isOpen.textContent = "open until " + closingTime;
                }
              }
            );

            if (/avoinna ympäri vuorokauden/i.test(open.weekday_text)) {
              isOpen.textContent = "always open!";
              list.innerHTML = "";
            }
          } else if (open.open_now === false) {
            isOpen.style.color = "#d12323";
            isOpen.textContent = "closed";
          }

          container.appendChild(address);
          container.appendChild(isOpen);
        };

      };

      checkOpeningHours();
      setInterval(checkOpeningHours, 15 * 60 * 1000);
      container.appendChild(list);
      fragment.appendChild(container);

      document.getElementById("servicesText").appendChild(fragment);

    } else {
      console.warn("No details are available for " + serviceRequest.name);
    }
  }

  function getServices(places, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      places.slice(0, 7).forEach(function (place) {
        var data = {
          name: place.name,
          placeId: place.place_id
        };
        service.getDetails(data, getPlaceDetails);
      });
    }
  }

  var marker, i;

  // Polyline markerit
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 13,
        fillColor: '#7470BC',
        fillOpacity: 0.8,
        strokeWeight: 5,
        strokeColor: '#7470BC'
      }
    });

    // InfoWindow content
    var content = locations[i][0];

    var infowindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 160,
      pixelOffset: new google.maps.Size(20, 20)
    });

    google.maps.event.addListener(infowindow, 'domready', function () {
      $(".gm-style-iw").next("div").hide();

      // Reference to the DIV that wraps the bottom of infowindow
      var iwOuter = $('.gm-style-iw');

      // Removes the tail from the info window
      google.maps.event.addListenerOnce(map, 'idle', function () {
        jQuery('.gm-style-iw').prev('div').remove();
      });
    });

    infowindow.open(map, marker);



  }(marker, i);

  var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    strokeOpacity: 1,
    strokeColor: 'rgba(218, 5, 5, 0.568)',
    scale: 4
  };

  // Polyline koordinaatit, nämä Google Sheetsiin
  var line = new google.maps.Polyline({
    path: [{
        lat: 60.183341,
        lng: 24.828418
      },
      {
        lat: 60.183233,
        lng: 24.828193
      },
      {
        lat: 60.182937,
        lng: 24.828823
            },
      {
        lat: 60.182502,
        lng: 24.829644
            },
      {
        lat: 60.182190,
        lng: 24.830331
            },
      {
        lat: 60.182009,
        lng: 24.830701
            },
      {
        lat: 60.181492,
        lng: 24.831087
            },
      {
        lat: 60.181151,
        lng: 24.831280
            },
      {
        lat: 60.180983,
        lng: 24.830845
            },
      {
        lat: 60.180930,
        lng: 24.830856
            },
      {
        lat: 60.180650,
        lng: 24.831092
            },
      {
        lat: 60.180705,
        lng: 24.831433
            }],
    strokeOpacity: 0,
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
          }],
    map: map
  });




  // BUSSIPYSÄKKIEN HAKU

  function getStops() {
    document.getElementById("busText").innerHTML = '';
    var query = JSON.stringify({
      query: '{ stopsByRadius(lat: ' + sijainti.lat + ', lon: ' + sijainti.lng + ', radius: 500) { edges { node { stop { name, lat, lon, stoptimesForPatterns(numberOfDepartures: 1) { pattern { name } stoptimes { scheduledDeparture } } } } } } }'
    });

    $.ajax({
      type: "POST",
      url: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
      data: query,
      contentType: 'application/json; charset=utf-8',
      success: function (pysakit) {
        console.log('Refreshing stop times');
        document.getElementById("busText").innerHTML = '';
        var fragment = document.createDocumentFragment();
        var results = pysakit.data.stopsByRadius.edges.forEach(
          function (edge) {
            var start_lat = sijainti.lat;
            var start_lon = sijainti.lng;
            var lat = edge.node.stop.lat;
            var lon = edge.node.stop.lon;

            // Laskee etäisyyden nykyisestä sijainnista bussipysäkille
            function distance(lat1, lon1, lat2, lon2) {
              var p = 0.017453292519943295;
              var c = Math.cos;
              var a = 0.5 - c((lat2 - lat1) * p) / 2 +
                c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;

              var result = 12742 * Math.asin(Math.sqrt(a));
              result = result.toFixed(3) * 1000;
              return result;
            }

            var container = document.createElement('div');
            container.classList.add('stop');
            var br = document.createElement('br');

            // Hakee pysäkkien nimet
            var title = document.createElement('h3');
            title.classList.add('stop-title')
            title.textContent = edge.node.stop.name + " (" + distance(start_lat, start_lon, lat, lon) + "m)";
            container.appendChild(title);

            var list = document.createElement('ul');
            list.classList.add('stop-list');

            // Filteröi tulokset ja hakee vain bussilinjat, jotka kulkevat seuraavan 15 minuutin sisään
            edge.node.stop.stoptimesForPatterns.filter(function (item) {
              var today = new Date();
              var currentSeconds = today.getSeconds() + (60 * today.getMinutes()) + (60 * 60 * today.getHours());
              var diff = Math.abs(item.stoptimes[0].scheduledDeparture - currentSeconds);

              return diff <= 900;
            }).map(function (item) {
              var time = moment.utc(item.stoptimes[0].scheduledDeparture * 1000).format('HH:mm');
              var name = item.pattern.name.slice(0, -13).replace(' to ', ' ');
              return {
                time: time,
                name: name,
              };
            }).sort(function (a, b) {
              if (a.time < b.time) {
                return -1;
              }

              if (a.time > b.time) {
                return 1;
              }

              return 0;
            }).splice(0, 4).forEach(function (item) {
              var listItem = document.createElement('li');
              listItem.classList.add('stop-list-item');
              listItem.textContent = (item.time + '  |  ' + item.name);
              list.appendChild(listItem);
            });

            container.appendChild(list);
            container.appendChild(br);
            fragment.appendChild(container);

            document.getElementById("busText").appendChild(fragment);

          });
      }
    })
  };

  getStops();
  setInterval(getStops, 60000);
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

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// Google Sheets -tietokantahaku
fetch("https://sheets.googleapis.com/v4/spreadsheets/1oOiSqkOp_WEj7f21opfQzqpozwEHTb-K9YES7p-Ib8g/values/A3%3AB3?fields=values&key=AIzaSyAsKit0QXl6tApOMluYh8do3jaKrwfyUxs")
  .then(getJson)
  .then(createMap)
  .catch(handleError);



// FOOTER VIDEO

$(document).ready(function () {

  $.ajax({
    type: "POST",
    url: "video.json",
    contentType: 'application/json; charset=utf-8',
    success: function (video) {
      var mainos = document.getElementById('video');

      if (video.video === "") {
        console.log("Playing default video from " + video.default);
        mainos.src = video.default;
      } else {
        console.log("Playing custom video from " + video.video);
        mainos.src = video.video;
      }
    },
    error: function () {
      console.error("Error playing video.");
    }
  });
});




// ARDUINO -FUNKTIOT

document.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 49) {
    document.getElementById("nappi1").click();
  } else if (event.keyCode === 50) {
    document.getElementById("nappi2").click();
  } else if (event.keyCode === 51) {
    document.getElementById("nappi3").click();
  } else if (event.keyCode === 52) {
    document.getElementById("langbtn").click();
  }
});

/* $(document).ready(function(){
      //  $( "#target" ).keypress(function() {
      //console.log( "Handler for .keypress() called." );
    //});

        $(document).keypress(function(e){
        var checkMoz1=(e.which==49 ? 1 : 0);
        var checkMoz2=(e.which==50 ? 1 : 0);
        var checkMoz3=(e.which==51 ? 1 : 0);
        var checkMoz4=(e.which==52 ? 1 : 0);
        var checkMoz5=(e.which==53 ? 1 : 0);
        var checkMoz6=(e.which==54 ? 1 : 0);
        
        if (checkMoz1) {
        } else if(checkMoz2){ $("body").append("<p>painoit 2</p>");
        }

        else if (checkMoz3) {$("body").append("<p>painoit 3</p>");
        }
        
        else if (checkMoz4) {$("body").append("<p>painoit 4</p>");
        }
        
        else if (checkMoz5) {$("body").append("<p>painoit 5</p>");
        }
        
        else if (checkMoz6) {$("body").append("<p>painoit 6</p>");
        }
    });
});*/
