"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateDocs;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("./logger"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROPS_DIR = _constants.default.PROPS_DIR;
/**
 * grab all Dirs inside the src
 * @param  {[type]} srcpath [description]
 * @return {[type]}         [description]
 */

function getDirectories(srcpath) {
  return _fsExtra.default.readdirSync(srcpath).filter(function (file) {
    return _fsExtra.default.statSync(_path.default.join(srcpath, file)).isDirectory();
  });
}
/**
 * generate docs for all components
 * @param  {[type]} srcFiles src file Dir to search for components
 */


function generateDocs(srcFiles) {
  var mainFolderPath = srcFiles;
  var allComponents = getDirectories(mainFolderPath);

  _logger.default.info("Generating docs from ".concat(srcFiles)); // logger.info( allComponents );


  var reactDocs = require('react-docgen');

  return new Promise(function (resolve, reject) {
    _fsExtra.default.mkdirsSync(PROPS_DIR);

    _logger.default.info("Generating docs to ".concat(PROPS_DIR));

    allComponents.map(function (component) {
      var thePath = _path.default.resolve(mainFolderPath, component);

      var indexPath = "".concat(thePath, "/index.jsx");
      var dataString = '';
      var writingTo = "".concat(PROPS_DIR, "/").concat(component, "-props.json");

      try {
        dataString = _fsExtra.default.readFileSync(indexPath, 'utf8');
        var componentInfo = reactDocs.parse(dataString);

        _fsExtra.default.writeJsonSync(writingTo, componentInfo);

        _logger.default.verbose("".concat(writingTo, " written"));
      } catch (error) {
        _logger.default.warn('no index file for folder: ', component);
      }
    });

    _logger.default.info('Prop docs generated');

    resolve();
  });
}
//# sourceMappingURL=docgen.js.map