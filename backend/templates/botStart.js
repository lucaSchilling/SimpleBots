// Gets the id from the run parameters.
let id = process.argv[2];
console.log('/botStart.js 3 - id from the run parameters: ' + id)
// Gets the username from the run parameters.
let username = process.argv[3]
console.log('/botStart.js 6 - username from the run parameters: ' + username)
const db = require('./db');
var mongoURL = 'mongodb://database:27017/' + username;

db.connect(mongoURL, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        return new Promise((resolve, reject) => {
            // Gets the config for this bot.
            db.get().collection('deployedBots').findOne({ _id: id }, function (err, result) {
                if (err) {
                    console.error('/botStart.js 20 - Error: ' + err);
                }
                if (result) {
                    let config = result
                    console.log('/botStart.js 25 - Die Config für diesen Bot ist: ' + JSON.stringify(config))
                    resolve(config)
                }
                reject()
            })
        }).then(function (config) {
            // Requires the correct file for the needed template.
            let template = require('./' + config.template.replace(' ', '').toLowerCase())
            // Creates a new bot of the needed template with his config.
            let bot = new template(config.accountId, config.username, config.password, config);
            bot.start();
        }).catch(function (err) {
            console.error('/botStart.js 37 - Error: ' + err)
        })
    }
})
db.close()
