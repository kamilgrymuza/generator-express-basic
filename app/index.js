'use strict';
//var util = require('util');
//var path = require('path');
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

    var prompts = [{
      type: 'confirm',
      name: 'useMocha',
      message: 'Do you want to use Mocha for testing?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.useMocha = props.useMocha;
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.template(
        '_package.tpl.json',
        'package.json',
        {'useMocha': this.useMocha}
    );
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ExpressBasicGenerator;
