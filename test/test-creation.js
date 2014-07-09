/*global describe, beforeEach, it */
'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var localHelpers = require('./helpers');

describe('express-basic generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('express-basic:app', ['../../app']);
      this.app.options['skip-install'] = true;
      helpers.mockPrompt(this.app, {});
      done();
    }.bind(this));
  });

  it('should create project files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  describe('npm support', function () {

    it('should create package.json', function (done) {
      this.app.run({}, function () {
        helpers.assertFile('package.json');
        done();
      });
    });

    it('should fill package.json with correct content', function (done) {
      helpers.mockPrompt(this.app, {
        'appName': 'foo'
      });

      this.app.run({}, function () {
        var packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));

        packageJSON.should.have.property('name');
        packageJSON.name.should.be.equal('foo');

        packageJSON.should.have.property('version');
        packageJSON.version.should.be.equal('0.0.1');

        done();
      });
    });
  });

  describe('bower support', function () {

    it('should create bower.json if user chose to', function (done) {
      helpers.mockPrompt(this.app, {
        'useBower': true
      });

      this.app.run({}, function () {
        helpers.assertFile('bower.json');
        done();
      });
    });

    it('should not create bower.json if user chose not to', function (done) {
      helpers.mockPrompt(this.app, {
        'useBower': false
      });

      this.app.run({}, function () {
        helpers.assertNoFile('bower.json');
        done();
      });
    });

    it('should fill bower.json with correct content', function (done) {
      helpers.mockPrompt(this.app, {
        'useBower': true,
        'appName': 'foo'
      });

      this.app.run({}, function () {
        var bowerJSON = JSON.parse(fs.readFileSync('bower.json', 'utf8'));

        bowerJSON.should.have.property('name');
        bowerJSON.name.should.be.equal('foo');

        bowerJSON.should.have.property('version');
        bowerJSON.version.should.be.equal('0.0.1');

        done();
      });
    });
  });

  it('should include express in dependencies', function (done) {
    this.app.run({}, function () {
      localHelpers.checkDependencyVersion('express', '4.0.x');
      done();
    });
  });

  describe('mocha support', function () {

    it('should include mocha in devDependencies if user choose to',
      function (done) {
        helpers.mockPrompt(this.app, {
          'useMocha': true
        });
        this.app.run({}, function () {
          localHelpers.checkDevDependencyVersion('mocha', '1.20.x');
          done();
        });
      }
    );

    it('should not include mocha in the devDependencies if user chose not to',
      function (done) {
        helpers.mockPrompt(this.app, {
          'useMocha': false
        });
        this.app.run({}, function () {
          localHelpers.checkNoDevDependency('mocha');
          done();
        });
      }
    );
  });
});
