'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _webpack = require('../webpack.config');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pwd = process.cwd();

var generateConfig = function generateConfig(options) {
    var envConfig = (0, _webpack2.default)(options.env);
    var configToUse = Object.assign({}, envConfig);

    var distFiles = _path2.default.resolve(pwd, options.componentsDist || options.components);

    var srcFiles = _path2.default.resolve(pwd, options.componentsSrc || options.components + '/src');

    var jsonDefaults = _path2.default.resolve(pwd, options.showcasePropsJson);
    var componentStyles = _path2.default.resolve(pwd, options.distFiles ? options.distFiles + '/styles.css' : options.components + '/dist/styles.css');

    _logger2.default.info('****************************************');
    _logger2.default.info('*****  Generating Lochness Config  *****');
    _logger2.default.info('****************************************');
    _logger2.default.data('Using:');

    _logger2.default.data('src: ', srcFiles);
    _logger2.default.data('dist: ', distFiles);
    _logger2.default.data('defaults: ', jsonDefaults);
    _logger2.default.data('css: ', componentStyles);

    _logger2.default.info('Lochness Serving Display Components: ' + distFiles);

    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

    var html = new HtmlWebpackPlugin({
        title: 'LochNess: Check your UI',
        template: __dirname + '/../src/template.ejs',
        filename: '../index.html',
        alwaysWriteToDisk: true,
        files: {
            css: ['style.css'],
            js: ['app.js']
        }
    });

    var hdHelper = new HtmlWebpackHarddiskPlugin();

    configToUse.plugins.push(html);
    configToUse.plugins.push(hdHelper);

    // assume styles.css location for now
    configToUse.resolve.alias.displayComponents = distFiles;

    return configToUse;
};

exports.default = generateConfig;
//# sourceMappingURL=generateConfig.js.map