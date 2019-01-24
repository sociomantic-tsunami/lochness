"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("./logger"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DELAY = 100;
var PROPS_DIR = _constants.default.PROPS_DIR;
var baseScene = {
  'selectorExpansion': true
};

var generateScenarios = function generateScenarios(defaults, baseUrl, componentsSrc) {
  var scenarios = [];
  var propsStartLocation = PROPS_DIR;

  var components = require(defaults);

  Object.keys(components).forEach(function (component) {
    if (components[component].lochness) {
      _logger.default.data('lochness component, ignoring: ' + component);

      return;
    }

    var scene = Object.assign({}, baseScene);
    scene.url = baseUrl + component;
    scene.label = component;
    var camel = component.replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    });
    var selector = ".lochness_testbox > *";
    scene.label = camel;
    scene.selectors = [selector];
    scenarios.push(scene);
  });
  return scenarios;
};

var _default = generateScenarios;
exports.default = _default;
//# sourceMappingURL=generateScenarios.js.map