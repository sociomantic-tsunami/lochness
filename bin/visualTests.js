#! /usr/bin/env node
"use strict";

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _backstopjs = _interopRequireDefault(require("backstopjs"));

var _logger = _interopRequireDefault(require("./logger"));

var _cliArgs = _interopRequireDefault(require("./cli-args"));

var _generateConfig = _interopRequireDefault(require("./generateConfig"));

var _generateScenarios = _interopRequireDefault(require("./generateScenarios"));

var _backstopConfig = _interopRequireDefault(require("../backstop-config"));

var _docgen = _interopRequireDefault(require("./docgen"));

var _serve = _interopRequireDefault(require("./serve"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = (0, _commandLineArgs.default)(_cliArgs.default);
var config = (0, _generateConfig.default)(options);
var filter = options.visualTestFilter;
var TEST_PORT = _constants.default.TEST_PORT;

_logger.default.info("Setting up visual tests");

(0, _docgen.default)(config.resolve.alias.displayComponentsSrc).then(function () {
  var defaultComponents = config.resolve.alias.displayComponentsDefaults;
  var componentsSrc = config.resolve.alias.displayComponentsSrc;
  var baseTestUrl = "http://localhost:".concat(TEST_PORT, "/#/componentToTest/");

  if (options.filter) {
    _logger.default.info("Filtering tests for ".concat(filter));
  }

  var scenarios = (0, _generateScenarios.default)(defaultComponents, baseTestUrl, componentsSrc);
  _backstopConfig.default.scenarios = scenarios;
  (0, _serve.default)(options, true).then(function () {
    runRegressionTests(_backstopConfig.default);
  });
});

var runRegressionTests = function runRegressionTests(config) {
  (0, _backstopjs.default)(options.visualTestType, {
    filter: filter,
    config: config
  }).then(function () {
    _logger.default.info('Backstop finished. Tests pass!');

    process.exit(0);
    return Promise.resolve('done'); // test successful
  }).catch(function (e) {
    _logger.default.info('Backstop finished. Tests failed :| . Try `yarn openReport`');

    process.exit(1);
    return Promise.reject('failed'); // test failed
  });
}; // setupServer( options, true );
//# sourceMappingURL=visualTests.js.map