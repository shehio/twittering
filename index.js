'use strict;'
const twitter = require('./twitter');
const geo = require('./geo');

console.log("The bot is starting..... ");

var city = 'san francisco';
query = 'ellie';
promise = geo.cityToCoords(city);
promise = promise.then(function (city) { return geo.extractCoords(city); }, function (error) { return error; });
promise = promise.then(function (coords) { return twitter.getTweets(query, coords); }, function (error) { return arguements; });
promise = promise.then(function (tweets) { return twitter.extractFeatures(tweets['data']['statuses'][0]); }, function (error) { return arguements; });
promise.then(function (stream) { console.log(stream); }, function (error) { console.log(error); })