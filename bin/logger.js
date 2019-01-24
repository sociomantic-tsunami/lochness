"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

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
_winston.default.cli();

_winston.default.remove(_winston.default.transports.Console);

_winston.default.add(_winston.default.transports.Console, {
  level: 'info',
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: true
});

var _default = _winston.default;
exports.default = _default;
//# sourceMappingURL=logger.js.map