'use strict';
var fs = require('fs');
var chai = require('chai');
chai.should();


var _getPackageAttribute = function (attributeName) {
  var packageFileBody = fs.readFileSync('package.json', 'utf8');
  var packageFileContents = JSON.parse(packageFileBody);
  return packageFileContents[attributeName];
};

var _checkDependencyVersion = function (dependencyName, version, isDev) {
  var attributeName = isDev ? 'devDependencies' : 'dependencies';
  var dependencies = _getPackageAttribute(attributeName);

  dependencies.should.have.property(dependencyName);
  dependencies[dependencyName].should.be.equal(version);
};

var _checkNoDependency = function (dependencyName, isDev) {
  var attributeName = isDev ? 'devDependencies' : 'dependencies';
  var dependencies = _getPackageAttribute(attributeName);

  dependencies.should.not.have.property(dependencyName);
};


var checkDevDependencyVersion = function (dependencyName, version) {
  _checkDependencyVersion(dependencyName, version, true);
};

var checkNoDevDependency = function (dependencyName) {
  _checkNoDependency(dependencyName, true);
};

var checkDependencyVersion = function (dependencyName, version) {
  _checkDependencyVersion(dependencyName, version, false);
};

var checkNoDependency = function (dependencyName) {
  _checkNoDependency(dependencyName, false);
};


module.exports = {
  checkDependencyVersion: checkDependencyVersion,
  checkNoDependency: checkNoDependency,
  checkDevDependencyVersion: checkDevDependencyVersion,
  checkNoDevDependency: checkNoDevDependency
};
