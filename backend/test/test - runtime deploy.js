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
var mongoURL = 'mongodb://141.19.142.6:27017/runtimedb';

var currentId;

describe.skip("### Runtime - deploy ###", function () {

  // returns 201 as intended
  it('/deploy: new bot', function (done) {
    db.connect(mongoURL, function () {
      chai.request(server)
        .post('/deploy')
        .send({ name: 'delete test', template: 'Welcome Bot' })
        .end(function (err, res) {
          res.should.have.status(201);
          done();
        });
    });
  });

  db.connect(mongoURL, function () {
    db.get().collection('botids').findOne({ name: 'botids' }, function (err, result) {
      currentId = result.id;
    })
  })

  it('/delete: should delete a bot', function (done) {
    chai.request(server)
      .delete('/delete/' + (currentId+1))
      .end(function (error, res) {
        res.should.have.status(200);
        done();
      });
  });


  // returns 501 as intended --> worked
  it('/deploy: not existing template', function (done) {
    chai.request(server)
      .post('/deploy')
      .send({ template: 'WelcomeBot' })
      .end(function (err, res) {
        res.should.have.status(501);
        done();
      });
  });

  
  // returns 500 as intended --> worked
  it('/deploy: no db connection', function (done) {
    db.close(function () {
      // needs some input (literally anything cuz callback n shits)
      console.log("Omae Wa Mou Shindeiru")
    });
    chai.request(runtime)
      .post('/deploy')
      .send({ template: 'Welcome Bot' })
      .end(function (err, res) {
        res.should.have.status(500);
        done();
      });
  });

  // returns 422 as intended --> worked
  it('/deploy: invalid json', function (done) {
    db.connect(mongoURL, function () {
      chai.request(server)
        .post('/deploy')
        .end(function (err, res) {
          res.should.have.status(422);
          //db.get().collection('deployedBots').drop();
          done();
        });
    });
  });
});