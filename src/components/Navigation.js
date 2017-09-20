import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { NavBar }           from 'nessie';
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
                label         = { componentName }
                href          = { `/#/component/${componentName}` }
                key           = { index }
                isCurrentPage = { componentName === currentPage } />
            ) );

        return (
            <NavBar>
                <NavItem
                    role          = "primary"
                    label         = "Components"
                    href          = "/#/components/"
                    isCurrentPage = { currentPage === 'components' }>
                    { componentsDropdown }
                </NavItem>
                <NavItem
                    role          = "primary"
                    label         = "Editor"
                    isCurrentPage = { currentPage === 'editor' }
                    href          = "/#/editor/" />
            </NavBar>
        );
    }
}
