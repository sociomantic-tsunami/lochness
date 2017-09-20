const path = require( 'path' );

const defaultSettings = require( './defaults' );
const CONSTANTS = require( '../constants' );

const PROPS_DIR         = CONSTANTS.PROPS_DIR;
const DIST_DIR          = CONSTANTS.DIST_DIR;

const srcPath = defaultSettings.srcPath;
const nodeModulesPath = path.join( `${__dirname}/../node_modules` );


const displayComponentsSrc      = `${nodeModulesPath}/nessie/src`;
const displayComponentsDefaults = `${nodeModulesPath}/nessie/src/defaults.json`;

const displayComponentProps     = PROPS_DIR;

module.exports =
{
    devtool : 'eval',
    output  : {
        path       : path.join( DIST_DIR, '/assets' ),
        filename   : 'app.js',
        publicPath : defaultSettings.publicPath
    },
    externals :
    {
        'prop-types' : 'PropTypes',
        react : 'React',
        'react-dom' : 'ReactDOM',
        displayComponentsDist: 'DisplayComponents'
    },
    devServer :
    {
        contentBase        : DIST_DIR,
        historyApiFallback : false,
        hot                : true,
        port               : defaultSettings.port,
        publicPath         : defaultSettings.publicPath,
        noInfo             : false
    },
    resolve :
    {
        extensions : [ '.js', '.jsx' ],
        alias      :
        {
            actions    : `${srcPath}/actions`,
            components : `${srcPath}/components`,
            displayComponentsDefaults,
            displayComponentsSrc,
            displayComponentProps,
            helpers    : `${srcPath}/helpers`,
            sources    : `${srcPath}/sources`,
            stores     : `${srcPath}/stores`,
            styles     : `${srcPath}/styles`,
            config     : `${srcPath}/config/${process.env.REACT_WEBPACK_ENV}`,
            test       : path.join( __dirname, '/../test' )
        },
    },
    module : {}
};
