#! /usr/bin/env node
'use strict';

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _backstopjs = require('backstopjs');

var _backstopjs2 = _interopRequireDefault(_backstopjs);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _cliArgs = require('./cli-args');

var _cliArgs2 = _interopRequireDefault(_cliArgs);

var _generateConfig = require('./generateConfig');

var _generateConfig2 = _interopRequireDefault(_generateConfig);

var _generateScenarios = require('./generateScenarios');

var _generateScenarios2 = _interopRequireDefault(_generateScenarios);

var _backstopConfig = require('../backstop-config');

var _backstopConfig2 = _interopRequireDefault(_backstopConfig);

var _docgen = require('./docgen');

var _docgen2 = _interopRequireDefault(_docgen);

var _serve = require('./serve');

var _serve2 = _interopRequireDefault(_serve);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = (0, _commandLineArgs2.default)(_cliArgs2.default);
var config = (0, _generateConfig2.default)(options);
var filter = options.visualTestFilter;

var TEST_PORT = _constants2.default.TEST_PORT;

_logger2.default.info('Setting up visual tests');

(0, _docgen2.default)(config.resolve.alias.displayComponentsSrc).then(function () {
    var defaultComponents = config.resolve.alias.displayComponentsDefaults;
    var componentsSrc = config.resolve.alias.displayComponentsSrc;
    var baseTestUrl = 'http://localhost:' + TEST_PORT + '/#/componentToTest/';

    if (options.filter) {
        _logger2.default.info('Filtering tests for ' + filter);
    }

    var scenarios = (0, _generateScenarios2.default)(defaultComponents, baseTestUrl, componentsSrc);

    _backstopConfig2.default.scenarios = scenarios;

    (0, _serve2.default)(options, true).then(function () {
        runRegressionTests(_backstopConfig2.default);
    });
});

var runRegressionTests = function runRegressionTests(config) {
    (0, _backstopjs2.default)(options.visualTestType, { filter: filter, config: config }).then(function () {
        _logger2.default.info('Backstop finished. Tests pass!');
        process.exit(0);
        return Promise.resolve('done');
        // test successful
    }).catch(function (e) {
        _logger2.default.info('Backstop finished. Tests failed :| . Try `yarn openReport`');
        process.exit(1);
        return Promise.reject('failed');
        // test failed
    });
};

// setupServer( options, true );
//# sourceMappingURL=visualTests.js.map