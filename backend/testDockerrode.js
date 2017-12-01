var dockerService = require('./dockerService')

var  config = {}
config._id = '1'
config.template = 'welcomebot'

//dockerService.createContainer(config)
//dockerService.stop(config)
dockerService.start(config)
