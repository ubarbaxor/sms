const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

// server config
const config = {
  host: 'localhost',
  port: 8765,
}

// Build service and include middleware tools
const service = express()
service.use( bodyParser.urlencoded({ extended: false }) )
service.use( require('./src/middleware/twilio') )

// Register routes
service.use( require('./src') )

const srv = http.createServer(service)

srv.listen(config.port, config.host, err => console.log(
  err || `Listening with :`, config))
