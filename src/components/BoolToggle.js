/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';
import ProtoToggle          from './ProtoToggle';


import { connect }         	from 'react-redux';
import updateProps         	from 'actions/updateProps';

import { Switch }           from 'nessie-ui';

class BoolToggle extends ProtoToggle
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
        _newProps[ propToToggle ] = e.nativeEvent.target.checked;

        updateProps( {
        		component : componentName,
        	  	newProps  : _newProps
        } );
    }

    render()
    {
        const { componentProps, propToToggle } = this.props;

        return (
            <Switch
                onChange  = { this.toggle.bind( this ) }
                isChecked = { componentProps[ propToToggle ] }
                    />
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

export default connect( mapStateToProps, mapDispatchToProps )( BoolToggle );
