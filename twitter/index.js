'use strict';
var Twit = require('twit');
var config = require('./config');
var twitter = new Twit(config);
var defaultRadius = 1;
var distanceUnit = 'mi';

 /**
  *  Maximum 100, check: https://dev.twitter.com/rest/reference/get/search/tweets
  */
const count = 100;
const latitude = 'latitude';
const longitude = 'longitude';
const resource = 'search/tweets';

function getTweets(query, coordinates) {
    var geocode = coordinates[latitude] + ',' + coordinates[longitude] + ',' + defaultRadius + distanceUnit;
    var promise = twitter.get(endpoint, { q: query, geocode: geocode, count: count }, (error, data, response) =>  {
        if (error) {
            return error;
        }
        return data;
    });
    return promise;
}

function extractAll(tweets) {  
    var collection = new Array();
    tweets.forEach(function(tweet) { 
        collection.push(extractFeatures(tweet));
    });
    return collection;
 }
 

function extractFeatures(tweet) {
    var features = {};
    features['created_at'] = tweet['created_at'];
    features['hashtags'] = new Array();
    var array = tweet['entities']['hashtags'];
    array.forEach(function (hashtag) {
        features['hashtags'].push(hashtag['text']);
    }, this);
    features['text'] = tweet['text'];
    return features;
}


module.exports = {
    getTweets: getTweets,
    extractAll: extractAll
}
