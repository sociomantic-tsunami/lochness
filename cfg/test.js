const path    = require( 'path' );

const defaultSettings   = require( './defaults' );
const baseConfig        = require( './base' );


const config = Object.assign( {}, baseConfig, {
    devtool   : 'eval',
    externals :
    {
        'cheerio'                        : 'window',
        'react/addons'                   : true,
        'react/lib/ExecutionEnvironment' : true,
        'react/lib/ReactContext'         : true
    },
    module : defaultSettings.getDefaultModules()
} );

// Add needed loaders to the defaults here
config.module.rules.push(
    {
        test    : /\.(js|jsx)$/,
        use     : 'isparta-loader',
        enforce : 'pre',
        include : path.join( __dirname, '/../src' )
    },
    {
        test    : /\.(js|jsx)?$/,
        use     : 'babel-loader',
        include : /\/src|\/test/
    },
    {
        test : /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use  : 'null-loader'
    }
);

module.exports = config;
