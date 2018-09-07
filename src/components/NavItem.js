/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component }         from 'react';

import { NavItem as NessieNavItem } from 'nessie-ui';

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
