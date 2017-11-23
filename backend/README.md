# Backend
In this Folder you will find everything about the backend of our runtime.

## Structure

/templates: here you will find all implemented bot templates like "bot.js" or "welcomebot.js"

.env: here you will find all environment variables of this project

db.js: here you will find all methods for the communication with our database like "connect" or "close"

package.json: here you will find all dependencies and other package information

runtime.js: here you will find all methods for our runtime like the restfull service points 

template.json: here you will find all implemented template names, add new templates here so the runtime uses them directly



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```