'use strict';

var utils = require('utils');

var raw = {
  centos: {
    appService: require('./cloud-config/raw!./cloud-config/centos/app.service'),
    setupPartSh: require('./cloud-config/raw!./cloud-config/centos/setup.part.sh'),
    setupPartYml: require('./cloud-config/raw!./cloud-config/centos/setup.part.yml'),
    setupMonitorSocket: require('./cloud-config/raw!./cloud-config/centos/setup-monitor.socket'),
    setupMonitorService: require('./cloud-config/raw!./cloud-config/centos/setup-monitor@.service')
  },
  ubuntu: {
    appConf: require('./cloud-config/raw!./cloud-config/ubuntu/app.conf'),
    setupPartSh: require('./cloud-config/raw!./cloud-config/ubuntu/setup.part.sh'),
    setupYml: require('./cloud-config/raw!./cloud-config/ubuntu/setup.part.yml'),
    setupMonitorConf: require('./cloud-config/raw!./cloud-config/ubuntu/setup-monitor.conf')
  },
  setupMonitorSh: require('./cloud-config/raw!./cloud-config/setup-monitor.sh'),
  setupSh: require('./cloud-config/raw!./cloud-config/setup.sh'),
  setupYml: require('./cloud-config/raw!./cloud-config/setup.yml')
};


var format = {
  centos: {
    appEnvVars: function (envVars) {
      return Object.keys(envVars || {}).map(function (key) {
          return 'Environment="' + key + '=' + (envVars[key] || '') + '"';
        });
    },
    setupPartSh: function (opts) {
      return utils.format(raw.centos.setupPartSh, {
          setupMonitorLife:     opts.monitorLife
        });
    },
    setupPartYml: function (opts) {
      return utils.format(raw.centos.setupPartYml, {
          appService:           utils.indent(6, utils.format(raw.centos.appService, {
              appDescription:       opts.description,
              appPort:              opts.port,
              appEnvVars:           format.centos.appEnvVars(opts.envVars)
            })),
          setupMonitorSocket:   utils.indent(6, utils.format(raw.centos.setupMonitorSocket, {
              setupMonitorPort:     opts.monitorPort
            })),
          setupMonitorService:  utils.indent(6, raw.centos.setupMonitorService)
        });
    }
  },
  ubuntu: {
    appEnvVars: function (envVars) {
      return Object.keys(envVars || {}).map(function (key) {
          return 'env ' + key + '="' + (envVars[key] || '') + '"';
        });
    },
    setupPartSh: function (opts) {
      return utils.format(raw.ubuntu.setupPartSh, {
          setupMonitorLife:     opts.monitorLife
        });
    },
    setupPartYml: function (opts) {
      return utils.format(raw.ubuntu.setupPartYml, {
          appConf:              utils.indent(6, utils.format(raw.ubuntu.appConf, {
              appDescription:       opts.description,
              appPort:              opts.port,
              appEnvVars:           format.ubuntu.appEnvVars(opts.envVars)
            })),
          setupMonitorConf:     utils.indent(6, utils.format(raw.ubuntu.setupMonitorConf, {
              setupMonitorPort:     opts.monitorPort
            }))
        });
    }
  },
  setupEnvVars: function (envVars) {
    return Object.keys(envVars || {}).map(function (key) {
        return 'export ' + key + '=\'' + (envVars[key] || '') + '\'';
      });
  },
  setupSh: function (opts) {
    return utils.format(raw.setupSh, {
        setupEnvVars:   format.setupEnvVars(opts.envVars),
        setupPartSh:    format[opts.platform].setupPartSh(opts),
        appSourceUrl:   opts.sourceUrl,
        appCommand:     opts.command,
        appPort:        opts.port
      });
  },
  setupYml: function (opts) {
    return utils.format(raw.setupYml, {
        setupMonitorSh: utils.indent(6, raw.setupMonitorSh),
        setupPartYml:   format[opts.platform].setupPartYml(opts),
        setupSh:        utils.indent(6, format.setupSh(opts))
      });
  }
};


// TODO: Add option not to install dev tools.

exports.formatUserData = function (platform, sourceUrl, envVars, command) {
  return format.setupYml({
      platform:    platform,
      sourceUrl:   sourceUrl,
      envVars:     envVars,
      command:     command,
      description: 'Haskell on DigitalOcean app', // TODO: Use actual description.
      port:        8080, // TODO: Support custom ports.
      monitorLife: 3600,
      monitorPort: 4040
    });
};
