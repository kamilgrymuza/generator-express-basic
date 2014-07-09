'use strict';
//var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
//var chalk = require('chalk');


var ExpressBasicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
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
        default: __dirname.split(path.sep)[-1]
      },
      {
        type: 'confirm',
        name: 'useMocha',
        message: 'Do you want to use Mocha for testing?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useBower',
        message: 'Do you want to use Bower?',
        default: false
      },
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.useMocha = props.useMocha;
      this.useBower = props.useBower;
      done();
    }.bind(this));
  },

  app: function () {
    this.template(
      '_package.tpl.json',
      'package.json',
      {
        'useMocha': this.useMocha,
        'appName': this.appName
      }
    );
    if (this.useBower) {
      this.template(
        '_bower.tpl.json',
        'bower.json',
        {'appName': this.appName}
      );
    }
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ExpressBasicGenerator;
