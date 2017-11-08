'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pwd = process.cwd();

var PORT = _constants2.default.PORT;
// const runningInLochness = CONSTANTS.runningInLochness;
var TEST_PORT = _constants2.default.TEST_PORT;
var ASSETS_DIR = _constants2.default.ASSETS_DIR;
var DIST_DIR = _constants2.default.DIST_DIR;
var INDEX_HTML = DIST_DIR + '/index.html';
var NODE_DIR = _constants2.default.NODE_DIR;

var setupServer = function setupServer(options) {
    var test = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // TODO check if dist files exist, if not trigger build?
    var distFolder = pwd + '/' + options.componentsDist;

    _logger2.default.info('****************************************');
    _logger2.default.info('*****  Setting up Lochness Server  *****');
    _logger2.default.info('****************************************');

    var server = new _hapi2.default.Server();
    server.connection({
        host: 'localhost',
        port: test ? TEST_PORT : PORT
    });

    // const distFiles = path.resolve( pwd, options.componentsDist );
    var distFiles = DIST_DIR;

    return new Promise(function (resolve, reject) {
        server.register(_inert2.default, function (err) {
            if (err) {
                throw err;
            }

            server.route({
                method: 'GET',
                path: '/',
                handler: function handler(request, reply) {
                    _logger2.default.info(INDEX_HTML);
                    reply.file(INDEX_HTML, { confine: false });
                }
            });

            server.route({
                method: 'GET',
                path: '/assets/{param*}',
                handler: {
                    directory: {
                        path: ASSETS_DIR
                    }
                }
            });

            server.route({
                method: 'GET',
                path: '/node_modules/{param*}',
                handler: {
                    directory: {
                        path: NODE_DIR
                    }
                }
            });

            server.route({
                method: 'GET',
                path: '/displayComponents.js',
                handler: function handler(request, reply) {
                    _logger2.default.debug('Requesting:', distFolder + '/displayComponents.js');
                    reply.file(distFolder + '/displayComponents.js', { confine: false });
                }
            });

            server.route({
                method: 'GET',
                path: '/displayComponentStyles.css',
                handler: function handler(request, reply) {
                    _logger2.default.debug('Requesting:', distFolder + '/displayComponentStyles.js');
                    reply.file(distFolder + '/displayComponentStyles.css', { confine: false });
                }
            });

            server.start(function (err) {
                if (err) {
                    throw err;
                }

                _logger2.default.info('Server running at:', server.info.uri);

                resolve();
            });
        });
    });
};

exports.default = setupServer;
//# sourceMappingURL=serve.js.map