/**
* Function that returns default values.
* Used because Object.assign does a shallow instead of a deep copy.
* Using [].push will add to the base array, so a require will alter
* the base array output.
*/

const path = require( 'path' );

const srcPath = path.join( __dirname, '/../src' );
const dfltPort = 8000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules()
{
    return {
        rules :
        [
            {
                test : /\.css$/,
                use  : [ 'style-loader', 'css-loader' ]
            },
            {
                test : /\.(png|jpg|gif)$/,
                use  :
                [
                    {
                        loader  : 'url-loader',
                        options : { limit: 8192 }
                    }
                ]
            },
            {
                test : /\.html$/,
                use  : 'raw-loader'
            },
            {
                test : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use  :
                {
                    loader  : 'url-loader',
                    options :
                    {
                        limit    : 8192,
                        mimetype : 'image/svg+xml'
                    }
                }
            }
        ]
    };
}

module.exports =
{
    srcPath,
    publicPath : 'assets/',
    port       : dfltPort,
    getDefaultModules
};
