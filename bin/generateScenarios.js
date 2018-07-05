'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DELAY = 100;
var PROPS_DIR = _constants2.default.PROPS_DIR;

var baseScene = {
    'selectorExpansion': true
};

var generateScenarios = function generateScenarios(defaults, baseUrl, componentsSrc) {
    var scenarios = [];
    var propsStartLocation = PROPS_DIR;

    var components = require(defaults);

    Object.keys(components).forEach(function (component) {

        if (components[component].lochness) {
            _logger2.default.data('lochness component, ignoring: ' + component);
            return;
        }

        var scene = Object.assign({}, baseScene);

        scene.url = baseUrl + component;
        scene.label = component;

        var camel = component.replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });

        var selector = '.lochness_testbox > *';
        scene.label = camel;
        scene.selectors = [selector];

        scenarios.push(scene);
    });

    return scenarios;
};

exports.default = generateScenarios;
//# sourceMappingURL=generateScenarios.js.map