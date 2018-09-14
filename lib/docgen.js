import fs                  from 'fs-extra';
import path                from 'path';
import logger              from './logger';
import CONSTANTS           from '../constants';

const PROPS_DIR = CONSTANTS.PROPS_DIR;

/**
 * grab all Dirs inside the src
 * @param  {[type]} srcpath [description]
 * @return {[type]}         [description]
 */
function getDirectories( srcpath )
{
    return fs.readdirSync( srcpath ).filter( ( file ) =>
        fs.statSync( path.join( srcpath, file ) ).isDirectory() );
}

/**
 * generate docs for all components
 * @param  {[type]} srcFiles src file Dir to search for components
 */
export default function generateDocs( srcFiles )
{
    const mainFolderPath = srcFiles;
    const allComponents = getDirectories( mainFolderPath );

    logger.info( `Generating docs from ${srcFiles}` );
    // logger.info( allComponents );
    const reactDocs = require( 'react-docgen' );

    return new Promise( ( resolve, reject ) =>
    {
        fs.mkdirsSync( PROPS_DIR );
        logger.info( `Generating docs to ${PROPS_DIR}` );

        allComponents.map( ( component ) =>
        {
            const thePath = path.resolve( mainFolderPath, component );
            const indexPath = `${thePath}/index.jsx`;
            let dataString = '';

            const writingTo =  `${PROPS_DIR}/${component}-props.json`;

            try
            {
                dataString = fs.readFileSync( indexPath, 'utf8' );

                const componentInfo = reactDocs.parse( dataString );
                fs.writeJsonSync( writingTo,  componentInfo );
                logger.verbose( `${writingTo} written` );

            }
            catch ( error )
            {
                logger.warn( 'no index file for folder: ', component );
            }
        } );

        logger.info( 'Prop docs generated' );
        resolve();
    } );
}
