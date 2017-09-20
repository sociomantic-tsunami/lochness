import React                from 'react';
import PropTypes            from 'prop-types';

import { connect }          from 'react-redux';
import updateProps          from 'actions/updateProps';

import { TextArea }         from 'nessie';

import ProtoToggle          from './ProtoToggle';

class ArrayToggle extends ProtoToggle
{
    static propTypes =
    {
        componentName  : PropTypes.string,
        componentProps : PropTypes.object,
        propToToggle   : PropTypes.string
    };

    toggle( e )
    {
        const { componentName, propToToggle, updateProps } = this.props;

        const _newProps = {};

        try
        {
            _newProps[ propToToggle ] = JSON.parse( e.nativeEvent.target.value );
        }
        catch ( err )
        {
            console.error( 'JSON parse error:', err );
        }

        updateProps( {
            component : componentName,
            newProps  : _newProps
        } );
    }

    render()
    {
        const { componentProps, propToToggle } = this.props;

        return (
            <TextArea
                placeholder  = "JSON"
                onChange     = { this.toggle.bind( this ) }
                defaultValue = { JSON.stringify( componentProps[ propToToggle ] ) } />
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

export default connect( mapStateToProps, mapDispatchToProps )( ArrayToggle );
