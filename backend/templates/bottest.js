var welcomebot = require('./welcomebot');
var id = process.argv[2]; 
// MongoDB module
var db = require('./db');
let mongoURL ='mongodb://141.19.142.6:27017/runtimedb'

var currentConfig;
for (let j = 0; j < process.argv.length; j++){
    console.log(j + ' -> ' + process.argv[j])
}
console.log(id)

db.connect(mongoURL, function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        // Load existing bots
        return new Promise((resolve, reject) => {
         db.get().collection('deployedBots').find({}).toArray(function(err, result){
            if (err) {
                console.error(err);
                process.exit(1);
            }

            if (result) {
                for (let config of result) {
                    if(config._id===id){
                        console.log('Hallo')
                        console.log(config)
                        resolve(config)
                    }else{
                        console.log('Nicht die korrekte Config')
                    }
                }
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