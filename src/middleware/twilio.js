const twilio = require('twilio')

module.exports = (req, res, next) => {
  res.sms = body => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/xml')
    res.end( new twilio.TwimlResponse()
      .message(body)
      .toString() )
  }
  next()
}
