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

function uutisVirta() {
    $('.uvirta').marquee({
        duration: 10000, //speed in milliseconds of the marquee
        // gap: 100, //gap in pixels between the tickers
        delayBeforeStart: 0, // time in milliseconds before the marquee will start animating
        direction: 'left', //'left' or 'right'
        duplicated: false //true or false - should the marquee be duplicated to show an effect of continues flow
    });
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

//GOOGLE MAPS -KARTTA

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

    /*infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: sijainti,
        radius: 300,
        type: ['bus_station']
    }, callback);

}*/

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
                lat: 60.183397,
                lng: 24.828528
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
                lat: 60.180701,
                lng: 24.831451
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

    var query = JSON.stringify({
        query: '{ stopsByRadius(lat: ' + sijainti.lat + ', lon: ' + sijainti.lng + ', radius: 500) { edges { node { stop {name, gtfsId, lat, lon} } } } }'
    });

    $.ajax({
        type: "POST",
        url: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
        data: query,
        contentType: 'application/json; charset=utf-8',
        success: function (pysakit) {
            var results = JSON.stringify(pysakit.data.stopsByRadius.edges, null, 4);
            // console.log(results);
            console.log(pysakit.data.stopsByRadius.edges);
        }
    });

}

getStops();







// KIELEN VAIHTO

var langbtn = document.getElementById("langbtn");

function changeFin() {
    document.getElementById("uvirta").innerHTML = ("tähän tulee tiedoitteet");
    document.getElementById("kutsu").innerHTML = ("Kutsu");
    document.getElementById("buscall").innerHTML = ("Bussi kutsuttu!");
    document.getElementById("hsl").innerHTML = ("HSL");
    document.getElementById("palvelut").innerHTML = ("Palvelut");
    document.getElementById("info").innerHTML = ("Info");
    document.getElementById("sohjoah").innerHTML = ("SOHJOA-hanke");
    document.getElementById("sohjoa1").innerHTML = ("SOHJOA-hanke on osa Suomen kuuden suurimman kaupungin yhteistä 6Aika-strategiaa, jossa kehitetään avoimempia ja älykkäämpi palveluita. Tavoitteena on synnyttää Suomeen uutta osaamista, liiketoimintaa ja työpaikkoja. Metropolian monialaisina hankekumppaneina ovat Aalto-yliopisto, Forum Virium Helsinki, Maanmittauslaitos sekä Tampereen teknillinen yliopisto.");
    document.getElementById("sohjoa2").innerHTML = ("Automaattiajoneuvojen toimintaa suomalaisissa olosuhteissa testataan osana Liikenneviraston ja Trafin rahoittamaa NordicWay –hanketta, jossa osaltaan valmistaudutaan uudentyyppisiin liikenteen palveluihin ja tieliikenteen automaatioon.");
    document.getElementById("lang").innerHTML = ("Kieli");
};

function changeEng() {
    document.getElementById("uvirta").innerHTML = ("news here");
    document.getElementById("kutsu").innerHTML = ("Call bus");
    document.getElementById("buscall").innerHTML = ("Your bus is coming!");
    document.getElementById("hsl").innerHTML = ("Commute");
    document.getElementById("palvelut").innerHTML = ("Services");
    document.getElementById("info").innerHTML = ("Help");
    document.getElementById("sohjoah").innerHTML = ("The SOHJOA Project");
    document.getElementById("sohjoa1").innerHTML = ("SOHJOA-6Aika is part of a Finnish cities’ collaborative 6Aika -project family funded by European Structural Fund. Our partners are Aalto University, Forum Virium Helsinki, Finnish Geographical Institute and Tampere University of Technology. Operation of automated vehicles in Finnish environment is tested as part of the NordicWay - project funded by Finnish Transport Safety Agency Trafi and Finnish Transport Agency Liikennevirasto. NordicWay project tackles the challenges of new traffic services and road transport automation.");
    document.getElementById("sohjoa2").innerHTML = ("SOHJOA aims to set Finland in the fast lane of the development of automated road transport systems. Enabling the transition towards road traffic automation is accompanied with the development of new export businesses. To this end, in addition to piloting, the project will create an open innovation platform that companies can utilize to develop new product and service ideas. The potential new operational models, products and services will either support all-round operability of automated systems or take advantage of it.");
    document.getElementById("lang").innerHTML = ("Language");
};

$(document).ready(function () {
    uutisVirta();
    var language = 1;
    console.log("Kieli on " + language + " eli suomi");

    langbtn.onclick = function changeLang() {
        if (language === 1) {
            changeEng();
            uutisVirta();
            language = language + 1;
            console.log("Language is now " + language + " which is English");
        } else if (language === 2) {
            changeFin();
            uutisVirta();
            language = language - 1;
            console.log("Kieli on " + language + " eli suomi");
        }

    };

});
