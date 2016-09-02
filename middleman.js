'use strict;'
const twitter = require('./twitter');
const geo = require('./geo');

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