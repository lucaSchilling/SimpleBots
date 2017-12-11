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

describe.skip("### Runtime - setStatus ###", function () {

  it('/deploy: new bot', function (done) {
    db.connect(mongoURL, function () {
      chai.request(server)
        .post('/deploy')
        .send({name:'mhh na klar', template: 'Welcome Bot' })
        .end(function (err, res) {
          res.should.have.status(201);
          done();
        });
    })
  });

  db.connect(mongoURL, function () {
    db.get().collection('botids').findOne({ name: 'botids' }, function (err, result) {
      currentId = result.id;
      console.log("ID: " + currentId)
    })
  })
  // should return 200
  // must change the status  --> works!
  it('/setStatus status successfully change', function (done) {
    db.connect(mongoURL, function () {
      chai.request(server)
        .post('/setStatus')
        .send({ template: 'Welcome Bot', status:true, _id: (currentId+1)})
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  it('/setStatus invalid id', function (done) {
    db.connect(mongoURL, function () {
      chai.request(server)
        .post('/setStatus')
        .send({ template: 'Welcome Bot', status:true, _id: null})
        .end(function (err, res) {
          res.should.have.status(422);
          done();
        });
    });
  });

  

  it('/setStatus: no db connection', function (done) {
    db.close(function () {
      // needs some input (literally anything cuz callback n shits)
      console.log("Omae Wa Mou Shindeiru")
    });
    chai.request(runtime)
      .post('/setStatus')
      .send({ _id: '500', template: 'Welcome Bot', status: true })
      .end(function (err, res) {
        res.should.have.status(500);
        console.log("Testlog: " + res.body)
        done();
      });
  });
});