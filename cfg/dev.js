const path = require( 'path' );

const webpack = require( 'webpack' );

const baseConfig      = require( './base' );
const defaultSettings = require( './defaults' );
// const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const config = Object.assign( {}, baseConfig, {
    entry :
    [
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        path.join( __dirname, '../src/index' )
    ],
    cache   : true,
    devtool : 'eval-source-map',
    plugins :
    [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin( { debug: true } )
    ],
    module : defaultSettings.getDefaultModules()
} );


// Add needed loaders to the defaults here
config.module.rules.push(
    {
        test : /\.(js|jsx)?$/,
        use  : 'babel-loader'
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
