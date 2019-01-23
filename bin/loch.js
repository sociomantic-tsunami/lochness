#! /usr/bin/env node
"use strict";

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _cliArgs = _interopRequireDefault(require("./cli-args"));

var _serve = _interopRequireDefault(require("./serve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = (0, _commandLineArgs.default)(_cliArgs.default);
(0, _serve.default)(options);
//# sourceMappingURL=loch.js.map