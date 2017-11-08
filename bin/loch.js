#! /usr/bin/env node
'use strict';

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _cliArgs = require('./cli-args');

var _cliArgs2 = _interopRequireDefault(_cliArgs);

var _serve = require('./serve');

var _serve2 = _interopRequireDefault(_serve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = (0, _commandLineArgs2.default)(_cliArgs2.default);

(0, _serve2.default)(options);
//# sourceMappingURL=loch.js.map