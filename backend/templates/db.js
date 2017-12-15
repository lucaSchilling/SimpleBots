var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

/**
 * Builds a connection to the requested database.
 * 
 * @param url The url and port of the MongoDB server
 * @param done Callback function
 */
exports.connect = function (url, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, function (err, db) {
    if (err) {
      return done(err);
    }

    state.db = db;
    done();
  })
}

/**
 * Returns the database reference.
 */
exports.get = function () {
  return state.db;
}

/**
 * Closes the connection to the database if it was established previously and deletes the reference.
 * 
 * @param done Callback function
 */

exports.close = function (done) {
  if (state.db) {
    state.db.close(function (err, result) {
      state.db = null;
      done(err);
    })
  }
}