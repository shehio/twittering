const express = require('express');
const app = express();
const middle = require('./../middleman.js');

function start() {
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
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