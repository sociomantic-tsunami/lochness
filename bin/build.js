#! /usr/bin/env node
"use strict";

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _webpack = _interopRequireWildcard(require("webpack"));

var _copyfiles = _interopRequireDefault(require("copyfiles"));

var _logger = _interopRequireDefault(require("./logger"));

var _cliArgs = _interopRequireDefault(require("./cli-args"));

var _generateConfig = _interopRequireDefault(require("./generateConfig"));

var _docgen = _interopRequireDefault(require("./docgen"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var options = (0, _commandLineArgs.default)(_cliArgs.default);

var distOptions = _objectSpread({}, options, {
  env: 'dist'
});

var config = (0, _generateConfig.default)(distOptions);
var DIST_DIR = _constants.default.DIST_DIR;
var OUT_DIR = _constants.default.OUT_DIR;

_fsExtra.default.mkdirsSync(OUT_DIR);

_fsExtra.default.mkdirsSync(DIST_DIR);

(0, _docgen.default)("".concat(config.resolve.alias.displayComponentsSrc)).then(function () {
  _logger.default.info('************************************');

  _logger.default.info('*****  Starting Webpack Build  *****');

  _logger.default.info('************************************');

  _logger.default.info(" Outputting build to ".concat(OUT_DIR));

  (0, _webpack.default)(config, function (err, stats) {
    if (err || stats.hasErrors()) {
      _logger.default.error('Lochness Build Errors:');

      _logger.default.error(err); // logger does not...


      console.log(stats);
    } else {
      _logger.default.info('Lochness built');
    }
  });
});
//# sourceMappingURL=build.js.map