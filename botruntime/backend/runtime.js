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
// Hash map module
const HashMap = require('hashmap');
// File system module
const fs = require('fs');
// MongoDB module
var db = require('./db');

// Load all registered templates
var loadedTemplates = { };
var installedTemplates = JSON.parse(fs.read(__dirname + '/templates.json'));

for (key in installedTemplates) {
    let name = installedTemplates[key];
    let template = await require('../templates/' + name);
    loadedTemplates[name] = template;
}

var state = {
    loadedBots: null,
};

config();
var accountId = process.env.LP_ACCOUNT;
var username = process.env.LP_USER;
var password = process.env.LP_PASS;
var csds = process.env.LP_CSDS;
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
        server.listen(port, function () {
            console.log('Bot Runtime listening on port ' + port);
        });
        state.loadedBots = new HashMap();
    }
});

// Bot deployment interface. Expects valid JSON bot config file
server.post('/deploy', function (req, res) {
    try {
        let id = req.body._id;
        let template = req.body.template;

        // Invalid JSON
        if (!id || !template) {
            res.sendStatus(422); 
            return;
        }

        // TODO: validate correctness of JSON file

        // Bot already exists
        if (state.loadedBots.has(id)) {
            res.sendStatus(409);
            return;
        }

        let botClass = installedTemplates[template];

        // Template not installed
        if (!botClass) {
            res.sendStatus(501);
            return;
        }

        // Save bot in database
        db.get().collection('deployedBots').insertOne(req.body, function(err, res) {
            // Can't connect to database
            if (err) {
                console.error(err);
                res.sendStatus(503);
                return;
            }

            let deployedBot = new botClass(accountId, username, password, csds);
            state.loadedBots.set(id, deployedBot);

            res.sendStatus(201);
        });

        // res.sendStatus(400); // TODO: No JSON -> Bad request
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Turns bots on or off. Expects valid JSON
server.post('/setStatus', function (req, res) {
    try {
        let id = req.body._id;
        let status = req.body.status;
        
        // Invalid JSON
        if (!id || !status) {
            res.sendStatus(422); 
            return;
        }

        let targetBot = state.loadedBots.get(id);

        // Bot does not exist
        if (!targetBot) {
            res.sendStatus(404); 
            return;
        }

        // No change
        if (status === targetBot.status) {
            res.sendStatus(200); 
            return;
        }
        // Start bot
        else if (status) {
            targetBot.start();
        }
        // Stop bot
        else {
            targetBot.shutdown();
        }

        res.sendStatus(200); 

        // res.sendStatus(400); // TODO: No JSON -> Bad request
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

// Deletes Bots from the runtime. Expects valid JSON
server.delete('/delete', function (req, res) {
    try {
        let id = req.body._id;

        // Invalid JSON
        if (!id) {
            res.sendStatus(422); 
            return;
        }

        // Get loaded bot
        let bot = state.loadedBots.get(id);

        // Bot does not exist
        if (!bot) {
            res.sendStatus(404);
            return;
        }

        // Bot running
        if (bot.isConnected) {
            res.sendStatus(403);
            return;
        }

        // Delete from hash map
        loadedBots.remove(id);

        // Delete from database
        let querry = {
            _id: id
        };

        db.get().collection('deployedBots').deleteOne(querry, function(err, obj) {
            // Can't connect to database
            if (err) {
                console.error(err);
                res.sendStatus(503);
                return;
            }
        });

        res.sendStatus(200);
        // res.sendStatus(400); // TODO: No JSON -> Bad request
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

server.get('/getAll', function(req, res) {
    try {
        let bots = db.get().collection('deployedBots').find({}).toArray(function(err, res) {
            // Can't connect to database
            if (err) {
                console.error(err);
                res.sendStatus(503);
                return;
            }
        });

        // No bots deployed
        if (!bots) {
            res.sendStatus(204);
            return;
        }

        res.status(200).send(bots);
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