"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _logger = _interopRequireDefault(require("./logger"));

var _webpack = _interopRequireDefault(require("../webpack.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pwd = process.cwd();

var generateConfig = function generateConfig(options) {
  var envConfig = (0, _webpack.default)(options.env);
  var configToUse = Object.assign({}, envConfig);
  var distFiles;

  if (options.dist) {
    distFiles = _path.default.resolve(options.lib, options.dist);
  } else {
    var distPath = _fs.default.readFileSync("".concat(options.lib, "/package.json"), 'utf-8');

    var mainEntry = JSON.parse(distPath).main;

    if (mainEntry) {
      distFiles = _path.default.resolve(options.lib, mainEntry);
    } else {
      distFiles = _path.default.resolve(options.lib, 'index.js');
    }
  }

  var srcFiles = _path.default.resolve(pwd, options.src);

  var jsonDefaults = _path.default.resolve(pwd, options.props);

  _logger.default.info('****************************************');

  _logger.default.info('*****  Generating Lochness Config  *****');

  _logger.default.info('****************************************');

  _logger.default.data('Using:');

  _logger.default.data('src: ', srcFiles);

  _logger.default.data('dist: ', distFiles);

  _logger.default.data('defaults: ', jsonDefaults);

  var HtmlWebpackPlugin = require('html-webpack-plugin');

  var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

  var html = new HtmlWebpackPlugin({
    title: 'LochNess: Check your UI',
    template: "".concat(__dirname, "/../src/template.ejs"),
    filename: '../index.html',
    alwaysWriteToDisk: true,
    files: {
      js: ['app.js']
    }
  });
  var hdHelper = new HtmlWebpackHarddiskPlugin();
  configToUse.plugins.push(html);
  configToUse.plugins.push(hdHelper);
  configToUse.resolve.alias.displayComponents = _path.default.resolve(pwd, options.lib);
  configToUse.externals.displayComponentsDist = options.libName;
  configToUse.resolve.alias.displayComponentsDist = distFiles;
  configToUse.resolve.alias.displayComponentsSrc = srcFiles;
  configToUse.resolve.alias.displayComponentsDefaults = jsonDefaults;
  return configToUse;
};

var _default = generateConfig;
exports.default = _default;
//# sourceMappingURL=generateConfig.js.map