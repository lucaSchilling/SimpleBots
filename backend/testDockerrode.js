var dockerService = require('./dockerService')

var  config = {}
config._id = '1'
var template = 'welcomebot'

dockerService.buildImage(template, function(){
    dockerService.createContainer(config, function(){
        dockerService.start(config, function(){
        })
    })
})
