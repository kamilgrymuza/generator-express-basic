'use strict';
//var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
//var chalk = require('chalk');

/* istanbul ignore next */
var ifUseMocha = function (responses) {
  return responses.useMocha;
};

var ExpressBasicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      /* istanbul ignore next */
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous ExpressBasic generator!'));

    var prompts = [
      {
        name: 'appName',
        message: 'What\'s the name of your app?',
        default: path.resolve('./').split(path.sep).pop()
      },
      {
        type: 'confirm',
        name: 'useMocha',
        message: 'Do you want to use Mocha for testing?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useIstanbul',
        message: 'Do you want to use Istanbul for coverage measurement?',
        default: true,
        when: ifUseMocha
      },
      {
        type: 'confirm',
        name: 'useBower',
        message: 'Do you want to use Bower?',
        default: false
      },
      {
        type: 'confirm',
        name: 'useGrunt',
        message: 'Do you want to use Grunt?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.useMocha = props.useMocha;
      this.useIstanbul = props.useIstanbul;
      this.useBower = props.useBower;
      this.useGrunt = props.useGrunt;
      done();
    }.bind(this));
  },

  app: function () {
    this.template(
      '_package.tpl.json',
      'package.json',
      {
        'useMocha': this.useMocha,
        'useIstanbul': this.useIstanbul,
        'useGrunt': this.useGrunt,
        'appName': this.appName,
      }
    );
    if (this.useBower) {
      this.template(
        '_bower.tpl.json',
        'bower.json',
        {'appName': this.appName}
      );
    }
    if (this.useGrunt) {
      this.template(
        'Gruntfile.tpl.js',
        'Gruntfile.js',
        {'appName': this.appName}
      );
    }

    if (this.useMocha) {
      var testFileName = 'test/test-' + this.appName + '.js';
      this.mkdir('test');
      this.copy('test-app-name.js', testFileName);
    }
    this.copy('app.js', 'app.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ExpressBasicGenerator;
