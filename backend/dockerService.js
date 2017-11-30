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
      console.log('creating Container: '+ config.name)
    docker.createContainer({Image: '19962711/sep-slitherin:dockerBot', CMD: ["sh", "-c", 'node bottest.js \"' + config + '\"'] , name: config._id });
    })
    console.log('created')
}

/**
 * Starts the given bot.
 *
 * @param {config} config - The bot that is to be started
 * @returns {Promise} 
 */
exports.start = function (config) {
    return new Promise((resolve) => {
      console.log(`Starting bot ${config.name} (${config._id})...`);
      const container = docker.getContainer(config._id);
      container.start();
      resolve();
    });
  };

  /**
   * Stops the given bot.
   *
   * @param {Bot} bot - The bot that is to be stopped
   * @returns {Promise} TODO
   */
  exports.stop = function (config) {
    return new Promise((resolve) => {
      console.log(`Stopping bot ${config.name} (${config._id})...`);
      const container = docker.getContainer(config._id);
      // query API for container info
      container.stop((err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log('Bot stopped');
      resolve();
    });
  };
  
  /**
   * Restarts the given bot.
   *
   * @param {config} config - The bot that is to be restarted
   * @returns {Promise} TODO
   */
  exports.restart = function (config) {
    return new Promise((resolve) => {
      console.log(`Restarting bot ${config.name} (${config._id})...`);
      this.stop(config);
      this.start(config);
      resolve();
    });
  };
  
  /**
   * Deletes Container of the given Bot.
   *
   * @param {config} config - The bot that is to be started
   * @returns {Promise} TODO
   */
  exports.delete = function (config) {
    return new Promise((resolve) => {
      console.log(config);
      console.log(`Deleting bot ${config.name} (${config._id})...`);
  
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
  