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
    const displayComponents      = `${pwd}/${options.components}`;
    const displayComponentStyles = `${pwd}/${options.styles}`;

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
                    const displayComponentsJs = `${displayComponents}`;

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
                        `${displayComponentStyles}`;

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
