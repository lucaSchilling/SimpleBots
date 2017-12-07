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
var dbS = 'mongodb://141.19.142.6:27017/runtimedb';
//var mongoURL = 'mongodb://141.19.142.6:27017/testdb';
var mongoURL = 'mongodb://localhost:27017/testdb';

describe.skip("### Runtime - delete ###", function () {

    var currentId;
    it('/deploy: new bot', function (done) {
        db.connect(dbS, function(){   
        chai.request(server)
                .post('/deploy')
                .send({name: 'delete test', template: 'Welcome Bot'})
                .end(function (err, res) {
                    db.get().collection('botids').findOne({name: 'botids'}, function(err, result) {
                        currentId = result.id;
                    })
                    res.should.have.status(201);
                    done();
                });
            });
    });

    it('/delete: should delete a bot', function (done) {
        chai.request(server)
            .delete('/delete/' + currentId)
            .end(function (error, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('/delete: no db connection', function (done) {
        db.close(function(){
            // needs some input (literally anything cuz callback n shits)
            console.log("Omae Wa Mou Shindeiru")
          });
        chai.request(runtime)
            .delete('/delete/'+ 145)
            .end(function (error, res) {
                res.should.have.status(500);
                done();
            });
    });
});
