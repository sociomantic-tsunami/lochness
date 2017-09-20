import React                from 'react';
import PropTypes            from 'prop-types';

import { connect }         	from 'react-redux';
import updateProps         	from 'actions/updateProps';
import { FlounderDropdown } from 'nessie';

import ProtoToggle          from './ProtoToggle';

class EnumToggle extends ProtoToggle
{
    static propTypes =
    {
    	componentName  : PropTypes.string,
        componentProps : PropTypes.object,
        propToToggle   : PropTypes.string,
        options        : PropTypes.array
    };

    toggle( e, selectedValues )
    {
        const { updateProps, propToToggle, componentName } = this.props;

        const _newProps = {};

        _newProps[ propToToggle ] = selectedValues[ 0 ];

        updateProps( {
        		component : componentName,
        	  	newProps  : _newProps
        } );
    }

    render()
    {
        const { componentProps, propToToggle, options } = this.props;

        return (
            <FlounderDropdown
                onChange     = { this.toggle.bind( this ) }
                value        = { String( componentProps[ propToToggle ] ) }
                data         = { options.map( value =>
                                {
                    const actualValue = value.value.replace( /(^'|'$)/g, '' );
                    return {
                        text  : actualValue,
                        value : actualValue
                    };
                } ) } />
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

export default connect( mapStateToProps, mapDispatchToProps )( EnumToggle );
