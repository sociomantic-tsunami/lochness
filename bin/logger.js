'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Winston CLI reference;
//
// cliConfig.levels = {
//   error: 0,
//   warn: 1,
//   help: 2,
//   data: 3,
//   info: 4,
//   debug: 5,
//   prompt: 6,
//   verbose: 7,
//   input: 8,
//   silly: 9,
// };


_winston2.default.cli();
_winston2.default.remove(_winston2.default.transports.Console);

_winston2.default.add(_winston2.default.transports.Console, {
    level: 'info',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true
});

exports.default = _winston2.default;
//# sourceMappingURL=logger.js.map