var quotes = require('./quotes.json');

exports.authors = quotes.map(function (q) {
    return q[1];
});
exports.quotes = quotes.map(function (q) {
    return q[0];
});

function getElementByIndexElseRandom(array, index) {
    index = index || Math.floor(Math.random()*array.length);
    return array[index];
}

function getRandomQuoteObject () {
    return getElementByIndexElseRandom(getQuotesAsObjectsArray());
}

function getQuote(i) {
    return getElementByIndexElseRandom(quotes, i).join(' - ');
}

function getQuotesAsObjectsArray() {
    return quotes.map(function (quote) {
       return {
        author: quote[1],
        text: quote[0]
       };
    });
}

function getQuotes() {
    return quotes.map(function (quote) {
       return quote.join(' - ');
    });
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuote = getQuote;
exports.getQuotesAsObjectsArray = getQuotesAsObjectsArray;
exports.getQuotes = getQuotes;