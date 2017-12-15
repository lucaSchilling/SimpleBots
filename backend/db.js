const MongoClient = require('mongodb').MongoClient

var mongoUrl;
var userConnections = {}

/**
 * Sets the url to connect to a mongo db server.
 */
exports.setUrl = function(mongoURL) {
  mongoUrl = mongoURL;
}

/**
 * Fetches the requested user database connection and performs a callback with the requested database as a parameter.
 * @param {string} user The name of the user database
 * @param {function} callback The callback function
 */
exports.operate = function (user, callback) {
  if (!userConnections[user]) {
    // Establish a new connection and return it
    connect(user, function(connection) {
      return callback(connection);
    });
  }
  else {
    // Return existing connection
    return callback(userConnections[user]);
  }
}
/**
 * Establishes a connection to the requested user database. If the connection is established for the first time, a botid file will be saved in the database.
 * @param {string} user The name of the user database
 * @param {function} callback The callback function
 */
connect = function (user, callback) {
  // Connect to mongo database
  MongoClient.connect(mongoUrl + user, function (err, db) {
    if (err) {
      throw err;
    }

    // Save reference to keep the open connection available
    userConnections[user] = db;

    // Find botid file
    db.collection('botids').findOne({ name: 'botids' }, function (err, result) {
      if (err) {
          throw err;
      }

      // If botid file doesn't exist, create a new one
      if (!result) {
          db.collection('botids').insertOne({ name: 'botids', id: 0 }, function (err) {
              if (err) {
                  throw err;
              }

              console.log('Created file in database: botids');
              callback(db);
          });
      }
      else {
        callback(db);
      }
    });
  });
}

/**
 * Closes the connection to all user databases that were established previously and deletes the references.
 */
exports.close = function () {
  for (let user in userConnections) {
    let connection = userConnections[user];

    // Close connection
    connection.close(function (err, result) {
      if (err) {
        throw err;
      }

      delete userConnections[user];
    });
  }
}