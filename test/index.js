'use strict;'
const middleman = require('./../middleman.js');
const server = require('./../server');
const geo = require('./../geo');
const twitter = require('./../twitter');
const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');

var app = null;

/**
 *  Writing endless tests can be time-consuming, and counterproductive sometimes.
 *  We write tests that make sense.
 */


/**
 *  server suite
 */
describe('server: ', () => {
    before(() => { console.log('starting the server, activating paths before the tests.'); server.start(); app = server.activate(); });
    /**
     * @todo: figure a way to kill the server other than the trivial process.exit()
     */
    // after(() => { console.log('killing the server after the tests. '); server.stop(); });
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
    const city = 'san francisco';
    const latitude = 37.7749295;
    const longitude = -122.4194155;
    /**
     * subtly, it's testing the module, but in a sense, it still testing the function.
     */
    it('tests cityToCoords function', (done) => {
        geo.cityToCoords(city).
            then((response) => {
                expect(response).to.be.a('Array');
                done();
            });
    });

    it('tests cityToCoords function', (done) => {
        geo.cityToCoords(city).
            then((retrieved) => geo.extractCoords(retrieved)).
            then((retrieved) => {
                assert.equal(retrieved.latitude, latitude);
                assert.equal(retrieved.longitude, longitude);
                done();
            });
    });

});

/**
 *  index suite
 */
describe('index: ', () => {


});

/**
 *  middleman suite
 */
describe('middleman: ', () => {


});