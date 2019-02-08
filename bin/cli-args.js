"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionDefinitions = [{
  name: 'libName',
  alias: 'n',
  type: String
}, {
  name: 'lib',
  alias: 'l',
  type: String,
  defaultValue: './'
}, {
  name: 'src',
  alias: 's',
  type: String,
  defaultValue: 'src'
}, {
  name: 'dist',
  alias: 'd',
  type: String
}, {
  name: 'env',
  alias: 'e',
  type: String,
  defaultValue: 'dev'
}, {
  name: 'props',
  alias: 'j',
  type: String,
  defaultValue: _path.default.resolve(__dirname, '../defaults.json')
}, {
  name: 'visualTestType',
  alias: 't',
  type: String,
  defaultValue: 'test' // 'test' or 'reference' or 'accept'

}, {
  name: 'visualTestFilter',
  alias: 'f',
  type: String,
  defaultValue: '' // subset of components to test

}];
var _default = optionDefinitions;
exports.default = _default;
//# sourceMappingURL=cli-args.js.map