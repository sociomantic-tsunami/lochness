import path      from 'path';
import fs        from 'fs';

import logger    from './logger';
import getConfig from '../webpack.config';

const pwd = process.cwd();

const generateConfig = ( options ) =>
{
    const envConfig   = getConfig( options.env );
    const configToUse = Object.assign( {}, envConfig );

    let distFiles;

    if( options.dist )
    {
        distFiles = path.resolve( options.lib, options.dist ) ;
    } else
    {
        const distPath  = fs.readFileSync(`${options.lib}/package.json`, 'utf-8');
        const mainEntry = JSON.parse( distPath ).main;

        if( mainEntry )
        {
            distFiles = path.resolve( options.lib, mainEntry );
        } else
        {
            distFiles = path.resolve( options.lib, 'index.js' )
        }
    }

    const srcFiles = path.resolve(
        pwd,
        options.src
    );

    const jsonDefaults = path.resolve( pwd, options.props );


    logger.info( '****************************************' );
    logger.info( '*****  Generating Lochness Config  *****' );
    logger.info( '****************************************' );
    logger.data( 'Using:' );

    logger.data( 'src: ', srcFiles );
    logger.data( 'dist: ', distFiles );
    logger.data( 'defaults: ', jsonDefaults );

    const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
    const HtmlWebpackHarddiskPlugin = require( 'html-webpack-harddisk-plugin' );

    const html = new HtmlWebpackPlugin(
        {
            title             : 'LochNess: Check your UI',
            template          : `${__dirname}/../src/template.ejs`,
            filename          : '../index.html',
            alwaysWriteToDisk : true,
            files             : {
                js  : [ 'app.js' ]
            }
        }
    );

    const hdHelper = new HtmlWebpackHarddiskPlugin();

    configToUse.plugins.push( html );
    configToUse.plugins.push( hdHelper );

    configToUse.resolve.alias.displayComponents         = path.resolve( pwd, options.lib );
    configToUse.externals.displayComponentsDist         = options.libName;
    configToUse.resolve.alias.displayComponentsDist     = distFiles;
    configToUse.resolve.alias.displayComponentsSrc      = srcFiles;
    configToUse.resolve.alias.displayComponentsDefaults = jsonDefaults;

    return configToUse;
};

export default generateConfig;
