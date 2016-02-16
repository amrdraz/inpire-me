var quotes = require('../quotes.json');
var db = require('./db.js');

exports.quotes = quotes;

function getElementByIndexElseRandom(array, index) {
    index = index===undefined?Math.floor(Math.random()*array.length):index;
    return array[index];
}
function getQuoteFromJSON(i) {
    return getElementByIndexElseRandom(quotes, i);
}
function getQuotesFromJSON() {
    return quotes;
}

function seedDB (cb) {
    db.db().collection('quotes').find().toArray(function (err, docs) {
        if (err) return cb(err);
        if (docs.length > 0)
            cb(null, false);
        else {
            db.db().collection('quotes').insertMany(quotes, function (err) {
                if (err) return cb(err);
                cb(null, true);
            });
        }
    });
}

function getQuote(cb, i) {
    db.db().collection('quotes').find({}).toArray(function (err, quotes) {
        if (err) return cb(err);
        cb(null, getElementByIndexElseRandom(quotes, i));
    });
}

function getQuotesFromDB(cb) {
    db.db().collection('quotes').find({}).toArray(cb);
}


exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed = seedDB;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuoteFromDB = getQuote;