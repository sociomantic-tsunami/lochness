/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { NavBar }           from 'nessie-ui';
import NavItem              from './NavItem';

export default class Navigation extends Component
{
    static propTypes =
    {
        components : PropTypes.object
    };

    render()
    {
        const { components = {}, currentPage = '' } = this.props;

        const componentsDropdown = Object.keys( components ).map( ( componentName, index ) =>
        (
            <NavItem
                label     = { componentName }
                href      = { `#/component/${componentName}` }
                key       = { index }
                isCurrent = { componentName === currentPage } />
            ) );

        return (
            <NavBar>
                <NavItem
                    role      = "primary"
                    label     = "Components"
                    href      =  "#/components/"
                    isCurrent = { currentPage === 'components' }>
                    { componentsDropdown }
                </NavItem>
                <NavItem
                    role      = "primary"
                    label     = "Editor"
                    isCurrent = { currentPage === 'editor' }
                    href      =  "#/editor/" />
            </NavBar>
        );
    }
}
