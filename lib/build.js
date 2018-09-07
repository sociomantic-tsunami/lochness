/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

#! /usr/bin/env node
import fs                    from 'fs-extra';
import commandLineArgs       from 'command-line-args';
import webpack, { Compiler } from 'webpack';
import copyfiles             from 'copyfiles';

import logger                from './logger';
import optionDefinitions     from './cli-args';
import generateConfig        from './generateConfig';
import generateDocs          from './docgen';
import CONSTANTS             from '../constants';


const options = commandLineArgs( optionDefinitions );

const distOptions = { ...options, env: 'dist' };
const config      = generateConfig( distOptions );

const DIST_DIR = CONSTANTS.DIST_DIR;
const OUT_DIR  = CONSTANTS.OUT_DIR;

fs.mkdirsSync( OUT_DIR );
fs.mkdirsSync( DIST_DIR );

generateDocs( `${config.resolve.alias.displayComponents}/src` ).then( () =>
{
    logger.info( '************************************' );
    logger.info( '*****  Starting Webpack Build  *****' );
    logger.info( '************************************' );
    logger.info( ` Outputting build to ${OUT_DIR}` );

    webpack( config, ( err, stats ) =>
    {
        if ( err || stats.hasErrors() )
        {
            logger.error( 'Lochness Build Errors:' );
            logger.error( err );

        // logger does not...
            console.log( stats );
        }
        else
        {
            logger.info( 'Lochness built' );
        }
    } );
} );
