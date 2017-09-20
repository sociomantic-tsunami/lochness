import React, { Component }   from 'react';
import { connect }            from 'react-redux';

import * as DisplayComponents from 'displayComponentsDist';
import { Page }               from 'nessie';
import { getComponentSpecs }  from '../helpers/componentHelpers';

import svgSprite              from 'nessie/dist/sprite.html';

import './componentToTest.css';
const capitalizeFirstLetter = ( str ) =>
str.charAt( 0 ).toUpperCase() + str.slice( 1 );


class SingleComponentPage extends Component
{
    componentDidMount()
    {
        const { params } = this.props;
        const svgContainer = document.createElement( 'div' );
        const componentName = capitalizeFirstLetter( params.componentName );

        svgContainer.innerHTML = svgSprite;

        document.body.appendChild( svgContainer );
        console.log( 'backstopjs_ready' );
        console.log( `testing: ${componentName}` );
    }

    render()
    {
        const { components = {}, params, location } = this.props;
        const query = location.query;

        const componentName = capitalizeFirstLetter( params.componentName );
        const componentFromStore     = components[ componentName ];

        const majorComponentVariations = [];
        const componentSpecs = getComponentSpecs( componentName );

        const componentsWithParams = { ...componentFromStore.props, ...query };

        const initial_variation = React.createElement(
                DisplayComponents[ componentName ], componentsWithParams );

        const container = React.createElement( 'div', { className: 'lochness_testbox'}, initial_variation );
        majorComponentVariations.push( container );


        Object.keys( componentSpecs ).forEach( prop =>
        {
            const propObject = componentSpecs[ prop ];

            if (  propObject.type && propObject.type.name === 'bool' &&
                propObject.defaultValue )
            {
                const newValue = !!propObject.defaultValue.value;
                const variationProps = {
                    ...componentFromStore.props,
                    [ prop ]: newValue
                };


                const variation = React.createElement(
                    DisplayComponents[ componentName ],
                    variationProps );
                const container = React.createElement( 'div', { className: 'lochness_testbox'}, variation );
                majorComponentVariations.push( container );
            }
        } );

        let testClassName = 'visualTesting';

        return (
                <div className={ testClassName }>
                    { majorComponentVariations }
                </div>
        );
    }
}

const mapStateToProps = ( state ) =>
{
    const props =
        {
            components : state.components
        };

    return props;
};

export default connect( mapStateToProps )( SingleComponentPage );
