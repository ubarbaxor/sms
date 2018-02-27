const db = require('./helpers/db')

const responses = {
  default: `Hello !

Thanks for texting us =)
We are still in (very) early alpha, and you are welcome to take a sneak peek.
We'd love to hear your feedback !

Disclaimer : bugs are to be expected.
Try not to break anything.

[register, feedback, help]`
}

const parse = msg => {
  let split = msg.Body.split(' ')
  let verb = split[0].toLowerCase()
  let rest = split.slice(1)

  if (verb === 'register') {
    db.users.get( msg.From )
      .then( results => results.toArray() )
      .then( arr => arr.length
        ? 'Already registerd.'
        :  'Not yet available.')
  }
}

const route = (req, res) => {
  const msg = req.body
  console.log(`
    Incoming message
    From : ${msg.From}
    Content : ${msg.Body}`)

  res.sms( parse(msg) || responses.default )
}

module.exports = route
