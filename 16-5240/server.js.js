var express = require('express');
var app = express();
var quotes = require('./quotes.js');
var db = require('./db.js');

app.use(express.static('public'));

app.get('/api/quote', function (req, res, next) {
  quotes.getQuoteFromDB(function (err, quote) {
        if (err) return next(err);
        res.json(quote);
    });
});

app.get('/api/seed', function (req, res, next) {
  quotes.seed(function (err, quote) {
        if (err) return next(err);
        if (seeded) {
            res.json({message: 'added quotes to db'});
        } else {
            res.json({message: 'quotes already in db'});
        }
    });
});

app.use(function(err, req, res, next) {
    if (!err) return res.status(404).send('Not Found');
    next(err);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var PORT=8080;
db.connect().then(function () {
    app.listen(PORT, function(){
        console.log("Server listening on: http://localhost:%s", PORT);
    });
});