/**
 * This module is responsible for 
 * building images, creating containers and interact with them.
 *
 * @module services/
 */
const Dockerode = require('dockerode');

const socketPath = (process.platform === 'win32' ? '//./pipe/docker_engine' : '/var/run/docker.sock');
const docker = new Dockerode({ socketPath });

/**
 * Creates a container with the given configuration.
 * 
 * @param {config} config - config for the container
 */
exports.createContainer = function(config){
return new Promise((resolve) => {
        var image = config.template.replace(" ", "").toLowerCase();
        console.log(image)
        const createOptions = {
          name: `${'b' + config._id}`,
          Image: `${image}`,
          Tty: true,
          Cmd: ["sh", "-c", `node bottest.js ${config._id}`]
        };
  
        docker.createContainer(createOptions).then((container) => {
          resolve(container);
        });
});
}

/**
 * Builds an Image of the given template type.
 * 
 * @param {template} template - type for the Image which will be created 
 */
exports.buildImage = function (template) {
  return new Promise((resolve) => {
    docker.buildImage({
      context: `./templates/`,
      src: ['Dockerfile', 'bot.js', 'bottest.js', 'db.js', 'welcomebot.js', 'faqbot.js', 'package.json'],
    }, {
      t: template,
    }, (error, output) => {
      if (error) {
        return console.error(error);
      }
    });
  });
}

/**
 * Starts the given bot.
 *
 * @param {config} config - The bot that is to be started
 * @returns {Promise} 
 */
exports.start = function (config) {
    return new Promise((resolve) => {
      console.log(`Starting bot  (b${config._id})...`);
      const container = docker.getContainer('b' + config._id);
      console.log(config)
      container.start();
      resolve();
    });
  };

  /**
   * Stops the given bot.
   *
   * @param {Bot} config - The config of the bot that is to be stopped
   * @returns {Promise} TODO
   */
  exports.stop = function (config) {
    return new Promise((resolve) => {
      console.log(`Stopping bot (${config._id})...`);
      const container = docker.getContainer('b' + config._id);
      // query API for container info
      container.stop((err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log(`Bot (${config._id}) stopped`);
      resolve();
    });
  };
  
  /**
   * Restarts the given bot.
   *
   * @param {config} config - The config f the bot that will be restarted
   * @returns {Promise} TODO
   */
  exports.restart = function (config) {
    return new Promise((resolve) => {
      console.log(`Restarting bot (${config._id})...`);
      stop(config);
      start(config);
      console.log(`Bot (${config._id}) restarted...`)
      resolve();
    });
  };
  
  /**
   * Deletes Container of the given Bot.
   *
   * @param {config} config - The config of the bot that is to be started
   * @returns {Promise} TODO
   */
  exports.delete = function (config) {
    return new Promise((resolve) => {
      console.log(`Deleting bot (${config._id})...`);
  
      const container = docker.getContainer('b' + config._id);
      // Inspects the Container to see if it is running, then stops and removes the container otherwise just removes it.
      container.inspect (function(err, data){
      if(data.State.Running === true){
        container.stop((err, output) => {
            if (err) {
              console.log(err);
            }
            container.remove((err) => {
              if (err) {
                console.log(err);
              }
            });
          });
    } else{
      container.remove((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  })
    resolve();
    });
  };
  