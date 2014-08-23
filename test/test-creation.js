/*global describe, beforeEach, it */
'use strict';
var fs = require('fs');
var path = require('path');
var output = require('./mute');
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
      this.app.on('start', output.mute);
      this.app.on('end', output.unmute);
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

  describe('mocha support', function () {

    it('should include test devDepencencies if user chose to use mocha',
      function (done) {
        helpers.mockPrompt(this.app, {
          'useMocha': true
        });
        this.app.run({}, function () {
          localHelpers.checkDevDependencyVersion('mocha', '1.20.x');
          localHelpers.checkDevDependencyVersion('chai', '1.9.x');
          localHelpers.checkDevDependencyVersion('chai-http', '0.4.x');
          done();
        });
      }
    );

    it('should not include test devDependencies if user chose not to use mocha',
      function (done) {
        helpers.mockPrompt(this.app, {
          'useMocha': false
        });
        this.app.run({}, function () {
          localHelpers.checkNoDevDependency('mocha');
          localHelpers.checkNoDevDependency('chai');
          done();
        });
      }
    );

    describe('example test suite', function () {

      beforeEach(function () {
        helpers.mockPrompt(this.app, {
          'appName': 'foo',
          'useMocha': true
        });
      });

      it('should create example test suite if mocha is used', function (done) {
        this.app.run({}, function () {
          helpers.assertFile('test/test-foo.js');
          helpers.assertFileContent(
            'test/test-foo.js',
            /^'use strict';\s+/
          );
          done();
        });
      });

      it('should setup Chai in the example test suite', function (done) {
        this.app.run({}, function () {
          helpers.assertFileContent(
            'test/test-foo.js',
            /var chai = require\('chai'\);\s{1}chai.should\(\);/
          );
          done();
        });
      });

      it('should setup chai-http in the example test suite', function (done) {
        this.app.run({}, function () {
          helpers.assertFileContent(
            'test/test-foo.js',
            /chai.use\(require\('chai-http'\)\);/
          );
          done();
        });
      });

      it('should provide example test', function (done) {
        this.app.run({}, function () {
          helpers.assertFileContent(
            'test/test-foo.js',
            /var app = require\('..\/app'\);/
          );
          helpers.assertFileContent(
            'test/test-foo.js',
            /describe.+\s+it.+\s+chai.request\(app\).+get.+res.+\s+.+status/
          );
          done();
        });
      });
    });
  });

  describe('grunt support', function () {

    it('should create Gruntfile if user chose to', function (done) {
      helpers.mockPrompt(this.app, {
        'useGrunt': true
      });

      this.app.run({}, function () {
        helpers.assertFile('Gruntfile.js');
        done();
      });
    });

    it('should not create Gruntfile if user chose not to', function (done) {
      helpers.mockPrompt(this.app, {
        'useGrunt': false
      });

      this.app.run({}, function () {
        helpers.assertNoFile('Gruntfile.js');
        done();
      });
    });

    it('should create Gruntfile with correct structure', function (done) {
      helpers.mockPrompt(this.app, {
        'useGrunt': true
      });

      this.app.run({}, function () {
        helpers.assertFileContent('Gruntfile.js', /^'use strict';/);
        helpers.assertFileContent(
          'Gruntfile.js',
          /var gruntConfig = {(\s|.)*};/
        );

        helpers.assertFileContent(
          'Gruntfile.js',
          /module.exports = function \(grunt\)/
        );
        helpers.assertFileContent(
          'Gruntfile.js',
          /gruntConfig.pkg = grunt.file.readJSON\('package.json'\);/
        );
        helpers.assertFileContent(
          'Gruntfile.js',
          /grunt.initConfig\(gruntConfig\)/
        );
        done();
      });
    });

    it('should not break package.json if both mocha and grunt are used',
        function (done) {
        helpers.mockPrompt(this.app, {
          'useMocha': true,
          'useGrunt': true
        });
        this.app.run({}, function () {
          localHelpers.checkPackageJsonValid();
          done();
        });
      }
    );

    describe('express task', function () {

      it('should include grunt-express in devDepencencies if grunt is used',
        function (done) {
          helpers.mockPrompt(this.app, {
            'useGrunt': true
          });
          this.app.run({}, function () {
            localHelpers.checkDevDependencyVersion('grunt-express', '1.0.x');
            done();
          });
        }
      );

      it('should include grunt-contrib-watch in devDepencencies if grunt is used',
        function (done) {
          helpers.mockPrompt(this.app, {
            'useGrunt': true
          });
          this.app.run({}, function () {
            localHelpers.checkDevDependencyVersion('grunt-contrib-watch', '0.6.x');
            done();
          });
        }
      );

      it('should not include grunt-express in devDependencies if grunt is not used',
        function (done) {
          helpers.mockPrompt(this.app, {
            'useGrunt': false
          });
          this.app.run({}, function () {
            localHelpers.checkNoDevDependency('grunt-express');
            done();
          });
        }
      );

      it('should not include grunt-contrib-watch in devDependencies if grunt is not used',
        function (done) {
          helpers.mockPrompt(this.app, {
            'useGrunt': false
          });
          this.app.run({}, function () {
            localHelpers.checkNoDevDependency('grunt-contrib-watch');
            done();
          });
        }
      );

      it('should load the "express" task if grunt is used', function (done) {
        helpers.mockPrompt(this.app, {
          'useGrunt': true
        });

        this.app.run({}, function () {
          helpers.assertFileContent(
            'Gruntfile.js', /grunt\.loadNpmTasks\('grunt-express'\);/);
          done();
        });
      });

      it('should setup the "express" task if grunt is used', function (done) {
        helpers.mockPrompt(this.app, {
          'useGrunt': true
        });

        this.app.run({}, function () {
          var gruntfile = require('./temp/Gruntfile');
          var grunt = require('grunt');
          var gruntConfig = gruntfile(grunt);
          gruntConfig.should.have.property('express');

          var express = gruntConfig.express;
          express.should.have.property('server');

          var server = express.server;
          server.should.have.property('options');
          server.options.server.should.contain('app.js');
          done();
        });
      });

      it('should make the express task the default', function (done) {
        helpers.mockPrompt(this.app, {
          'useGrunt': true
        });

        this.app.run({}, function () {
          helpers.assertFileContent(
            'Gruntfile.js',
            /grunt\.registerTask\('default', \['express', 'express-keepalive'\]\);/);
          done();
        });
      });
    });
  });

  describe('express application', function () {

    it('should include express in dependencies', function (done) {
      this.app.run({}, function () {
        localHelpers.checkDependencyVersion('express', '4.0.x');
        done();
      });
    });

    it('should create the app.js file', function (done) {
      this.app.run({}, function () {
        helpers.assertFile('app.js');
        done();
      });
    });

    it('should enforce use of strict mode in app.js', function (done) {
      this.app.run({}, function () {
        helpers.assertFileContent(
          'app.js',
          /^'use strict';\s+/
        );
        done();
      });
    });

    it('should require express in app.js file', function (done) {
      this.app.run({}, function () {
        helpers.assertFileContent(
          'app.js',
          /var express = require\('express'\);/
        );
        done();
      });
    });

    it('should create an express app in app.js file', function (done) {
      this.app.run({}, function () {
        helpers.assertFileContent(
          'app.js',
          /var app = express\(\);/
        );
        done();
      });
    });

    it('should provide example GET handler in app.js file', function (done) {
      this.app.run({}, function () {
        helpers.assertFileContent(
          'app.js',
          /app.get.+\s+res.send\(200/
        );
        done();
      });
    });

    it('should export the application from the app module', function (done) {
      this.app.run({}, function () {
        helpers.assertFileContent(
          'app.js',
          /module.exports = app;/
        );
        done();
      });
    });
  });
});
