var express = require('express')
// var config = require('./config/index')
// var axios = require('axios')
var port = 9020// process.env.PORT || config.build.port

var app = express()

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})