/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import updateFilter           from 'actions/updateFilter';
import toggleCollapse         from 'actions/toggleCollapse';
import toggleCollapseDesc     from 'actions/toggleCollapseDesc';
import toggleCollapseSpecs    from 'actions/toggleCollapseSpecs';
import switchTab              from 'actions/switchTab';

import ComponentContainer     from 'components/ComponentContainer';
import Header                 from 'components/Header';
import Navigation             from 'components/Navigation';
import Footer                 from 'components/Footer';
import {
    getComponentReadme,
    getComponentSpecs
} from 'helpers/componentHelpers';

import {
    H1,
    Page,
    PageContent,
    Section,
    Text,
    TextInput,
} from 'nessie-ui';

class Components extends Component
{
    updateFilter = value =>
    {
        const { actions } = this.props;
        actions.updateFilter( { newString: value } );
    };

    render()
    {
        const { components = {}, filterString, actions } = this.props;

        const componentNames = Object.keys( components );

        const filteredComponentNames =
            typeof filterString === 'string' && filterString.trim().length ?
                componentNames.filter( name =>
                {
                    const regex = new RegExp( filterString, 'i' );
                    return name.match( regex );
                } ) : componentNames;


        const componentContainers = filteredComponentNames.map( componentName =>
        {
            const component = components[ componentName ];
            const readme    = getComponentReadme( componentName );
            const specs     = getComponentSpecs( componentName );

            return (
                <ComponentContainer
                    name             = { componentName }
                    props            = { component.props }
                    readme           = { readme }
                    specs            = { specs }
                    activeTabIndex   = { component.activeTabIndex }
                    isCollapsible
                    isCollapsed      = { component.isCollapsed }
                    descIsCollapsed  = { component.descIsCollapsed }
                    specsIsCollapsed = { component.specsIsCollapsed }
                    key              = { componentName }
                    actions          = { actions } />
            );
        } );

        const noResults =
            <Text>No components matching <em>{ filterString }</em></Text>;

        return (
            <Page>
                <Header components = { components } />
                <Navigation
                    currentPage = "components"
                    components = { components } />
                <PageContent>
                        <H1>Components</H1>
                        <Section>
                            <TextInput
                                label       = "Filter"
                                placeholder = "Type a component name"
                                onChange    = { e =>
                                    this.updateFilter( e.target.value ) }
                                value       =  { filterString }/>
                        </Section>
                    { componentContainers.length ?
                        componentContainers : noResults
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
        actions      : state.actions,
        components   : state.components.components,
        filterString : state.components.filterString
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
        updateFilter,
    };

    const actionMap = { actions: bindActionCreators( actions, dispatch ) };
    return actionMap;
};

export default connect( mapStateToProps, mapDispatchToProps )( Components );
