/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var localHelpers = require('./helpers');

describe('express-basic generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('express-basic:app', [
        '../../app'
      ]);

      helpers.mockPrompt(this.app, {
        'someOption': true
      });
      this.app.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'package.json'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('lists expressjs as a dependency in package.json', function (done) {
    this.app.run({}, function () {
      localHelpers.checkDependencyVersion('express', '>4.0');
      done();
    });
  });

  describe('mocha support', function () {

    it('lists mocha as a dependency in package.json', function (done) {
      helpers.mockPrompt(this.app, {
        'useMocha': true
      });
      this.app.run({}, function () {
        localHelpers.checkDependencyVersion('mocha', '*');
        done();
      });
    });

    it('does not list mocha as a dependency if user said no', function (done) {
      helpers.mockPrompt(this.app, {
        'useMocha': false
      });
      this.app.run({}, function () {
        localHelpers.checkNoDependency('mocha');
        done();
      });
    });
  });
});
