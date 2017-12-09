// reading the run argument
var id = process.argv[2]; 
// MongoDB module
var db = require('./db');
let mongoURL ='mongodb://141.19.142.6:27017/runtimedb'

db.connect(mongoURL, function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        // get config with the correct id which was given as parameter
        return new Promise((resolve, reject) => {
         db.get().collection('deployedBots').findOne({_id: id}, function(err, result){
            if (err) {
                console.error(err);
            }

            if (result) {
                var config = result
                console.log('Die Config für diesen Bot ist: ' + JSON.stringify(config))
                resolve(config)
            }
            reject()
        })
    }).then(function(config){
    // Requires the correct file for the wanted template
    var template = require('./' + config.template.replace(' ', '').toLowerCase())
    // starts a new bot of the wanted template
    var bot = new template ('25352227', 'christopher', '!Slytherin1g', config);

    bot.start();
    console.log('Bot gestartet')
    }).catch(function (err) {
    console.error(err)
    console.log("Promise Rejected");
    })
    }})
db.close()
