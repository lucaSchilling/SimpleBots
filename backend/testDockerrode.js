var dockerService = require('./dockerService')

var  config = {}
config._id = '1'
config.template = 'welcomebot'

dockerService.buildImage('welcomebot').then(function(){
    dockerService.createContainer(config)
})

//dockerService.start(config)
//dockerService.stop(1);