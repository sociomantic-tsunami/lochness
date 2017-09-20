#! /usr/bin/env node
import path                from 'path';
import commandLineArgs     from 'command-line-args';

import logger              from './logger';

import {Compiler}              from 'webpack';
import webpack             from 'webpack';

import optionDefinitions   from './cli-args';
import generateConfig      from './generateConfig';
import generateDocs        from './docgen';
import CONSTANTS           from '../constants';

const copyfiles = require( 'copyfiles' );
const fs = require('fs-extra');

const options = commandLineArgs( optionDefinitions );

const distOptions = { ...options, env: 'dist' };
const config  = generateConfig( distOptions );

const DIST_DIR = CONSTANTS.DIST_DIR;
const OUT_DIR = CONSTANTS.OUT_DIR;

fs.mkdirsSync( OUT_DIR );
fs.mkdirsSync( DIST_DIR );

generateDocs( config.resolve.alias.displayComponentsSrc )
.then( () =>
{
    logger.info( '************************************')
    logger.info( '*****  Starting Webpack Build  *****')
    logger.info( '************************************')
    logger.info( ` Outputting build to ${OUT_DIR}`)

    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {

        logger.error( "Lochness Build Errors:")
        logger.error( err )

        // logger does not...
        console.log( stats )

      }
      else
      {
          logger.info('Lochness built')
      }
    });

});
