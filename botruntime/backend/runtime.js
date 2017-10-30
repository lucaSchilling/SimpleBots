const { Agent } = require('node-agent-sdk');
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

var db = require('./db');

var state = {
    loadedBots: null,
}

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
        let botConfig = req.body.botConfig;
        let template = req.body.template;

        // Invalid JSON
        if (!id || !botConfig || !template) {
            res.sendStatus(422); 
            return;
        }

        // TODO: validate correctness of JSON file

        // Bot already exists
        if (state.loadedBots.has(id)) {
            res.sendStatus(409);
            return;
        }

        // Save bot in database
        db.get().collection('runningBots').insertOne(req.body, function(err, res) {
            // Can't connect to database
            if (err) {
                console.error(err);
                res.sendStatus(503);
                return;
            }

            let deployedBot = new Bot(new Agent({ accountId: accountId, username: username, password: password, csdsDomain: csds }));
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
            targetBot = new Bot(new Agent({ accountId: accountId, username: username, password: password, csdsDomain: csds })); // TODO: static factory for bots?
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
        // TODO: delete bot
        res.sendStatus(200);
        // res.sendStatus(400); // TODO: No JSON -> Bad request
        // res.sendStatus(403); // TODO: Bot running -> forbidden
        // res.sendStatus(404); // TODO: Bot does not exist -> Not found
        // res.sendStatus(422); // TODO: Invalid JSON -> Unprocessable entity
        // res.sendStatus(503); // TODO: Can't connect to database
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

server.get('/getAll', function(req, res) {
    try {
        let bots = db.get().collection('runningBots').find({}).toArray(function(err, res) {
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