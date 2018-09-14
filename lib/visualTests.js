#! /usr/bin/env node
import commandLineArgs     from 'command-line-args';
import backstop            from 'backstopjs';

import logger              from './logger';
import optionDefinitions   from './cli-args';
import generateConfig      from './generateConfig';
import generateScenarios   from './generateScenarios';
import backstopConfig      from '../backstop-config';
import generateDocs        from './docgen';
import setupServer         from './serve';

const options = commandLineArgs( optionDefinitions );
const config  = generateConfig( options );
const filter = options.visualTestFilter;

import CONSTANTS           from '../constants';
const TEST_PORT = CONSTANTS.TEST_PORT;

logger.info( `Setting up visual tests`)




generateDocs( config.resolve.alias.displayComponentsSrc )
.then( () =>
{
    const defaultComponents = config.resolve.alias.displayComponentsDefaults;
    const componentsSrc  = config.resolve.alias.displayComponentsSrc;
    const baseTestUrl = `http://localhost:${TEST_PORT}/#/componentToTest/`;

    if ( options.filter )
    {
        logger.info( `Filtering tests for ${filter}` );
    }

    const scenarios = generateScenarios( defaultComponents,
        baseTestUrl, componentsSrc );

    backstopConfig.scenarios = scenarios;

    setupServer( options, true ).then( () =>
    {
        runRegressionTests( backstopConfig );
    } );
} );


const runRegressionTests = ( config ) =>
{
    backstop( options.visualTestType, { filter, config  } )
    .then( () =>
    {
        logger.info( 'Backstop finished. Tests pass!' );
        process.exit( 0 );
        return Promise.resolve( 'done' );
        // test successful
    } ).catch( ( e ) =>
    {
        logger.info( 'Backstop finished. Tests failed :| . Try `yarn openReport`' );
        process.exit( 1 );
        return Promise.reject( 'failed' );
        // test failed
    } );
};


// setupServer( options, true );
