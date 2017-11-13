var url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
var method = "POST";

var postData = JSON.stringify({
    query: '{ stops(name: "hel") {name, gtfsId, lat, lon} }'
});

console.log(postData);

var shouldBeAsync = true;
var request = new XMLHttpRequest();

request.onload = function () {
    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
    data = request.responseText; // Returned data, e.g., an HTML document.
}

function sendRequest() {
    request.open(method, url, shouldBeAsync);
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log("Request successful!");
            var pysakit = JSON.parse(request.responseText);
            console.table(pysakit.data.stops);
        }

    }
    request.send(postData);
}

sendRequest();
