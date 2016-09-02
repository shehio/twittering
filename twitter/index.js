'use strict';
const Twit = require('twit');
const config = require('./config');
const twitter = new Twit(config);


/**
 * literals: self-explanatory
 */
const created_at = 'created_at';
const hashtags = 'hashtags';
const entities = 'entities';
const text = 'text';
const defaultRadius = 1;
const distanceUnit = 'mi';
const latitude = 'latitude';
const longitude = 'longitude';
const resource = 'search/tweets';
 /**
  *  Maximum 100, check: https://dev.twitter.com/rest/reference/get/search/tweets
  */
const count = 100;

/**
 *  Get the tweets stream from twitter for a certain query, in a certain point on the map, spanning a certain area, by a predifined radius.
 *  @param {string} query - searching query.
 *  @param {json} coordinates - contains the longitude, and the latitude for the place. 
 *  @returns {promise} promise - contains the stream of tweets.
 */

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

/**
 *  Operates extractFeatures (preprocessing) on every tweet in the collection of tweets.
 *  @param {array}  tweets - contains tweets.
 *  @returns {array} collection -  contains the preprocced tweets.
 */

function extractAll(tweets) {  
    var collection = new Array();
    tweets.forEach(function(tweet) { 
        collection.push(extractFeatures(tweet));
    });
    return collection;
 }
 
/**
 *  Preprocess an individual tweet.
 *  @param {object} tweet - a tweet as returned by twitter's API
 *  @returns {object} features - only subsets needed of the tweet json.
 */

function extractFeatures(tweet) {
    var features = {};
    features[created_at] = tweet[created_at];
    features[hashtags] = new Array();
    var array = tweet[entities][hashtags];
    array.forEach(function (hashtag) {
        features[hashtags].push(hashtag[text]);
    }, this);
    features[text] = tweet[text];
    return features;
}


module.exports = {
    getTweets: getTweets,
    extractAll: extractAll
}
