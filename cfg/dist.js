const path    = require( 'path' );

const webpack = require( 'webpack' );

const baseConfig = require( './base' );
const defaultSettings = require( './defaults' );


const config = Object.assign( {}, baseConfig, {
    entry   : path.join( __dirname, '../src/index' ),
    cache   : false,
    devtool : 'sourcemap',
    module : defaultSettings.getDefaultModules(),
    plugins :
    [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin( {
            'process.env.NODE_ENV' : '"production"'
        } ),
        new webpack.LoaderOptionsPlugin( {
            debug : false
        } )

        // new webpack.optimize.UglifyJsPlugin()
    ]
} );

// Add needed loaders to the defaults here

config.module.rules.push(
    {
        test   : /\.(js|jsx)?$/,
        loader : 'babel-loader'
    },
    {
        test : /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use  :
        {
            loader  : 'file-loader',
            options : { name: 'fonts/[name].[ext]' }
        }
    }
);

module.exports = config;
