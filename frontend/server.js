const express = require('express')
const app = express()
// use either the .env port or 8080 as port
const port = process.env.PORT || 8080
const router = express.Router()
// set the static files location for the static html
app.use(express.static(`${__dirname}/dist`))
app.engine('.html', require('ejs').renderFile)
app.set('views', `${__dirname}/dist`)
// give the requester the correct file from our static files folder
router.get('/*', (req, res, next) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})
app.use('/', router)
app.listen(port)
console.log('App running on port', port)
