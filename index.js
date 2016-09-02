var config = require('./config.js');
var Twit = require('twit')

console.log("The bot is starting..... ");

var T = new Twit(config);
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})