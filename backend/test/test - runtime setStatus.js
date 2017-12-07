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

// var mongoURL = 'mongodb://141.19.142.6:27017/testdb';
var mongoURL = 'mongodb://localhost:27017/testdb';

describe.skip("### Runtime - setStatus ###", function(){
    
   /* should return 400 but dont know how --> is it possible to make req.body empty outside of runtime?
   * cant test with the function .send() beacause TypeError: "string" must be a string, Buffer, or ArrayBuffer
   */
   it.skip('/setStatus req.body is not a object', function(done) {
    db.connect(mongoURL, function(){
        chai.request(server)
        .post('/deploy')
        .send(2)
        .end(function(err, res){
        res.should.have.status(400);
        db.get().collection('deployedBots').drop();
        done();
        });
      });
   });

    // returns 422 as intended --> works!
    it('/setStatus invalid id', function(done) {
        db.connect(mongoURL, function(){
            db.get().collection('deployedBots').drop();
            chai.request(server)
            .post('/setStatus')
            .send({_id: null})
            .end(function(err, res){
                res.should.have.status(422);
                db.get().collection('deployedBots').drop();
                done();
            });
        });
    });

    // returns 404 as intended --> works! 
    it('/setStatus target bot does not exist', function(done) {
        db.connect(mongoURL, function(){
            chai.request(server)
            .post('/setStatus')
            .send({_id:'123', template: 'Welcome Bot'})
            .end(function(err, res){
                res.should.have.status(404);
                db.get().collection('deployedBots').drop();
                done();
            });
        });
    });

    it('/deploy: new bot', function(done) {
        db.connect(mongoURL, function(){
          chai.request(server)
          .post('/deploy')
          .send({_id:'300', template: 'Welcome Bot'})
          .end(function(err, res){
            res.should.have.status(201);
              done();
          });
        })
      });

    // should return 200 but returns 404: target bot doesn't exist --> works!
    // hier muss man auch nach deploy getestet werden, denn targetBot = state.loadedBots[id]
    it('/setStatus current status equals wanted status', function(done) {
        db.connect(mongoURL, function(){
            //db.get().collection('deployedBots').drop();
            //db.get().collection('deployedBots').insertOne({_id:'8', template: 'Welcome Bot'})
            chai.request(server)
            .post('/setStatus')
            .send({_id: '300', template: 'Welcome Bot'})
            .end(function(err, res){
                res.should.have.status(201);
                db.get().collection('deployedBots').drop();
                done();
            });
        });
    });

    // should return 503 
    it('/setStatus collection error', function(done) {
        db.connect(mongoURL, function(){
            db.get().collection('deployedBots').insertOne({_id:'998', 'template': 'Welcome Bot'})
            chai.request(server)
            .post('/deploy')
            .send({_id:'998', template: 'Welcome Bot'})
            .end(function(err, res){
            res.should.have.status(503);
            db.get().collection('deployedBots').drop();   
            done();
            });
          });
         
    });

    it('/deploy: new bot', function(done) {
        db.connect(mongoURL, function(){
          chai.request(server)
          .post('/deploy')
          .send({_id:'400', template: 'Welcome Bot'})
          .end(function(err, res){
            res.should.have.status(201);
              done();
          });
        })
      });

    // should return 200
    // must change the status  --> works!
    it('/setStatus status successfully change', function(done) {
        db.connect(mongoURL, function(){
            chai.request(server)
            .post('/setStatus')
            .send({_id:'400', template:'Welcome Bot', status:true})
            .end(function(err, res){
                res.should.have.status(200);
                console.log("### Testlog ### res.body: " + res.body)
                db.get().collection('deployedBots').drop();
                done();
            });
        });
    });

    it('/deploy: new bot', function(done) {
        db.connect(mongoURL, function(){
          chai.request(server)
          .post('/deploy')
          .send({_id:'500', template: 'Welcome Bot'})
          .end(function(err, res){
            res.should.have.status(201);
              done();
          });
        })
      });

    it('/setStatus: no db connection', function(done) {
        db.close(function(){
          // needs some input (literally anything cuz callback n shits)
          console.log("Omae Wa Mou Shindeiru")
        });
        chai.request(server)
        .post('/setStatus')
        .send({_id:'500', template: 'Welcome Bot', status:true})
        .end(function(err, res){
          res.should.have.status(500);
          console.log("Testlog: " + res.body)
            done();
        });
      });
    });