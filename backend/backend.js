// Used to transform the existing callback based functions into promise based functions.
// const { promisify } = require('util');
// Loading .env File which contains all enviroment variables with values.
const { config } = require('dotenv');
// Express server module.
const express = require('express');
// Body parser required for JSON parsing.
const bodyParser = require('body-parser');
// Cross-origin resource sharing module.
const cors = require('cors');
// File system module.
const fs = require('fs');
// Docker module.
const Docker = require('dockerode');
// MongoDB module.
var db = require('./db');
// Dockerode Service.
const dockerode = require('./dockerService')

var docker = new Docker();

var state = {
    loadedTemplates: {}
};

// Load all registered templates, build new docker image for each.
var installedTemplates = JSON.parse(fs.readFileSync(__dirname + '/templates.json'));
// Load our logo from the txt file.
var logo = fs.readFileSync(__dirname + '/logo.txt').toString();

for (key in installedTemplates) {
    let name = installedTemplates[key];
    let template = require('./templates/' + name);
    state.loadedTemplates[name] = template;
    dockerode.buildImage(name)
}

config();
var accountId = process.env.LP_ACCOUNT;
var username = process.env.LP_USER;
var password = process.env.LP_PASS;
var port = process.env.PORT;
var mongoURL = process.env.MONGOURL;

var server = express();
server.use(cors());
server.use(bodyParser.json());

db.setUrl(mongoURL);

// Start listening.
server.listen(port, function () {
    setTimeout(function () {
    console.log(logo);
    console.log('/runtime.js 55 - Simple Bots backend services listening on port ' + port);}, 5000)
});

// Deploys the bot into a ready state and saves it in the database. Expects valid JSON.
server.post('/deploy/:user', function (req, res) {
    try {
        let user = req.params.user;
        console.log(user)
        // No JSON or no user.
        if (!typeof req.body === 'object' || !user) {
            res.sendStatus(400);
            return;
        }

        let template = req.body.template;

        // Invalid JSON.
        if (!template) {
            res.sendStatus(422);
            return;
        }

        let botClass = state.loadedTemplates[installedTemplates[template]];

        // Template not installed.
        if (!botClass) {
            res.sendStatus(501);
            return;
        }

        // Get incremental bot id.
        let id;
        let querry = {
            name: 'botids'
        }

        let botJson = req.body;

        db.get(user, function(connection) {
            connection.collection('botids').findOne(querry, function (err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
    
                id = result.id + 1;
    
                botJson._id = id + "";
                botJson.username = user;
                botJson.status = false;
                botJson.lastEdit = new Date();
                botJson.luisReqUrl = process.env.LUIS_REQ_URL;
                botJson.luisApiUrl = process.env.LUIS_API_URL;
                botJson.luisKey = process.env.LUIS_KEY;
                botJson.accountId = accountId;
                botJson.usernameLP = username;
                botJson.password = password;
    
                // Update incremental bot id.
                let updatedId = {
                    $set: { id: id }
                }
                
                connection.collection('botids').updateOne(querry, updatedId, function (err, result) {
                    if (err) {
                        console.error(err);
                        res.sendStatus(503);
                        return;
                    }
                    // Save bot in database.
                    connection.collection('configs').insertOne(botJson, function (err) {
                        // Can't connect to database
                        if (err) {
                            console.error(err);
                            res.sendStatus(503);
                            return;
                        }
                        console.log('/runtime.js 130 - Created bot ' + id + ' in database collection configs');
    
                        connection.collection('deployedBots').insertOne(botJson, function (err) {
                            if (err) {
                                console.error(err);
                                res.sendStatus(503);
                                return;
                            }
                            // Instantiate new bot of the specified template.
                            dockerode.createContainer(botJson);
                            console.log('/runtime.js 140 - Created bot ' + id + ' in database collection deployedBots');
                            res.sendStatus(201);
                        });
                    });
                    
                });
                
            });
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Turns bots on or off. Expects valid JSON.
server.post('/setStatus/:user', function (req, res) {
    try {
        let user = req.params.user;
        // No JSON
        if (!typeof req.body === 'object' || !user) {
            res.sendStatus(400);
            return;
        }

        let id = req.body._id;
        let status = req.body.status;
        let config = {
            _id: id,
            username: user
        }
        
        // Invalid JSON.
        if (!id) {
            res.sendStatus(422);
            return;
        }
        // Start bot.
        else if (status) {
            dockerode.start(config)
        }
        // Stop bot.
        else {
            dockerode.stop(config)
        }

        let querry = {
            _id: id
        };

        let updatedStatus = {
            $set: { status: status }
        }

        db.get(user, function(connection) {
            connection.collection('deployedBots').updateOne(querry, updatedStatus, function (err, result) {
                if (err) {
                    console.log(err);
                    result.sendStatus(503);
                    return;
                }
                console.log('/runtime.js 202 - Set running status of bot ' + id  + ' to ' + status);
                res.sendStatus(200);
            });
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Deletes bot configs from the config database.
server.delete('/delete/:user/:id', function (req, res) {
    try {
        let id = req.params.id;
        let user = req.params.user;
        // No id or no user.
        if (!id || !user) {
            res.sendStatus(400);
            return;
        }
        // Delete from database.
        let querry = {
            _id: id
        }

        db.get(user, function(connection) {
            connection.collection('configs').findOne(querry, function(err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
                if(!result) {
                    // Can't find bot in database.
                    res.sendStatus(404);
                    return;
                }
                connection.collection('configs').deleteOne(querry, function(err, result2) {
    
                    // Can't connect to database.
                    if (err) {
                        console.error(err);
                        res.sendStatus(503);
                        return;
                    }
                    console.log('Deleted bot ' + id + ' from database collection configs');
                    res.sendStatus(200);
                });
            });
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Deletes bots from the runtime.
server.delete('/undeploy/:user/:id', function (req, res) {
    try {
        let id = req.params.id;
        let user = req.params.user;

        // No id or no user.
        if (!id || !user) {
            res.sendStatus(400);
            return;
        }

        // Delete from database.
        let querry = {
            _id: id
        }

        db.get(user, function(connection) {
            connection.collection('deployedBots').findOne(querry, function(err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
                if(result === null) {
                    // Can't find bot in database.
                    res.sendStatus(404);
                    return;
                }
                connection.collection('deployedBots').deleteOne(querry, function(err, result2) {
    
                    // Can't connect to database.
                    if (err) {
                        console.error(err);
                        res.sendStatus(503);
                        return;
                    }
    
                    let dockerodeConfig = {
                        _id: id,
                        username: user
                    }
    
                    dockerode.delete(dockerodeConfig);
                    console.log('/runtime.js 304 - Deleted bot ' + id + ' from database collection deployedBots');
                    res.sendStatus(200);
                });
            });
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Returns all bot configs that are in the database.
server.get('/getConfigs/:user', function (req, res) {
    try {
        let user = req.params.user;
        // No user.
        if (!user) {
            res.sendStatus(400);
            return;
        }

        db.get(user, function(connection) {
            connection.collection('configs').find({}).toArray(function (err, result) {
                // Can't connect to database.
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
                // No configs found.
                if (!result) {
                    res.sendStatus(204);
                    return;
                }
    
                res.status(200).send(result);
            });
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Returns all deployed bots that are in the database.
server.get('/getBots/:user', function (req, res) {
    try {
        let user = req.params.user;
        // No user
        if (!user) {
            res.sendStatus(400);
            return;
        }
        
        db.get(user, function (connection) {
            connection.collection('deployedBots').find({}).toArray(function (err, result) {
                // Can't connect to database.
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
                // No bots deployed.
                if (!result) {
                    res.sendStatus(204);
                    return;
                }
                res.status(200).send(result);
            });
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Shutdown routine.
process.on('SIGTERM', function () {
    db.close();
    for (key in installedTemplates) {
        let name = installedTemplates[key];
        dockerode.deleteImage(name);
    }
});

module.exports = server;
