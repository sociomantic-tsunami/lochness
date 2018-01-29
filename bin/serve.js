'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INDEX_HTML = _constants.DIST_DIR + '/index.html';
var pwd = process.cwd();

var setupServer = function setupServer(options) {
    var test = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var distFolder = pwd + '/' + options.components + '/dist';

    _logger2.default.info('****************************************');
    _logger2.default.info('*****  Setting up Lochness Server  *****');
    _logger2.default.info('****************************************');

    var server = new _hapi2.default.Server();

    server.connection({
        host: 'localhost',
        port: test ? _constants.TEST_PORT : _constants.PORT
    });

    return new Promise(function (resolve) {
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
                        path: _constants.ASSETS_DIR
                    }
                }
            });

            server.route({
                method: 'GET',
                path: '/node_modules/{param*}',
                handler: {
                    directory: {
                        path: _constants.NODE_DIR
                    }
                }
            });

            server.route({
                method: 'GET',
                path: '/displayComponents.js',
                handler: function handler(request, reply) {
                    var displayComponentsJs = distFolder + '/displayComponents.js';

                    _logger2.default.debug('Requesting:', displayComponentsJs);
                    reply.file(displayComponentsJs, { confine: false });
                }
            });

            server.route({
                method: 'GET',
                path: '/displayComponentStyles.css',
                handler: function handler(request, reply) {
                    var displayComponentStylesCss = distFolder + '/displayComponentStyles.css';

                    _logger2.default.debug('Requesting:', displayComponentStylesCss);
                    reply.file(displayComponentStylesCss, { confine: false });
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