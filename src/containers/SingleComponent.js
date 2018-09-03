/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component }      from 'react';
import { bindActionCreators }    from 'redux';
import { connect }               from 'react-redux';
import ComponentContainer        from 'components/ComponentContainer.js';
import switchTab                 from 'actions/switchTab';
import toggleCollapse            from 'actions/toggleCollapse';
import toggleCollapseDesc        from 'actions/toggleCollapseDesc';
import toggleCollapseSpecs       from 'actions/toggleCollapseSpecs';
import Header                    from 'components/Header.js';
import Footer                    from 'components/Footer.js';
import Navigation                from 'components/Navigation';
import { H1, Page, PageContent } from 'nessie-ui';
import {
    getComponentReadme,
    getComponentSpecs
} from 'helpers/componentHelpers';

const capitalizeFirstLetter = str =>
    str.charAt( 0 ).toUpperCase() + str.slice( 1 );

class SingleComponentPage extends Component
{
    render()
    {
        const { actions = {}, components = {}, params } = this.props;

        const componentName = capitalizeFirstLetter( params.componentName );
        const component     = components[ componentName ];
        const readme        = getComponentReadme( componentName );
        const specs         = getComponentSpecs( componentName );

        return (
            <Page>
                <Header components = { components } />
                <Navigation
                    currentPage = { componentName }
                    components  = { components } />
                <PageContent>
                    <H1 title = { componentName } />
                    { component &&
                        <ComponentContainer
                            name             = { componentName }
                            props            = { component.props }
                            readme           = { readme }
                            specs            = { specs }
                            activeTabIndex   = { component.activeTabIndex }
                            descIsCollapsed  = { component.descIsCollapsed }
                            specsIsCollapsed = { component.specsIsCollapsed }
                            actions          = { actions } />
                    }
                </PageContent>
                <Footer />
            </Page>
        );
    }
}

const mapStateToProps = state =>
{
    const props = {
        actions    : state.actions,
        components : state.components.components
    };

    return props;
};

const mapDispatchToProps = dispatch =>
{
    const actions = {
        toggleCollapse,
        toggleCollapseDesc,
        toggleCollapseSpecs,
        switchTab,
    };

    const actionMap = { actions: bindActionCreators( actions, dispatch ) };
    return actionMap;
};

export default
    connect( mapStateToProps, mapDispatchToProps )( SingleComponentPage );
