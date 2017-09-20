import path                from 'path';
import logger              from './logger';
import getConfig           from '../webpack.config';

const pwd = process.cwd();

const generateConfig = ( options ) =>
{
    const envConfig = getConfig( options.env );
    const configToUse = Object.assign( {}, envConfig );

    const distFiles = path.resolve( pwd, options.componentsDist );
    const srcFiles = path.resolve( pwd, options.componentsSrc );
    const jsonDefaults = path.resolve( pwd, options.showcasePropsJson );
    const componentStyles = path.resolve( distFiles, 'styles.css' );

    logger.info( '****************************************')
    logger.info( '*****  Generating Lochness Config  *****')
    logger.info( '****************************************')
    logger.data( 'Using:')

    logger.data( 'dist: ', distFiles );
    logger.data( 'src: ', srcFiles );
    logger.data( 'defaults: ', jsonDefaults );
    logger.data( 'css: ', componentStyles );

    logger.info( `Lochness Serving Display Components: ${options.componentsDist}` );


    const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
    const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

    let html = new HtmlWebpackPlugin(
        {
            title    : 'Lochness: Check your UI',
            template : __dirname + '/../src/template.ejs',
            filename : '../index.html',
            alwaysWriteToDisk: true,
            files    : {
                css : [ 'style.css' ],
                js  : [ 'app.js' ]
            }
        }
    );

    let hdHelper = new HtmlWebpackHarddiskPlugin()

    configToUse.plugins.push( html );
    configToUse.plugins.push( hdHelper );

    //assume styles.css location for now
    configToUse.resolve.alias.displayComponentsSrc          = srcFiles;
    configToUse.resolve.alias.displayComponentsDefaults     = jsonDefaults;

    return configToUse;
};

export default generateConfig;
