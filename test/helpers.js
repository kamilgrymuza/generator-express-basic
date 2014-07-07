'use strict';
var helpers = require('yeoman-generator').test;

var checkDependency = function (packageName, version) {
  var regexp = new RegExp(
      '"dependencies": {\\s+(?:"\\w+": "[\\d\\.><\\=\\*]+",)*\\s+' +
      '"' + packageName + '": ' +
      '"' + version + '"' +
      '(,\\s+)*(?:"\\w+": "[\\d\\.><\\=\\*]+"(,)*)*\\s+}');
  helpers.assertFileContent('package.json', regexp);
};

var checkNoDependency = function (packageName) {
  var regexp = new RegExp(
      '"dependencies": {\\s+(?:"\\w+": "[\\d\\.><\\=\\*]+",)*\\s+' +
      '"' + packageName + '": ' +
      '"[\\d\\.><\\=\\*]+"' +
      '(,\\s+)*(?:"\\w+": "[\\d\\.><\\=\\*]+"(,)*)*\\s+}');
  helpers.assertNoFileContent('package.json', regexp);
};

module.exports = {
  checkDependency: checkDependency,
  checkNoDependency: checkNoDependency
};
