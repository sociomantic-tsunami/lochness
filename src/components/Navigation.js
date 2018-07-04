import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { NavBar }           from 'nessie-ui';
import NavItem              from './NavItem';

const href = ( /git/g ).test(window.location.host);

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
                href      = { href ? `/nessie/#/component/${componentName}` : `/#/component/${componentName}` }
                key       = { index }
                isCurrent = { componentName === currentPage } />
            ) );

        return (
            <NavBar>
                <NavItem
                    role      = "primary"
                    label     = "Components"
                    href      = { href ?  "/nessie/#/components/" :  "/#/components/" }
                    isCurrent = { currentPage === 'components' }>
                    { componentsDropdown }
                </NavItem>
                <NavItem
                    role      = "primary"
                    label     = "Editor"
                    isCurrent = { currentPage === 'editor' }
                    href      = { href ? "/nessie/#/editor/" : "/#/editor/" } />
            </NavBar>
        );
    }
}
