//require the needed template so we can create a bot
var welcomebot = require('./welcomebot');
// reading the run argument
var id = process.argv[2]; 
// MongoDB module
var db = require('./db');
let mongoURL ='mongodb://141.19.142.6:27017/runtimedb'

console.log(id)

db.connect(mongoURL, function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        // get config with the correct id which was given as parameter
        return new Promise((resolve, reject) => {
            //TODO: instead of find({}) find directly the needed config with find({ id: id})...
         db.get().collection('deployedBots').find({}).toArray(function(err, result){
            if (err) {
                console.error(err);
                process.exit(1);
            }

            if (result) {
                for (let config of result) {
                    if(config._id===id){
                        console.log('Die Config für diesen Bot ist: ' + config)
                        resolve(config)
                    }
                }
                console.log('alle configs durchgearbeitet')
                reject()
            }
        })
    }).then(function(config){
    console.log('versuche Bot zu starten')
    var bot = new welcomebot ('25352227', 'christopher', '!Slytherin1g', config);
    bot.start();
    console.log('Bot gestartet')
    }).catch(function () {
    console.log("Promise Rejected");
    })
    }})