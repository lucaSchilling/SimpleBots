'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BACKENDURL: process.env.BACKENDURL !== undefined ? '"' + process.env.BACKENDURL + '"' : '"http://141.19.142.6:3000"'
}
