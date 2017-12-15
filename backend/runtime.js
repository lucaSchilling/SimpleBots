// Loading .env File which contains all enviroment variables with values
const { config } = require('dotenv');
// Express server module
const express = require('express');
// Body parser required for JSON parsing
const bodyParser = require('body-parser');
// Cross-origin resource sharing module
const cors = require('cors');
// File system module
const fs = require('fs');
// Docker module
const Docker = require('dockerode');
// MongoDB module
const db = require('./db');
// Dockerode Service
const dockerode = require('./dockerService');

var docker = new Docker();

var state = {
    loadedTemplates: {},
    loadedTemplateParams: {}
};

var logo = fs.readFileSync(__dirname + '/logo.txt').toString();

// Load all registered templates, build new docker image for each
var installedTemplates = JSON.parse(fs.readFileSync(__dirname + '/templates.json'));

for (key in installedTemplates) {
    let name = installedTemplates[key].fileName;
    let template = require('./templates/' + name);
    state.loadedTemplates[name] = template;
    state.loadedTemplateParams[name] = installedTemplates[key].params;
    dockerode.buildImage(name);
}

// Load config from .env
config();
var accountId = process.env.LP_ACCOUNT;
var username = process.env.LP_USER;
var password = process.env.LP_PASS;
var port = process.env.PORT;
var mongoURL = process.env.MONGOURL;

db.setUrl(mongoURL);

// Create and set up express server
var server = express();
server.use(cors());
server.use(bodyParser.json());

// Start listening
server.listen(port, function () {
    setTimeout(function () {
    console.log(logo);
    console.log('Simple Bots backend services listening on port ' + port);}, 5000)
});

// Deploys the bot into a ready state and saves it in the database. Expects valid JSON
server.post('/deploy/:user', function (req, res) {
    try {
        let user = req.params.user;
        
        // No JSON
        if (!typeof req.body === 'object' || !user) {
            res.sendStatus(400);
            return;
        }

        let template = req.body.template;

        // Invalid JSON
        if (!template || !user) {
            res.sendStatus(422);
            return;
        }

        let botClass = state.loadedTemplates[installedTemplates[template].fileName];

        // Template not installed
        if (!botClass) {
            res.sendStatus(501);
            return;
        }

        let id;
        let querry = {
            name: 'botids'
        }
        let botConfig = req.body;

        db.operate(user, function(connection) {
            // Get incremental bot id
            connection.collection('botids').findOne(querry, function (err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
    
                id = result.id + 1;
    
                botConfig._id = id + "";
                botConfig.username = user;
                botConfig.status = false;
                botConfig.lastEdit = new Date();
                
                // Write template parameters into config
                let templateParams = state.loadedTemplateParams[installedTemplates[template].fileName];

                for (let paramName in templateParams) {
                    botConfig[paramName] = templateParams[paramName];
                }
    
                let updatedId = {
                    $set: { id: id }
                }

                // Update incremental bot id
                connection.collection('botids').updateOne(querry, updatedId, function (err, result) {
                    if (err) {
                        console.error(err);
                        res.sendStatus(503);
                        return;
                    }
    
                    // Save config in database
                    connection.collection('configs').insertOne(botConfig, function (err) {
                        if (err) {
                            console.error(err);
                            res.sendStatus(503);
                            return;
                        }
    
                        console.log('Created bot ' + id + ' in database collection configs');
    
                        // Save bot config in database
                        connection.collection('deployedBots').insertOne(botConfig, function (err) {
                            if (err) {
                                console.error(err);
                                res.sendStatus(503);
                                return;
                            }
    
                            console.log('Created bot ' + id + ' in database collection deployedBots');

                            // Instantiate new bot of the specified template
                            dockerode.createContainer(botConfig);
                            
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

// Turns bots on or off. Expects valid JSON
server.post('/setStatus/:user', function (req, res) {
    try {
        let user = req.params.user;

        // No JSON
        if (!typeof req.body === 'object') {
            res.sendStatus(400);
            return;
        }

        let id = req.body._id;
        let status = req.body.status;

        // Invalid JSON
        if (!id || !user) {
            res.sendStatus(422);
            return;
        }

        let querry = {
            _id: id
        };

        let updatedStatus = {
            $set: { status: status }
        }

        // Update bot status in database
        db.operate(user, function(connection) {
            connection.collection('deployedBots').updateOne(querry, updatedStatus, function (err, result) {
                if (err) {
                    console.error(err);
                    result.sendStatus(503);
                    return;
                }
    
                console.log('Set running status of bot ' + id  + ' to ' + status);

                let dockerodeConfig = {
                    _id: id,
                    username: user
                }
        
                if (status) {
                    // Start bot
                    dockerode.start(dockerodeConfig);
                }
                else {
                    // Stop bot
                    dockerode.stop(dockerodeConfig);
                }

                res.sendStatus(200);
            });
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Deletes bot config from the config database
server.delete('/delete/:user/:id', function (req, res) {
    try {
        let id = req.params.id;
        let user = req.params.user;

        // No id or no user
        if (!id || !user) {
            res.sendStatus(400);
            return;
        }

        let querry = {
            _id: id
        }

        db.operate(user, function (connection) {
            // Find config in database
            connection.collection('configs').findOne(querry, function (err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }

                // Can't find config in database
                if (!result) {
                    res.sendStatus(404);
                    return;
                }

                // Delete from config database
                connection.collection('configs').deleteOne(querry, function (err, result) {
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

// Deletes bot from the runtime
server.delete('/undeploy/:user/:id', function (req, res) {
    try {
        let id = req.params.id;
        let user = req.params.user;

        // No id or no user
        if (!id || !user) {
            res.sendStatus(400);
            return;
        }

        let querry = {
            _id: id
        }

        db.operate(user, function (connection) {
            // Find bot in database
            connection.collection('deployedBots').findOne(querry, function (err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }

                // Can't find bot in database
                if (!result) {
                    res.sendStatus(404);
                    return;
                }

                // Delete from bot database
                connection.collection('deployedBots').deleteOne(querry, function (err, result) {
                    if (err) {
                        console.error(err);
                        res.sendStatus(503);
                        return;
                    }

                    console.log('Deleted bot ' + id + ' from database collection deployedBots');
    
                    let dockerodeConfig = {
                        _id: id,
                        username: user
                    }
    
                    dockerode.delete(dockerodeConfig);
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

// Returns all configs of the specified user that are in the database
server.get('/getConfigs/:user', function (req, res) {
    try {
        let user = req.params.user;

        // No user
        if (!user) {
            res.sendStatus(400);
            return;
        }

        db.operate(user, function(connection) {
            // Find all configs in config database
            connection.collection('configs').find({}).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
    
                // No configs found
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

// Returns all deployed bots of the specified user that are in the database
server.get('/getBots/:user', function (req, res) {
    try {
        let user = req.params.user;
        
        // No user
        if (!user) {
            res.sendStatus(400);
            return;
        }
        
        db.operate(user, function (connection) {
            // Find all deployed bots in bot database
            connection.collection('deployedBots').find({}).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    res.sendStatus(503);
                    return;
                }
    
                // No bots deployed
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

// Shutdown routine
process.on('SIGTERM', function () {
    db.close();
    for (key in installedTemplates) {
        let name = installedTemplates[key];
        dockerode.deleteImage(name);
    }
});

module.exports = server;
