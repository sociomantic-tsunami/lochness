import Hapi                from 'hapi';
import inert               from 'inert';
import path                from 'path';

import logger              from './logger';
import CONSTANTS           from '../constants';

const pwd = process.cwd();

const PORT = CONSTANTS.PORT;
// const runningInLochness = CONSTANTS.runningInLochness;
const TEST_PORT = CONSTANTS.TEST_PORT;
const ASSETS_DIR = CONSTANTS.ASSETS_DIR;
const DIST_DIR = CONSTANTS.DIST_DIR;
const INDEX_HTML = `${DIST_DIR}/index.html`;
const NODE_DIR = CONSTANTS.NODE_DIR;


const setupServer = ( options, test = false ) =>
{
    // TODO check if dist files exist, if not trigger build?
    const distFolder = `${pwd}/${options.componentsDist}`;

    logger.info( '****************************************')
    logger.info( '*****  Setting up Lochness Server  *****')
    logger.info( '****************************************')

    const server = new Hapi.Server();
    server.connection( {
        host : 'localhost',
        port : test ? TEST_PORT : PORT
    } );

    // const distFiles = path.resolve( pwd, options.componentsDist );
    const distFiles = DIST_DIR;

    return new Promise( ( resolve, reject ) =>
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
                    logger.info( INDEX_HTML )
                    reply.file( INDEX_HTML , {confine: false});
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
                method  : 'GET',
                path    : '/displayComponents.js',
                handler( request, reply )
                {
                    logger.debug( 'Requesting:',  distFolder + '/displayComponents.js' )
                    reply.file( distFolder + '/displayComponents.js', {confine: false} );
                }
            } );

            server.route( {
                method  : 'GET',
                path    : '/displayComponentStyles.css',
                handler( request, reply )
                {
                    logger.debug( 'Requesting:',  distFolder + '/displayComponentStyles.js' )
                    reply.file( distFolder + '/displayComponentStyles.css', {confine: false} );
                }
            } );

            server.start( ( err ) =>
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
}

export default setupServer;
