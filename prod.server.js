var express = require('express')
var config = require('./config/index')
var axios = require('axios')
var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

app.use('/api', apiRoutes)

apiRoutes.get('/', function (req, res) {
  console.log(req)
  return false
  // var url = 'http://112.74.50.149:8080/cloudrent/v1/uploadImg'
  // axios.post(url, {
  //   headers: {
  //     referer: 'http://112.74.50.149:8080/',
  //     host: '112.74.50.149:8080'
  //   },
  //   params: req.query
  // }).then((response) => {
  //   res.json(response.data)
  // }).catch((e) => {
  //   console.log(e)
  // })
})
app.use('/api', apiRoutes)
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})