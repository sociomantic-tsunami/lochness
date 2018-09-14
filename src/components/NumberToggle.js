/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { connect }         	from 'react-redux';
import updateProps         	from 'actions/updateProps';

import { InputField }       from 'nessie-ui';

import ProtoToggle          from './ProtoToggle';

class NumberToggle extends ProtoToggle
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
        _newProps[ propToToggle ] = e.target.value.length && typeof parseInt( e.target.value ) === 'number'
                                  ? parseInt( e.target.value )
                                  : undefined;

        updateProps( {
        		component : componentName,
        	  	newProps  : _newProps
        } );
    }

    render()
    {
        const { componentProps, propToToggle } = this.props;

        return (
            <InputField
                type         = "number"
                onChange     = { this.toggle.bind( this ) }
                defaultValue = { String( componentProps[ propToToggle ] ) } />
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

export default connect( mapStateToProps, mapDispatchToProps )( NumberToggle );
