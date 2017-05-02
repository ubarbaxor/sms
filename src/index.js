const twilio = require('twilio')

const Sms = text => ( new twilio.TwimlResponse().message(text).toString() )

const service = (req, res) => {
  console.log(req.url)

  const content = Sms('Coucou ca marche !')
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')
  res.end(content)
}

module.exports = service
