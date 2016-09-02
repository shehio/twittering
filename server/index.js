const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const middle = require('./../middleman.js');
const config = require('./config');

app.use(bodyParser.json());
var port = config.port;

/**
 *  start the server on the appropriate port.
 */
function start() {
    var promise = app.listen(port, (error) => {
        if (error) {
            return error;
        }
        console.log(`Server listening on port ${port}!`);
        return app;
    });
    return promise;
}

/**
 *  activating the paths for the server.
 */
function activate() {
    var promise = app.post('/', (request, response) => {
        middle.search(request, response);
        return app;
    });
    return promise;
}

function stop() {
    process.exit();
}

module.exports = {
    start: start,
    activate: activate,
    stop: stop
}