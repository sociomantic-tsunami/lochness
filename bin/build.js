#! /usr/bin/env node
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _copyfiles = require('copyfiles');

var _copyfiles2 = _interopRequireDefault(_copyfiles);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _cliArgs = require('./cli-args');

var _cliArgs2 = _interopRequireDefault(_cliArgs);

var _generateConfig = require('./generateConfig');

var _generateConfig2 = _interopRequireDefault(_generateConfig);

var _docgen = require('./docgen');

var _docgen2 = _interopRequireDefault(_docgen);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = (0, _commandLineArgs2.default)(_cliArgs2.default);

var distOptions = _extends({}, options, { env: 'dist' });
var config = (0, _generateConfig2.default)(distOptions);

var DIST_DIR = _constants2.default.DIST_DIR;
var OUT_DIR = _constants2.default.OUT_DIR;

_fsExtra2.default.mkdirsSync(OUT_DIR);
_fsExtra2.default.mkdirsSync(DIST_DIR);

(0, _docgen2.default)(config.resolve.alias.displayComponents + '/src').then(function () {
    _logger2.default.info('************************************');
    _logger2.default.info('*****  Starting Webpack Build  *****');
    _logger2.default.info('************************************');
    _logger2.default.info(' Outputting build to ' + OUT_DIR);

    (0, _webpack2.default)(config, function (err, stats) {
        if (err || stats.hasErrors()) {
            _logger2.default.error('Lochness Build Errors:');
            _logger2.default.error(err);

            // logger does not...
            console.log(stats);
        } else {
            _logger2.default.info('Lochness built');
        }
    });
});
//# sourceMappingURL=build.js.map