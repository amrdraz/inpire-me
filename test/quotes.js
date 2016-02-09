var assert = require('chai').assert;
var quotes = require('../quotes.js');
var db = require('../db.js');
var DB = null;
before(function (done) {
    db.connect().then(function (db) {
        DB = db;
        done();
    }).catch(done);
});

describe('Quotes JSON', function () {
    it('should be 102', function () {
        assert.equal(quotes.getQuotesFromJSON().length, 102);
    });
});

describe('Quotes DB', function () {
    before(db.clearDB);
    it('should do seed db if db is empty', function (done) {
        quotes.seed(function (err, seeded) {
           if (err) return done(err);
           assert.isTrue(seeded);
           done(); 
        });
    });
    it('should not seed db if db is not empty', function (done) {
        quotes.seed(function (err, seeded) {
           if (err) return done(err);
           assert.isFalse(seeded);
           done(); 
        });
    });
    it('should be 102', function (done) {
        quotes.getQuotesFromDB(function (err, quotes) {
            if (err) return done(err);
            assert.equal(quotes.length, 102);
            done(); 
        });
    });
});

describe('Quote in JSON', function () {
    it('should have a text filed', function () {
        assert.equal(quotes.getQuoteFromJSON(0).text, 'Life isn’t about getting and having, it’s about giving and being');
    });
    it('should have an author filed', function () {
        assert.equal(quotes.getQuoteFromJSON(0).author, 'Kevin Kruse');
    });
    it('should be random if index not specified', function () {
        assert.include(quotes.getQuotesFromJSON(), quotes.getQuoteFromJSON());
    });
});

describe('Quote in DB', function () {
    it('should be random', function () {
        quotes.getQuotesFromDB(function (err, quotes) {
            quotes.getQuote(function (err, quote) {
                assert.include(quotes, quote);
            });
        });
    });
});