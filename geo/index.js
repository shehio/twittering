
'use strict';
const NodeGeocoder = require('node-geocoder');
const config = require('./config');
const provider = 'google';
const latitude = 'latitude';
const longitude = 'longitude';

var options = {
    provider: provider,
    apiKey: config.apiKey
};

var geocoder = NodeGeocoder(options);
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
 *  extract the most important city (the first one).
 *  todo: throw an exception if the city is ambiguous.
 */
function extractCoords(city) {
    city = city.shift();
    return { latitude: city[latitude], longitude: city[longitude] };
}

module.exports = {
    cityToCoords: cityToCoords,
    extractCoords: extractCoords
}