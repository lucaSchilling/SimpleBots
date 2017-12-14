'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BACKENDURL: process.env.BACKENDURL !== undefined ? '"' + process.env.BACKENDURL + '"' : '"http://localhost:3000"'
}
