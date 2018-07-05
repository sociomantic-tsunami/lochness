'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = generateDocs;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROPS_DIR = _constants2.default.PROPS_DIR;

/**
 * grab all Dirs inside the src
 * @param  {[type]} srcpath [description]
 * @return {[type]}         [description]
 */
function getDirectories(srcpath) {
    return _fsExtra2.default.readdirSync(srcpath).filter(function (file) {
        return _fsExtra2.default.statSync(_path2.default.join(srcpath, file)).isDirectory();
    });
}

/**
 * generate docs for all components
 * @param  {[type]} srcFiles src file Dir to search for components
 */
function generateDocs(srcFiles) {
    var mainFolderPath = srcFiles;
    var allComponents = getDirectories(mainFolderPath);

    _logger2.default.info('Generating docs from ' + srcFiles);
    // logger.info( allComponents );
    var reactDocs = require('react-docgen');

    return new Promise(function (resolve, reject) {
        _fsExtra2.default.mkdirsSync(PROPS_DIR);
        _logger2.default.info('Generating docs to ' + PROPS_DIR);

        allComponents.map(function (component) {
            var thePath = _path2.default.resolve(mainFolderPath, component);
            var indexPath = thePath + '/index.jsx';
            var dataString = '';

            var writingTo = PROPS_DIR + '/' + component + '-props.json';

            try {
                dataString = _fsExtra2.default.readFileSync(indexPath, 'utf8');

                var componentInfo = reactDocs.parse(dataString);
                _fsExtra2.default.writeJsonSync(writingTo, componentInfo);
                _logger2.default.verbose(writingTo + ' written');
            } catch (error) {
                _logger2.default.warn('no index file for folder: ', component);
            }
        });

        _logger2.default.info('Prop docs generated');
        resolve();
    });
}
//# sourceMappingURL=docgen.js.map