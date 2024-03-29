const Dockerode = require('dockerode');
// Sets the socketpath correctly either for windows or for linux.
const socketPath = (process.platform === 'win32' ? '//./pipe/docker_engine' : '/var/run/docker.sock');
const docker = new Dockerode({ socketPath });

/**
 * Creates a container with the given configuration.
 * 
 * @param {config} config - config for the container as JSON
 * @param {Promise} - 
 */
exports.createContainer = function (config) {
  return new Promise((resolve) => {
    // Formats the template name so it is conform to the docker restrictions.
    let image = config.template.replace(" ", "").toLowerCase();
    // Sets the options for the creation .
    const createOptions = {
      name: `${config.username + config._id}`,
      Image: `${image}`,
      Tty: true,
      RestartPolicy: {
        Name: 'always',
        MaximumRetryCount: 0
      },
        NetworkMode: 'sepslitherin_slitherin',
      Cmd: ["sh", "-c", `node botStart.js ${config._id} ${config.username}`]
    };

    docker.createContainer(createOptions).then((container) => {
      resolve(container);
    });
  });
}

/**
 * Builds an image of the given template type.
 * 
 * @param {template} template - type for the image which will be created 
 * @param {Promise} - 
 */
exports.buildImage = function (template) {
  return new Promise((resolve) => {
    templateParsed = template.replace(" ", "").toLowerCase() 
    docker.buildImage({
      context: `./templates/`,
      src: ['Dockerfile', 'bot.js', 'botStart.js', 'db.js', templateParsed + '.js', 'package.json'],
    }, {
        t: templateParsed,
      }, (error, output) => {
        if (error) {
          console.error(error);
        }
      });
  });
}

/**
 * Starts the container belonging to the config.
 *
 * @param {config} config - The configuration of a created bot as JSON. 
 * The configuration needs to have  an _id value.
 * 
 * @returns {Promise} -
 */
exports.start = function (config) {
  return new Promise((resolve) => {
    console.log(`/dockerService.js 73 - Starting bot  (${config.username} ${config._id})...`);
    const container = docker.getContainer(config.username + config._id);
    container.start();
    resolve();
  });
};

/**
 * Stops the container belonging to the config.
 *
 * @param {Bot} config - The configuration of a created bot as JSON.
 * The configuration needs to have  an _id value.
 * 
 * @returns {Promise} -
 */
exports.stop = function (config) {
  return new Promise((resolve) => {
    console.log(`/dockerService.js 90 - Stopping bot (${config.username} ${config._id})...`);
    const container = docker.getContainer(config.username + config._id);
    // Stops the Container.
    container.stop((err) => {
      if (err) {
        console.log(err);
      }
    });
    resolve();
  });
};

/**
 * Deletes the container belonging to the config.
 *
 * @param {config} config - The configuration of a created bot as JSON.
 * The configuration needs to have  an _id value.
 * 
 * @returns {Promise} -
 */
exports.delete = function (config) {
  return new Promise((resolve) => {
    console.log(`/dockerService.js 112 - Deleting bot (${config.username} ${config._id})...`);

    const container = docker.getContainer(config.username + config._id);
    // Removes the container
        container.remove((err) => {
          if (err) {
            console.log(err);
          }
    })
    resolve();
  });
};

/**
 * Deletes the image belonging to the template
 * 
 * @param {*} template - Name of the image.
 */
exports.deleteImage = function (template) {
  return new Promise((resolve) => {
    let templateParsed = template.replace(" ", "").toLowerCase() 
    const removeOptions = {
      force: true,
      noprune: false,
    };
    let image = docker.getImage(templateParsed);
    image.remove(removeOptions, (err) => {
      if (err) {
        console.log(err);
      }
    });

  })
}


