var MongoClient = require('mongodb').MongoClient

var mongoUrl;
var userConnections = {}

/**
 * Builds a connection to the requested database.
 * @param url The url and port of the MongoDB server
 * @param callback Callback function
 */
connect = function (user) {
    MongoClient.connect(mongoUrl + user, function (err, db) {
      if (err) {
        throw err;
      }

      userConnections[user] = db;

      db.collection('botids').findOne({ name: 'botids' }, function (err, result) {
        if (err) {
            throw err;
        }

        if (!result) {
            db.collection('botids').insertOne({ name: 'botids', id: 0 }, function (err) {
                if (err) {
                    throw err;
                }

                console.log('Created file in database: botids');
            });
        }
      });
    });
}

exports.setUrl = function(mongoURL) {
  mongoUrl = mongoURL;
}

/**
 * Returns the database reference.
 */
exports.get = function (user) {
  if (!userConnections[user]) {
    connect(user);
  }
  while (!userConnections[user]) {

  }
  
  return userConnections[user];
}

/**
 * Closes the connection to the database if it was established previously and deletes the reference.
 * @param callback Callback function
 */

exports.close = function (callback) {
  for (let user in userConnections) {
    let connection = userConnections[user];
    connection.close(function (err, result) {
      if (err) {
        return callback(err);
      }

      delete userConnections[user];
    });
  }
  
  return callback();
}