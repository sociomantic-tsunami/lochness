import React                from 'react';
import PropTypes            from 'prop-types';

import { connect }          from 'react-redux';
import updateProps          from 'actions/updateProps';

import { TextInput }        from 'nessie';

import ProtoToggle          from './ProtoToggle';

class FuncToggle extends ProtoToggle
{
    static propTypes =
    {
        componentName  : PropTypes.string,
        componentProps : PropTypes.object,
        propToToggle   : PropTypes.string
    };

    toggle( e )
    {
        const { updateProps, propToToggle, componentName } = this.props;

        const _newProps = {};

        try
        {
            _newProps[ propToToggle ] = eval( e.nativeEvent.target.value );
        }
        catch ( err )
        {
            console.log( 'eval error:', err );
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
            <TextInput
                placeholder  = "( e ) => { ... }"
                onChange     = { this.toggle.bind( this ) }
                defaultValue = { componentProps[ propToToggle ] } />
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

export default connect( mapStateToProps, mapDispatchToProps )( FuncToggle );
