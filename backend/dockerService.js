/**
 * This module is responsible for storing and retrieving
 * persistent bots and interacting with them.
 *
 * @module services/
 */
const fs = require('fs');
const Dockerode = require('dockerode');

const socketPath = (process.platform === 'win32' ? '//./pipe/docker_engine' : '/var/run/docker.sock');
const docker = new Dockerode({ socketPath });

/**
 * Creates a container with the given configuration.
 * 
 * @param {config} config - config for the container
 */
exports.createContainer = function (config) {
    return new Promise((resolve) => {
      console.log(`creating Container with Template: ${config.template} (id: ${config._id})`)

      var createConfig = {
        name: `${config._id}`,
        Image: `ubuntu`,
        Tty: true,
        ENV: [`${config.template}`]
      }
      docker.listContainers({all: true}, function(err, containers) {
        console.log('ALL: ' + containers.length);
      }); 
    docker.createContainer(createConfig).then((container) => {
      container.inspect((errir, data) => {
        console.log(data);
      });
      console.log(container.containerInfo())
      resolve(container);
    });
    })
}

/**
 * Builds an Image of the given template type.
 * 
 * @param {template} template - type for the Image which will be created 
 */
exports.buildImage = function (template) {
  return new Promise((reolve) => {
console.log(`building Image ${template}...`)

var buildConfig = {
  context: './templates/',
  src: ['Dockerfile', 'bot.js', 'bottest.js', 'db.js', 'welcomebot.js', 'package.json', 'config.json']
}
docker.buildImage(buildConfig, {t: template})
})
}
/**
 * Starts the given bot.
 *
 * @param {config} config - The bot that is to be started
 * @returns {Promise} 
 */
exports.start = function (config) {
    return new Promise((resolve) => {
      console.log(`Starting bot  (${config._id})...`);
      const container = docker.getContainer(config._id);
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
      const container = docker.getContainer(config._id);
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
      this.stop(config);
      this.start(config);
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
  
      const container = docker.getContainer(config._id);
      this.stop(config);
      container.remove((err) => {
        if (err) {
          console.log(err);
        }
      });
      resolve();
    });
  };
  