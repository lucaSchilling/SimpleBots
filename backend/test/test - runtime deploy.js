const { config } = require('dotenv');

var chai = require('chai');
var chaiHttp = require('chai-http');

var db = require('../db');
var runtime = require('../runtime');
var Bot = require('../templates/bot');
var WelcomeBot = require('../templates/welcomebot');

var assert = require('chai').assert;
var should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);

var server = '141.19.142.6:3000';
var mongoURL = 'mongodb://141.19.142.6:27017/testdb';
//var mongoURL = 'mongodb://localhost:27017/testdb';

describe("### Runtime - deploy ###", function(){

  // returns 201 as intended
  it('/deploy: new bot', function(done) {
      chai.request(server)
      .post('/deploy')
      .send({name: 'deploy test', template: 'Welcome Bot'})
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });

  });

  // returns 501 as intended --> worked
  it.skip('/deploy: not existing template', function(done) {
      chai.request(server)
      .post('/deploy')
      .send({template: 'WelcomeBot'})
      .end(function(err, res){
        res.should.have.status(501);
        done();
      });
  });

  // returns 500 as intended --> worked
  it.skip('/deploy: no db connection', function(done) {
    db.close(function(){
      // needs some input (literally anything cuz callback n shits)
      console.log("Omae Wa Mou Shindeiru")
    });
    chai.request(runtime)
    .post('/deploy')
    .send({template: 'Welcome Bot'})
    .end(function(err, res){
      res.should.have.status(500);
        done();
    });
  });

  // returns 422 as intended --> worked
  it.skip('/deploy: invalid json', function(done) {
      chai.request(server)
      .post('/deploy')
      .end(function(err, res){
      res.should.have.status(422);
        db.get().collection('deployedBots').drop();
        done();
      });
    });
});