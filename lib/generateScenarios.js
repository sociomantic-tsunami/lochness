import path                 from 'path';
import logger               from './logger';
import CONSTANTS            from '../constants';

const DELAY                 = 100;
const PROPS_DIR         = CONSTANTS.PROPS_DIR;

const baseScene =
    {
        'selectorExpansion' : true
    };

const generateScenarios = ( defaults, baseUrl, componentsSrc ) =>
{
    const scenarios             = [];
    const propsStartLocation    = PROPS_DIR;

    const components = require( defaults );

    Object.keys( components ).forEach( component =>
    {

        if ( components[ component ].lochness )
        {
            logger.data( 'lochness component, ignoring: ' + component );
            return;
        }


        const scene = Object.assign( {}, baseScene );

        scene.url = baseUrl + component;
        scene.label = component;

        const camel =  component.replace( /^(.)/, ( $1 ) =>
            $1.toLowerCase() );


        const selector = `.lochness_testbox > *`;
        scene.label = camel;
        scene.selectors = [  selector ];

        scenarios.push( scene );

    } );


    return scenarios;
};

export default generateScenarios;
