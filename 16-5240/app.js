var express = require('express');
var app = express();
var Quote = require('./quotes.js');
var db = require('./db.js');

app.use(express.static('public'));


app.get('/api/quote', function (req, res, next) {
  Quote.getQuoteFromDB(function (err, quote) {
        if (err) return next(err);
        res.json({
          quote: quote
        });
    }, req.params.index);
});

app.get('/api/quotes', function (req, res, next) {
  Quote.getQuotesFromDB(function (err, quotes) {
        if (err) return next(err);
        res.json({
          quotes: quotes
        });
    });
});

module.exports = app;