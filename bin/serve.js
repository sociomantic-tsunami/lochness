"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hapi = _interopRequireDefault(require("hapi"));

var _inert = _interopRequireDefault(require("inert"));

var _logger = _interopRequireDefault(require("./logger"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INDEX_HTML = "".concat(_constants.DIST_DIR, "/index.html");
var pwd = process.cwd();

var setupServer = function setupServer(options) {
  var test = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var dist = "".concat(pwd, "/").concat(options.dist);

  _logger.default.info('****************************************');

  _logger.default.info('*****  Setting up Lochness Server  *****');

  _logger.default.info('****************************************');

  var server = new _hapi.default.Server();
  server.connection({
    host: 'localhost',
    port: test ? _constants.TEST_PORT : _constants.PORT
  });
  return new Promise(function (resolve) {
    server.register(_inert.default, function (err) {
      if (err) {
        throw err;
      }

      server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {
          _logger.default.info(INDEX_HTML);

          reply.file(INDEX_HTML, {
            confine: false
          });
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
          _logger.default.debug('Requesting:', dist);

          reply.file(dist, {
            confine: false
          });
        }
      });
      server.start(function (err) {
        if (err) {
          throw err;
        }

        _logger.default.info('Server running at:', server.info.uri);

        resolve();
      });
    });
  });
};

var _default = setupServer;
exports.default = _default;
//# sourceMappingURL=serve.js.map