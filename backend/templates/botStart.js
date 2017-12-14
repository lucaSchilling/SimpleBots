// Gets the id from the run parameters
let id = process.argv[2];
console.log(id)
let username = process.argv[3]
console.log(username)
// MongoDB module
const db = require('./db');
var mongoURL = 'mongodb://database:27017/' + username;

db.connect(mongoURL, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        return new Promise((resolve, reject) => {
            // Gets the config for this bot
            db.get().collection('deployedBots').findOne({ _id: id }, function (err, result) {
                if (err) {
                    console.error('Error' + err);
                }

                if (result) {
                    let config = result
                    console.log('Die Config für diesen Bot ist: ' + JSON.stringify(config))
                    resolve(config)
                }
                reject()
            })
        }).then(function (config) {
            // Requires the correct file for the needed template
            let template = require('./' + config.template.replace(' ', '').toLowerCase())
            // Creates a new bot of the needed template with his config
            let bot = new template('25352227', 'christopher', '!Slytherin1g', config);
            bot.start();
            console.log('Bot gestartet')
        }).catch(function (err) {
            console.error(err)
            console.log("Promise Rejected");
        })
    }
})
db.close()
