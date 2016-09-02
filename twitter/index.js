'use strict';
var Twit = require('twit');
var config = require('./config');
var twitter = new Twit(config);
var defaultRadius = 1;
var mi = 'mi';
var count = 100;
var latitude = 'latitude';
var longitude = 'longitude';
var endpoint = 'search/tweets';

function getTweets(query, coordinates) {
    var geocode = coordinates[latitude] + ',' + coordinates[longitude] + ',' + defaultRadius + mi;
    var promise = twitter.get(endpoint, { q: query, geocode: geocode, count: count }, function (error, data, response) {
        if (error) {
            return error;
        }
        return data;
    });
    return promise;
}

function extractFeatures(tweet) {
    var features = {};
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
    extractFeatures: extractFeatures
}
