'use strict';

/* global describe, it*/

var chai = require('chai');
chai.should();
chai.use(require('chai-http'));

var app = require('../app');

describe('My express app', function () {

  it('should reply with Hello World! at /', function (done) {
    chai.request(app.app).get('/').res(function (res) {

      res.should.have.status(200);
      res.body.should.be.deep.equal({'data': 'Hello World!'});

      done();
    });
  });

});
