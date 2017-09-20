const path = require( 'path' );

const pwd = process.cwd();

const OUT_DIR = path.resolve( pwd, '.lochness' );
const DIST_DIR = path.resolve( OUT_DIR, 'dist' );
const PROPS_DIR = path.resolve( pwd, '.lochness', 'props' );

const NODE_DIR = path.resolve( pwd, 'node_modules' );
const ASSETS_DIR = path.resolve( DIST_DIR, 'assets' );
const FAVICON = path.resolve( __dirname, './src/favicon.ico' );
const INDEX = path.resolve( __dirname, './dist/index.html' );
const TEST_PORT = 8324;
const PORT = 8000;


module.exports = {
    ASSETS_DIR,
    DIST_DIR,
    FAVICON,
    INDEX,
    NODE_DIR,
    OUT_DIR,
    PROPS_DIR,
    TEST_PORT,
    PORT,
}
