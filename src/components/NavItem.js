import React, { Component }         from 'react';

import { NavItem as NessieNavItem } from 'nessie';

export default class NavItem extends Component
{
    constructor()
    {
        super();
        this.state = { isOpen: false };
    }

    render()
    {
        const { children } = this.props;
        const { isOpen } = this.state;

        const toggleOpen = () => this.setState( { isOpen: !isOpen } );

        return ( <NessieNavItem
            { ...this.props }
            isOpen      = { isOpen }
            onMouseOver = { children && toggleOpen }
            onMouseOut  = { children && toggleOpen } /> );
    }
}
