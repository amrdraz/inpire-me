var assert = require('chai').assert;
var quotes = require('../quotes.js');
var db = require('../db.js');
before(function (done) {
    db.connect(function (err, db) {
        if (err) return done(err);
        else done();
    });
});

describe("getElementByIndexElseRandom", function () {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we ommit the index", function () {
        assert.include(arr, quotes.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function () {
        assert.equal(quotes.getElementByIndexElseRandom(arr, 0), 1);
    });
    it("should return the last element if we also pass the index", function () {
        assert.equal(quotes.getElementByIndexElseRandom(arr, arr.length -1), 5);
    });
});

describe("getQuotesFromJSON", function () {
    it("should return an array of 102 quote", function () {
        assert.equal(quotes.getQuotesFromJSON().length, 102);
    });
    it("first quote in the array's author shold be Kevin Kruse", function () {
        assert.equal(quotes.getQuotesFromJSON()[0].author, 'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function () {
    it('should return a quote object with an authro and text property', function () {
        var quote = quotes.getQuoteFromJSON();
        assert.isDefined(quote.text);
        assert.isDefined(quote.author);
    });
    it('should return a random quote if index not specified', function () {
        assert.include(quotes.getQuotesFromJSON(), quotes.getQuoteFromJSON());
    });
    it('should return the first quote if we pass 0', function () {
        var quote = quotes.getQuoteFromJSON(0);
        assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being");
        assert.equal(quote.author, 'Kevin Kruse');
    });
});

// quotes collection should be called quotes
describe('seed', function () {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function (done) {
        quotes.seed(function (err, seeded) {
           if (err) return done(err);
           assert.isTrue(seeded);
           done(); 
        });
    });
    it('should have populated the quotes collection with 102 document', function (done) {
        db.db().collection('quotes').find({}).toArray(function (err, quotes) {
            if (err) return done(err);
            assert.equal(quotes.length, 102);
            done(); 
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function (done) {
        quotes.seed(function (err, seeded) {
           if (err) return done(err);
           assert.isFalse(seeded);
           done(); 
        });
    });
    it('should not seed db again if db is not empty quotes collection should remain 102', function (done) {
        db.db().collection('quotes').find({}).toArray(function (err, quotes) {
            if (err) return done(err);
            assert.equal(quotes.length, 102);
            done(); 
        });
    });
});

describe('getQuotesFromDB', function () {
    it('should return all quote documents in the database', function (done) {
        quotes.getQuotesFromDB(function (err, quotes) {
            if (err) return done(err);
            assert.equal(quotes.length, 102);
            done(); 
        });
    });
});

describe('getQuoteFromDB', function () {
    it('should return a random quote document', function (done) {
        quotes.getQuotesFromDB(function (err, quotes) {
            if (err) return done(err);
            quotes.getQuoteFromDB(function (err, quote) {
                if (err) return done(err);
                assert.include(quotes, quote);
                done();
            });
        });
    });
    it('should return the first quote if passed 0 after callback', function (done) {
        quotes.getQuotesFromDB(function (err, quotes) {
            if (err) return done(err);
            quotes.getQuoteFromDB(function (err, quote) {
                if (err) return done(err);
                assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being");
                assert.equal(quote.author, 'Kevin Kruse');
                done();
            }, 0);
        });
    });
});