// Used to transform the existing callback based functions into promise based functions
// const { promisify } = require('util');
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
var db = require('./db');
// Dockerode Service
const dockerode = require('./dockerService')

var docker = new Docker();

var state = {
    loadedBots:  { },
    loadedTemplates: { }
};

// Load all registered templates
var installedTemplates = JSON.parse(fs.readFileSync(__dirname + '/templates.json'));

for (key in installedTemplates) {
    let name = installedTemplates[key];
    let template = require('./templates/' + name);
    state.loadedTemplates[name] = template;
    dockerode.buildImage(name.replace(" ", "").toLowerCase())
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

// Connect to DB and start listening
db.connect(mongoURL, function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        // Load existing bots
        db.get().collection('deployedBots').find({}).toArray(function(err, result) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            if (result) {
                for (let config of result) {
                    let botClass = state.loadedTemplates[installedTemplates[config.template]];
                    let bot = new botClass(accountId, username, password, config) 
                    state.loadedBots[config._id] = bot;
                    console.log('Created bot ' + config._id);
                    if (config.status) {
                        //console.log('Starting bot ' + config._id);
                        //bot.start(); // TODO: FIX: connection to UML always closes instantly with code 1006
                    }
                }
            }
        });

        server.listen(port, function () {
            console.log('Bot Runtime listening on port ' + port);
        });
    }
});

// Deploys the bot into a ready state and saves it in the database. Expects valid JSON bot config file
server.post('/deploy', function (req, res) {
    try {
        // No JSON
        if (!typeof req.body === 'object') {
            res.sendStatus(400);
            return;
        }

        let id = req.body._id;
        let template = req.body.template;

        // Invalid JSON
        if (!id || !template) {
            res.sendStatus(422); 
            return;
        }

        // Bot already exists
        if (state.loadedBots[id]) {
            res.sendStatus(409);
            return;
        }

        let botClass = state.loadedTemplates[installedTemplates[template]];

        // Template not installed
        if (!botClass) {
            res.sendStatus(501);
            return;
        }

        let botJson = req.body
        botJson.status = false
        
        // Save bot in database
        db.get().collection('deployedBots').insertOne(botJson, function(err) {
            // Can't connect to database
            if (err) {
                console.error(err);
                res.sendStatus(503);
                return;
            }
            
            // Instantiate new bot of the specified template
            dockerode.createContainer(botJson)

            res.sendStatus(201);
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Turns bots on or off. Expects valid JSON
server.post('/setStatus', function (req, res) {
    try {
        // No JSON
        if (!typeof req.body === 'object') {
            res.sendStatus(400);
            return;
        }

        let id = req.body._id;
        let status = req.body.status;
        let config = {
            _id: id
        }
        
        // Invalid JSON
        if (!id) {
            res.sendStatus(422); 
            return;
        }
        // Start bot
        else if (status) {
            dockerode.start(config)
        }
        // Stop bot
        else {
            dockerode.stop(config)
        }

        let querry = {
            _id: id
        };

        let updatedStatus = {
            $set: { status: status }
        }

        db.get().collection('deployedBots').updateOne(querry, updatedStatus, function(err, res) {
            if (err) {
                console.log(err);
                res.sendStatus(503);
                return;
            }
        });

        res.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Deletes bots from the runtime. Expects valid JSON
server.delete('/delete/:id', function (req, res) {
    try {
        let id = req.params.id;
        let config = {
            _id: id
        }
        // No id
        if (!id) {
            res.sendStatus(400);
            return;
        }

        // Delete from loaded bots
        delete state.loadedBots[id];

        // Delete from database
        let querry = {
            _id: id
        };
        dockerode.delete(config)
        db.get().collection('deployedBots').deleteOne(querry, function(err, obj) {
            // Can't connect to database
            if (err) {
                console.error(err);
                res.sendStatus(503);
                return;
            }
        });

        res.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Returns all bot configs that are in the database
server.get('/getAll', function(req, res) {
    try {
        db.get().collection('deployedBots').find({}).toArray(function(err, result) {
            // Can't connect to database
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
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Shutdown routine
process.on('SIGTERM', function() {
    db.close();
})