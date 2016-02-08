var assert = require('chai').assert;
var expect = require('chai').expect;
var quotesGen = require('../quotes.js');

describe('Quotes', function () {
    it('should be 100', function () {
        assert(quotesGen.quotes.length, 100);
    });
    it('objects array should also be 100', function () {
        assert(quotesGen.getQuotesAsObjectsArray().length, 100);
    });
    it('should be formated as text - author', function () {
        assert(quotesGen.getQuote(0), "Life isn’t about getting and having, it’s about giving and being. - Kevin Kruse");
    });
    it('should be random if index not specified', function () {
        assert.include(quotesGen.getQuotes(), quotesGen.getQuote());
    });
});