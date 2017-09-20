import React, { Component } from 'react';

import { connect }          from 'react-redux';
import updateProps          from 'actions/updateProps';

import { ModalDialog }      from 'nessie';

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
