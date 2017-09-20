/* global Babel */

import * as React             from 'react';
import ProtoToggle            from './ProtoToggle';
import PropTypes              from 'prop-types';

import * as DisplayComponents from 'displayComponentsDist';
import updateProps            from 'actions/updateProps';
import { connect }            from 'react-redux';
import { nodeToJsx }          from 'helpers/reactNodeHelpers';
import { TextArea }           from 'nessie';


class NodeToggle extends ProtoToggle
{
    static propTypes =
    {
        componentName  : PropTypes.string,
        componentProps : PropTypes.objectOf( PropTypes.string ),
        propToToggle   : PropTypes.string
    };

    constructor( props )
    {
        super( props );

        this.toggle = this.toggle.bind( this );
    }

    toggle( e )
    {
        const { updateProps, propToToggle, componentName } = this.props;

        const propString = e.target.value;

        let component = '';

        const wrappedJsx = `<div>${propString.replace( /(<\/?)([A-Z])/g,
            '$1DisplayComponents.$2' )}</div>`;

        try
        {
            component = eval(
                Babel.transform( wrappedJsx, { 'presets': [ 'react' ] } ).code
            );
        }
        catch ( err )
        {
            console.error( 'JSX parse error:', err );
        }

        const newProps = {};
        newProps[ propToToggle ] = React.isValidElement( component ) ?
            component.props.children : propString;

        updateProps( { component: componentName, newProps } );
    }

    render()
    {
        const { componentProps, propToToggle } = this.props;

        return (
            <TextArea
                onChange     = { this.toggle.bind( this ) }
                placeholder  = "String or JSX"
                defaultValue =
                    { nodeToJsx( componentProps[ propToToggle ] ) } />
        );
    }
}


const mapStateToProps = () =>
( {} );

const mapDispatchToProps = ( dispatch ) =>
{
    const props = {
        updateProps : updatedProps =>
        {
            dispatch( updateProps( updatedProps ) );
        }
    };
    return props;
};

export default connect( mapStateToProps, mapDispatchToProps )( NodeToggle );
