'use strict';
var fs = require('fs');
var chai = require('chai');
chai.should();

var _getPackageDependencies = function () {
  var packageFileBody = fs.readFileSync('package.json', 'utf8');
  var packageFileContents = JSON.parse(packageFileBody);
  return packageFileContents.dependencies;
};

var checkDependencyVersion = function (dependencyName, version) {
  var dependencies = _getPackageDependencies();
  dependencies.should.have.property(dependencyName);
  dependencies[dependencyName].should.be.equal(version);
};

var checkNoDependency = function (dependencyName) {
  var dependencies = _getPackageDependencies();
  dependencies.should.not.have.property(dependencyName);
};

module.exports = {
  checkDependencyVersion: checkDependencyVersion,
  checkNoDependency: checkNoDependency
};
