const { config } = require('dotenv');

var chai = require('chai');

var db = require('../db');
var server = require('../runtime');
var Bot = require('../templates/bot');
var WelcomeBot = require('../templates/welcomebot');

var assert = require('chai').assert;
var should = require('chai').should;
var expect = require('chai').expect;

// config();
// var accountId = process.env.LP_ACCOUNT;
// var username = process.env.LP_USER;
// var password = process.env.LP_PASS;
// var csds = process.env.LP_CSDS;
// var port = process.env.PORT;
// var mongoURL = process.env.MONGOURLTEST;

// Test database
var mongoURL = 'mongodb://localhost:27017/testdb';

describe('Database', function() {
    describe('db.connect', function() {
        // // Connect to test-database
        // beforeEach(function() {
        //     db.connect(mongoURL);
        // });

        // // Close connection to database
        // afterEach(function(){ 
        //     db.close();
        // });

        it('db.get() should be undefined before connecting', function() {
            assert.equal(db.get(), null);
        });
        it('db.get() should not be undefined after connecting', function() {
            db.connect(mongoURL);
            assert.notEqual(db.get(), null);
        });
    });
    describe('db.close()', function() {
        it('db.get() should be the same after using db.close() without a connected db', function() {
            let temp = db.get();
            db.close();
            assert.equal(temp, db.get());
        });
        it('db.get() should not be the same after using db.close() with a conencted db', function() {
            db.connect(mongoURL);
            let temp = db.get();
            db.close();
            assert.notEqual(temp, db.get());
        });
    });
});