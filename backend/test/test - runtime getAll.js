const { config } = require('dotenv');

var chai = require('chai');
var chaiHttp = require('chai-http');

var db = require('../db');
var server = require('../runtime');
var Bot = require('../templates/bot');
var WelcomeBot = require('../templates/welcomebot');

var assert = require('chai').assert;
var should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);

//var mongoURL = 'mongodb://141.19.142.6:27017/testdb';
var mongoURL = 'mongodb://localhost:27017/testdb';

describe.skip("### Runtime - getAll ###", function(){

  // afterEach(function(done) {
  //   db.close(function(){
  //     console.log("### afterEach: db closed")
  //   })
  //   done();
  // });

  //  returns 500 as intended
  it('/getAll without db connection', function(done) {
    db.close(function(){
      // needs some input (literally anything cuz callback n shits)
      console.log("Omae Wa Mou Shindeiru")
    });
    chai.request(server)
    .get('/getAll')
    .end(function(err, res){
      res.should.have.status(500);
      console.log("### Testlog### res.body: " + res.body)
      done();
    });
  });

  //should return 204 => if(!result) but returns 200; result is empty according to log -> 
  //how do we catch !result ?
  it.skip('/getAll with db connection and without bots', function(done) {
    db.connect(mongoURL, function(){
      chai.request(server)
      .get('/getAll')
      .end(function(err, res){
        res.should.have.status(204);
        db.get().collection('deployedBots').drop();
        done();
      });
    });
  });

// Ab hier: testen nach Deploy -> test cases that show/expect deployed bots need to be added

it('/deploy: new bot', function(done) {
  db.connect(mongoURL, function(){
    chai.request(server)
    .post('/deploy')
    .send({_id:'304', template: 'Welcome Bot'})
    .end(function(err, res){
      res.should.have.status(201);
      db.get().collection('deployedBots').drop();
      done();
    });
  })
});

  //should return 503 and not 500; returns 200 if used on existing db, 500 on non-existing db 
  // How 503 should work: -> 1.) connect to existing db, then while using a function of it, an error needs to be thrown
  it.skip('/getAll with wrong db connection and with bots', function(done) {
    db.connect('mongodb://localhost:2707/testdb', function(){
      // clear db before
      //db.get().collection('deployedBots').drop();
      // db.get().collection('deployedBots').insertOne({'_id':'8', 'template': 'Welcome Bot'})
      //db.get().collection('deployedBots').find({'_id':'300', 'template': 'Welcome Bot'});
      chai.request(server)
      .get('/getAll')
      .end(function(err, res){
        res.should.have.status(503);
        done();
      });
    });
  });

  it('/deploy: new bot', function(done) {
    db.connect(mongoURL, function(){
      chai.request(server)
      .post('/deploy')
      .send({_id:'268', template: 'Welcome Bot'})
      .end(function(err, res){
        res.should.have.status(201);
        db.get().collection('deployedBots').drop();
        done();
      });
    })
  });

  //returns 200 as intended
  it('/getAll with db connection and with bots', function(done) {
    db.connect(mongoURL, function(){
      //db.get().collection('deployedBots').drop();
      //db.get().collection('deployedBots').insertOne({'_id':'8', 'template': 'Welcome Bot'})
      //console.log("### Testlog ### db get(): " + db.get().collection('deployedBots'))
      chai.request(server)
      .get('/getAll')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

});