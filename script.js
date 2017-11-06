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

var mymap = L.map('mapid').setView([60.22080349999999, 24.80520709999996], 16);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox.streets',
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken: 'pk.eyJ1Ijoia29lbnNoaSIsImEiOiJjajludnExaXQyZ2dnMnFzMmczMWNoMW4yIn0.ksZiBFRbpfKuxbSzDXaJBA'
}).addTo(mymap);

// markerin lisääminen
var marker = L.marker([60.22080349999999, 24.80520709999996]).addTo(mymap);
marker.bindPopup("aaaa").openPopup();
