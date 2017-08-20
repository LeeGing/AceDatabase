var accountSid = 'AC87ab8497d441b5219c5693557dcdbf3e'; // Your Account SID from www.twilio.com/console
var authToken = '1fb3c14268500eceeadd97ccb8bfdb70';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Order ',
    to: '+16043197832',  // Text this number
    from: '+16043591398' // From a valid Twilio number
})
.then((message) => console.log(message.sid));