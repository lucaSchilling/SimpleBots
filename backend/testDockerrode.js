var dockerService = require('./dockerService')

var  config = {}
config._id = '1'
config.template = 'welcomebot'
var template = 'welcomebot'

dockerService.buildImage(template)
//console.log('built Image')
//dockerService.createContainer(config)
//console.log('created Container')
//dockerService.start(config)
//console.log('started Container')
//dockerService.delete(config)
