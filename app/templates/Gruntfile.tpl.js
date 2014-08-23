'use strict';

var path = require('path');

// configuration hash is factored out for testing
var gruntConfig = {
  'express': {
    'server': {
      'options': {
        'server': path.resolve(__dirname, 'app.js')
      }
    }
  }
};

module.exports = function (grunt) {
  gruntConfig.pkg = grunt.file.readJSON('package.json');
  grunt.loadNpmTasks('grunt-express');
  grunt.registerTask('default', ['express', 'express-keepalive']);
  grunt.initConfig(gruntConfig);
  return gruntConfig;
};
