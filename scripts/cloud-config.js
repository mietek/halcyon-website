'use strict';

var utils = require('utils');

var raw = {
  centos: {
    appService: require('./cloud-config/raw!./cloud-config/centos/app.service'),
    partialSetupSh: require('./cloud-config/raw!./cloud-config/centos/partial-setup.sh'),
    partialSetupYml: require('./cloud-config/raw!./cloud-config/centos/partial-setup.yml'),
    setupMonitorSocket: require('./cloud-config/raw!./cloud-config/centos/setup-monitor.socket'),
    setupMonitorService: require('./cloud-config/raw!./cloud-config/centos/setup-monitor@.service')
  },
  ubuntu: {
    appConf: require('./cloud-config/raw!./cloud-config/ubuntu/app.conf'),
    partialSetupSh: require('./cloud-config/raw!./cloud-config/ubuntu/partial-setup.sh'),
    partialSetupYml: require('./cloud-config/raw!./cloud-config/ubuntu/partial-setup.yml'),
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
    partialSetupSh: function (opts) {
      return utils.format(raw.centos.partialSetupSh, {
          setupMonitorLife: opts.monitorLife
        });
    },
    partialSetupYml: function (opts) {
      return utils.format(raw.centos.partialSetupYml, {
          appService:          utils.indent(6, utils.format(raw.centos.appService, {
              appDescription:      opts.description,
              appPort:             opts.port,
              appEnvVars:          format.centos.appEnvVars(opts.envVars)
            })),
          setupMonitorSocket:  utils.indent(6, utils.format(raw.centos.setupMonitorSocket, {
              setupMonitorPort:    opts.monitorPort
            })),
          setupMonitorService: utils.indent(6, raw.centos.setupMonitorService)
        });
    }
  },
  ubuntu: {
    appEnvVars: function (envVars) {
      return Object.keys(envVars || {}).map(function (key) {
          return 'env ' + key + '="' + (envVars[key] || '') + '"';
        });
    },
    partialSetupSh: function (opts) {
      return utils.format(raw.ubuntu.partialSetupSh, {
          setupMonitorLife: opts.monitorLife
        });
    },
    partialSetupYml: function (opts) {
      return utils.format(raw.ubuntu.partialSetupYml, {
          appConf:          utils.indent(6, utils.format(raw.ubuntu.appConf, {
              appDescription:   opts.description,
              appPort:          opts.port,
              appEnvVars:       format.ubuntu.appEnvVars(opts.envVars)
            })),
          setupMonitorConf: utils.indent(6, utils.format(raw.ubuntu.setupMonitorConf, {
              setupMonitorPort: opts.monitorPort
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
        partialSetupSh: format[opts.platform].partialSetupSh(opts),
        appSourceUrl:   opts.sourceUrl,
        appCommand:     opts.command,
        appPort:        opts.port
      });
  },
  setupYml: function (opts) {
    return utils.format(raw.setupYml, {
        setupMonitorSh:  utils.indent(6, raw.setupMonitorSh),
        partialSetupYml: format[opts.platform].partialSetupYml(opts),
        setupSh:         utils.indent(6, format.setupSh(opts))
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
