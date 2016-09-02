const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const middle = require('./../middleman.js');
const config = require('./config');

 app.use(bodyParser.json());
 var port = config.port;

function start() {
    app.listen(3000, () => {
         console.log(`Server listening on port ${port}!`);
    });
}
function activate() {
    app.post('/', (request, response) => {

        middle.search(request, response);
    });
}
module.exports = {
    start: start,
    activate: activate
}