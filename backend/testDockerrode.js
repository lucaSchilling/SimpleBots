var dockerService = require('./dockerService')

var config = {};
config.name = 'test'
config._id = '123'
config.welcomeMessage = 'Hallo I Bims der Dockerode Bot'
config.options = [{message: 'dockerodeOption1', redirect: ''}, {message: 'dockerodeOption2', redirect: ''}]

dockerService.createContainer(config)
dockerService.start(config)
//dockerService.start(config)
//dockerService.stop(config);