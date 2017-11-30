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
    getStops();
}






// NÄYTÖNSÄÄSTÄJÄ

$("#naytons").click(function () {
    $("#naytons").fadeOut(800);
});

var idleTime = 0;
$(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
});

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 2) {
        $("#naytons").fadeIn(800);
        // Jos näyttö ollut inaktiivisena 3 min, näytönsäästäjä palautuu
    }
}






// UUTISVIRTA & TIEDOITEHAKU

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
                document.getElementById("kutsu").innerHTML = kieli.fi.kutsu;
                document.getElementById("buscall").innerHTML = kieli.fi.buscall;
                document.getElementById("hsl").innerHTML = kieli.fi.hsl;
                document.getElementById("busHead").innerHTML = kieli.fi.busHead;
                // document.getElementById("busText").innerHTML = kieli.fi.busText;
                document.getElementById("palvelut").innerHTML = kieli.fi.palvelut;
                document.getElementById("info").innerHTML = kieli.fi.info;
                document.getElementById("sohjoah").innerHTML = kieli.fi.sohjoah;
                document.getElementById("sohjoa1").innerHTML = kieli.fi.sohjoa1;
                document.getElementById("sohjoa2").innerHTML = kieli.fi.sohjoa2;
                document.getElementById("lang").innerHTML = kieli.fi.lang;
            };

            function changeEng() {
                document.getElementById("kutsu").innerHTML = kieli.en.kutsu;
                document.getElementById("buscall").innerHTML = kieli.en.buscall;
                document.getElementById("hsl").innerHTML = kieli.en.hsl;
                document.getElementById("palvelut").innerHTML = kieli.en.palvelut;
                document.getElementById("info").innerHTML = kieli.en.info;
                document.getElementById("sohjoah").innerHTML = kieli.en.sohjoah;
                document.getElementById("sohjoa1").innerHTML = kieli.en.sohjoa1;
                document.getElementById("sohjoa2").innerHTML = kieli.en.sohjoa2;
                document.getElementById("lang").innerHTML = kieli.en.lang;
            };

            function changeSv() {
                document.getElementById("kutsu").innerHTML = kieli.sv.kutsu;
                document.getElementById("buscall").innerHTML = kieli.sv.buscall;
                document.getElementById("hsl").innerHTML = kieli.sv.hsl;
                document.getElementById("palvelut").innerHTML = kieli.sv.palvelut;
                document.getElementById("info").innerHTML = kieli.sv.info;
                document.getElementById("sohjoah").innerHTML = kieli.sv.sohjoah;
                document.getElementById("sohjoa1").innerHTML = kieli.sv.sohjoa1;
                document.getElementById("sohjoa2").innerHTML = kieli.sv.sohjoa2;
                document.getElementById("lang").innerHTML = kieli.sv.lang;
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






// NAPPULAT

document.addEventListener("keyup", function(event) {
event.preventDefault();
if (event.keyCode === 49) {
    document.getElementById("nappi1").click();
}
else if (event.keyCode === 50) {
    document.getElementById("nappi2").click();
}
else if (event.keyCode === 52) {
    document.getElementById("nappi4").click();
}
else if (event.keyCode === 53) {
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
    
        if (checkMoz1){
            
        }
        else if(checkMoz2){ $("body").append("<p>painoit 2</p>");
            
        }
                
        else if (checkMoz3) {$("body").append("<p>painoit 3</p>");
            
        }
                
        else if (checkMoz4) {$("body").append("<p>painoit 4</p>");
            
        }
                
        else if (checkMoz5) {$("body").append("<p>painoit 5</p>");
            
        }
                
        else if (checkMoz6) {$("body").append("<p>painoit 6</p>");
            
        }
                
    });  */






// GOOGLE MAPS -KARTTA

var map;
var infowindow;
var sijainti = {
    lat: 60.182,
    lng: 24.830
}


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: sijainti,
        zoom: 17,
        zoomControl: false,
        streetViewControl: false,
        scrollwheel: false,
        draggable: false,
        mapTypeControl: false,
        fullscreenControl: false
    });

    var locations = [
      ['VALIMO', 60.183431, 24.828609, 3],
      ['ACRE', 60.182013, 24.830982, 2],
      ['INNOVATION<br>ALLEY', 60.180732, 24.831549, 1]
    ];

    var marker, i;

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
            pixelOffset: new google.maps.Size(-100, 0)
        });

        google.maps.event.addListener(infowindow, 'domready', function () {
            $(".gm-style-iw").next("div").hide();


            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');

            /* Since this div is in a position prior to .gm-div style-iw.
             * We use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
             */
            var iwBackground = iwOuter.prev();

            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({
                'display': 'none'
            });

            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({
                'display': 'none'
            });

            // Moves the infowindow 115px to the right.
            iwOuter.parent().parent().css({
                left: '115px'
            });

            // Moves the shadow of the arrow 76px to the left margin.
            iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
                return s + 'left: 76px !important;'
            });

            // Moves the arrow 76px to the left margin.
            iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
                return s + 'left: 76px !important;'
            });

            // Changes the desired tail shadow color.
            iwBackground.children(':nth-child(3)').find('div').children().css({
                'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                'z-index': '1'
            });

            // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        });

        infowindow.open(map, marker);



    }(marker, i);

    var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        strokeOpacity: 1,
        strokeColor: 'rgba(218, 5, 5, 0.568)',
        scale: 4
    };

    // Create the polyline, passing the symbol in the 'icons' property.
    // Give the line an opacity of 0.
    // Repeat the symbol at intervals of 20 pixels to create the dashed effect.
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






// PYSÄKKIHAKU

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
            var fragment = document.createDocumentFragment();
            var results = pysakit.data.stopsByRadius.edges.forEach(
                function (edge) {
                    var start_lat = sijainti.lat;
                    var start_lon = sijainti.lng;
                    var lat = edge.node.stop.lat;
                    var lon = edge.node.stop.lon;

                    // Laske etäisyys oman sijainnin ja kaikkien pysäkkien välillä
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

                    console.log(distance(start_lat, start_lon, lat, lon));

                    // Asetetaan pysäkkien koordinaatit kartalle
                    var marker = new google.maps.Marker({
                        position: {
                            lat: lat,
                            lng: lon
                        },
                        map: map
                    });

                    // Tehdään container, jotta elementtejä on helpompi muokata
                    var container = document.createElement('div');
                    container.classList.add('stop');
                    var br = document.createElement('br');

                    // Haetaan pysäkkinimet
                    var title = document.createElement('h3');
                    title.classList.add('stop-title');
                    title.textContent = edge.node.stop.name + " (" + distance(start_lat, start_lon, lat, lon) + "m)";
                    container.appendChild(title);

                    var list = document.createElement('ul');
                    list.classList.add('stop-list');

                    // Haetaan seuraavien lähtevien bussien aikataulut
                    var times = edge.node.stop.stoptimesForPatterns.slice(0, 3).forEach(
                        function (data) {
                            var time = moment.utc(data.stoptimes[0].scheduledDeparture * 1000).format('HH:mm');
                            var name = data.pattern.name.slice(0, -13).replace(' to ', ' ').replace(' (HSL:2222209)', '');

                            var listItem = document.createElement('li');
                            listItem.classList.add('stop-list-item');

                            var scheduledTime = document.createElement('p');
                            scheduledTime.classList.add('scheduledTime');
                            scheduledTime.textContent = (time + '  |  ');
                            listItem.textContent = (scheduledTime.textContent + name);
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
