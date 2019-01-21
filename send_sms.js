const accountSid = 'ACb660a753d5eff40f7332f2f87fc97af6';
const authToken = 'e4d85e8d9cd5d82e9e040b1c2a534589';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+18338536427',
     to: '+18133613402'
   })
  .then(message => console.log(message.sid))
  .done();