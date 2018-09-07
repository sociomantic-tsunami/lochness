/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint no-console:0 */


require( 'core-js/fn/object/assign' );
// const open = require( 'open' );
const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );

const getConfig = require( './webpack.config' );

const args = require( 'minimist' )( process.argv.slice( 2 ) );


// Set the correct environment
let env;
if ( args._.length > 0 && args._.indexOf( 'start' ) !== -1 )
{
    env = 'test';
}
else if ( args.env )
{
    env = args.env;
}
else
{
    env = 'dev';
}

let configToUse = getConfig(env);


new WebpackDevServer( webpack( configToUse ), configToUse.devServer )
.listen( configToUse.port, 'localhost', ( err ) =>
{
    if ( err )
{
        console.log( err );
    }
    console.log( `Listening at localhost:${configToUse.port}` );
  // console.log('Opening your system browser...');
  // open('http://localhost:' + config.port + '/webpack-dev-server/');
} );
