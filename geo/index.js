
'use strict';
const NodeGeocoder = require('node-geocoder');
const config = require('./config');
const provider = 'google';
const latitude = 'latitude';
const longitude = 'longitude';

const options = {
    provider: provider,
    apiKey: config.apiKey
};

const geocoder = NodeGeocoder(options);
/**
 *  @todo: combine the two methods into a meaningful one.
 */

/**
 *  gets the coordinates of a city.
 *  @param {string} city - the name of the city.
 *  @returns {promise} promise - the response of the API containg the city's coordinates among other properties.
 */
function cityToCoords(city) {
    var promise = geocoder.geocode(city, function (error, response) {
        if (error) {
            return error;
        }
        return response;
    });
    return promise;
}

/**
 *  @todo: throw an exception if the city is ambiguous.
 */
/**
 * 
 *  extract the most important city (the first one).
 *  @param {string} city - the name of the city.
 *  @returns {object} - the latitude, and longitude combined in an object.
 */
function extractCoords(city) {
    city = city.shift();
    return { latitude: city[latitude], longitude: city[longitude] };
}

module.exports = {
    cityToCoords: cityToCoords,
    extractCoords: extractCoords
}