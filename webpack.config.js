const path = require( 'path' );
// List of allowed environments
const allowedEnvs = [ 'dev', 'dist', 'test', 'export' ];

// Get available configurations
const configs = {
    base : require( path.join( __dirname, 'cfg/base' ) ),
    dev  : require( path.join( __dirname, 'cfg/dev' ) ),
    dist : require( path.join( __dirname, 'cfg/dist' ) ),
    test : require( path.join( __dirname, 'cfg/test' ) )
};

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig( wantedEnv )
{

    const isValid = wantedEnv &&
        wantedEnv.length > 0 && allowedEnvs.indexOf( wantedEnv ) !== -1;
    const validEnv = isValid ? wantedEnv : 'dev';

    return configs[ validEnv ];
}

module.exports = buildConfig;
