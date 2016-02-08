var http = require('http');
var fs = require('fs');
var mongo = require('mongodb').MongoClient;
var quotesGen = require('./quotes.js');

var DB;
exports.DB = DB;
mongo.connect('mongodb://localhost:27017/test', function (err, db) {
    console.log('connected to db');
    DB = db;
});

function handleRequest(request, response){
    if (request.url==='/index.html' || request.url==='/') {
        response.writeHeader(200, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./index.html'));
    } if(request.url==='/quote') {
        response.writeHeader(200, {'Content-type':'text/plain'});
        response.end(quotesGen.getQuote());
    } else {
        response.writeHeader(404);
        response.end('Not Found Path Hit: ' + request.url);
    }
}

var server = http.createServer(handleRequest);
var PORT=8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});