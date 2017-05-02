const http = require('http')
const service = require('./src/')

const PORT = 8765

const srv = http.createServer(service)

srv.listen(8765, 'localhost', () => console.log(`Listening on ${PORT}`))
