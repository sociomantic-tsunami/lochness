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

import { connect }          from 'react-redux';
import updateProps          from 'actions/updateProps';

import { TextArea }         from 'nessie-ui';

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
