'use strict;'
const twitter = require('./twitter');
const geo = require('./geo');

/**
 *  Translates the city into coordinates using google map's api, and then use the codinates to search a certain area for a query in twitter's api.
 *  @param {object} request - POST request from the user contains the city, and the query to search for, in twitter's API.
 *  @param {object} response - Response to be sent to the user upon fulfilling the query.
 */

function search(request, response) {
    var city = request.body.city;
    var query = request.body.query;
	geo.cityToCoords(city)
	.then((city) => { return geo.extractCoords(city); })
	.then((coords) => { return twitter.getTweets(query, coords); })
	.then((tweets) => { return twitter.extractAll(tweets['data']['statuses']); })
    .then((stream) => { response.setHeader('Content-Type', 'application/json'); response.send(JSON.stringify(stream)); })
    .catch((error) => { response.send(error);})
}

module.exports = {
    search: search
}