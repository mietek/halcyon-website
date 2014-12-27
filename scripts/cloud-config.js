'use strict';

var rawSetupSh = require('./raw!./setup.sh');
var rawSetupYml = require('./raw!./setup.yml');


exports.formatSetupSh = function (sourceUrl, envVars, command) {
  envVars = envVars || {};
  var envVarLines = Object.keys(envVars)
    .filter(function (key) {
        return key !== 'PORT';
      })
    .map(function (key) {
        return 'env ' + key + '="' + envVars[key] + '"';
      })
    .map(function (line) {
        return '\t\t' + line;
      })
    .join('\n');
  var opts = {
    bashmenotUrl: envVars['BASHMENOT_URL'],
    halcyonUrl:   envVars['HALCYON_URL'],
    appSourceUrl: sourceUrl,
    appCommand:   command,
    appPort:      envVars['PORT'] || 8080,
    monitorLife:  3600,
    monitorPort:  4040,
    envVarLines:  envVarLines
  };
  var setupSh = rawSetupSh;
  Object.keys(opts).forEach(function (key) {
      setupSh = setupSh.replace('{{' + key + '}}', opts[key] || '');
    });
  return setupSh;
};


exports.formatSetupYml = function (sourceUrl, envVars, command) {
  var setupShLines = exports.formatSetupSh(sourceUrl, envVars, command)
    .split('\n')
    .map(function (line) {
        return '      ' + line;
      })
    .join('\n');
  return rawSetupYml.replace('{{setupShLines}}', setupShLines);
};
