var quotes = require('./quotes.json');
var db = require('./db.js');

exports.quotes = quotes;

function getElementByIndexElseRandom(array, index) {
    index = index===undefined?Math.floor(Math.random()*array.length):index;
    return array[index];
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

function getQuote(cb) {
    db.db().collection('quotes').find({}).toArray(function (err, quotes) {
        if (err) return cb(err);
        cb(null, getElementByIndexElseRandom(quotes));
    });
}

function insertQuote(quote, cb) {
    db.db().collection('quotes').insert(quote, function (err, result) {
        if (err) return cb(err, false);
        cb(null, result);
    });
}

function updateQuote(query, quote, cb) {
    db.db().collection('quotes').update(query, {$set: quote}, function (err, result) {
        if (err) return cb(err, false);
        cb(null, result);
    });
}

function deleteQuote(query, cb) {
    db.db().collection('quotes').delete(query, function (err, result) {
        if (err) return cb(err, false);
        cb(null, result);
    });
}

function getQuoteFromJSON(i) {
    return getElementByIndexElseRandom(quotes, i);
}
function getQuotesFromJSON() {
    return quotes;
}

function getQuotesFromDB(cb) {
    db.db().collection('quotes').find({}).toArray(function (err, quotes) {
        if (err) return cb(err, false);
        cb(null, quotes);
    });
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromDB = getQuote;
exports.getQuote = getQuote;
exports.getQuotesFromDB = getQuotesFromDB;
exports.seed = seedDB;
exports.insertQuote = insertQuote;
exports.deleteQuote = deleteQuote;
exports.updateQuote = updateQuote;