'use strict;'
const middleman = require('./../middleman.js');
const server = require('./../server');
const geo = require('./../geo');
const twitter = require('./../twitter');
const assert = require('assert');
var request = require('supertest');
var app = null;

/**
 *  server suite
 */
describe('server: ', () => {
    before(() => { console.log('starting the server, activating paths before the tests.'); server.start(); app = server.activate(); });
    after(() => { console.log('killing the server after the tests. '); server.stop(); });
    /**
     *  @todo: add more context
     *  -- test the body.
     *  
     */
    it('responds to /', (done) => {
        request(app)
            .post('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 *  geo suite
 */
describe('geo: ', () => {


});

/**
 *  twitter suite
 */
describe('geo: ', () => {


});

/**
 *  index suite
 */
describe('index: ', () => {


});

/**
 *  middleman suite
 */
describe('geo: ', () => {


});