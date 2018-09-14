/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import Hapi    from 'hapi';
import inert   from 'inert';

import logger  from './logger';
import {
    ASSETS_DIR,
    DIST_DIR,
    NODE_DIR,
    PORT,
    TEST_PORT,
} from '../constants';

const INDEX_HTML = `${DIST_DIR}/index.html`;
const pwd        = process.cwd();

const setupServer = ( options, test = false ) =>
{
    const distFolder = `${pwd}/${options.components}/dist`;

    logger.info( '****************************************' );
    logger.info( '*****  Setting up Lochness Server  *****' );
    logger.info( '****************************************' );

    const server = new Hapi.Server();

    server.connection( {
        host : 'localhost',
        port : test ? TEST_PORT : PORT
    } );

    return new Promise( resolve =>
    {
        server.register( inert, ( err ) =>
        {
            if ( err )
            {
                throw err;
            }

            server.route( {
                method : 'GET',
                path   : '/',
                handler( request, reply )
                {
                    logger.info( INDEX_HTML );
                    reply.file( INDEX_HTML, { confine: false } );
                }
            } );

            server.route( {
                method  : 'GET',
                path    : '/assets/{param*}',
                handler : {
                    directory : {
                        path : ASSETS_DIR
                    }
                }
            } );


            server.route( {
                method  : 'GET',
                path    : '/node_modules/{param*}',
                handler : {
                    directory : {
                        path : NODE_DIR
                    }
                }
            } );

            server.route( {
                method : 'GET',
                path   : '/displayComponents.js',
                handler( request, reply )
                {
                    const displayComponentsJs =
                        `${distFolder}/displayComponents.js`;

                    logger.debug( 'Requesting:', displayComponentsJs );
                    reply.file( displayComponentsJs, { confine: false } );
                }
            } );

            server.route( {
                method : 'GET',
                path   : '/displayComponentStyles.css',
                handler( request, reply )
                {
                    const displayComponentStylesCss =
                        `${distFolder}/displayComponentStyles.css`;

                    logger.debug( 'Requesting:', displayComponentStylesCss );
                    reply.file( displayComponentStylesCss, { confine: false } );
                }
            } );

            server.start( err =>
            {
                if ( err )
                {
                    throw err;
                }

                logger.info( 'Server running at:', server.info.uri );

                resolve();
            } );
        } );
    } );
};

export default setupServer;
