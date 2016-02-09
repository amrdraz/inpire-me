var http = require('http');
var fs = require('fs');
var quotes = require('./quotes.js');
var db = require('./db.js');

function handleRequest(request, response){
    if (request.url==='/index.html' || request.url==='/') {
        response.writeHeader(200, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./index.html'));
    } else if(request.url==='/quote') {
        quotes.getQuote(function (err, quote) {
            if (err) {
                response.writeHeader(500);
                console.log(err);
                response.end(err.message);
            } else {
                response.writeHeader(200, {'Content-type':'application/json'});
                response.end(JSON.stringify(quote));
            }
        });
    } else if(request.url==='/seed') {
        response.writeHeader(200, {'Content-type':'text/plain'});
        quotes.seed(function (err, seeded) {
            if (err) throw err;
            if (seeded) {
                response.end('added quotes to db');
            } else {
                response.end('quotes already in db');
            }
        });
    } else {
        response.writeHeader(404);
        response.end('The Path <code>' + request.url+ '</code> is not a valid one');
    }
}

var PORT=8080;
db.connect().then(function () {
    http.createServer(handleRequest).listen(PORT, function(){
        console.log("Server listening on: http://localhost:%s", PORT);
    });
});