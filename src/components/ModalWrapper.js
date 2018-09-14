/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';

import { connect }          from 'react-redux';
import updateProps          from 'actions/updateProps';

import { ModalDialog }      from 'displayComponents';

class ModalWrapper extends Component
{
    render()
    {
        const handleClick = () =>
{
            this.props.updateProps( { component : 'ModalDialog',
                newProps  : { isVisible: false }
            } );
        };
        return (
            <ModalDialog { ...this.props } onClickOverlay = { handleClick } />
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

export default connect( mapStateToProps, mapDispatchToProps )( ModalWrapper );
