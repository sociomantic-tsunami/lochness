import React, { Component }                      from 'react';
import { bindActionCreators }                    from 'redux';
import { connect }                               from 'react-redux';

import ComponentContainer                        from 'components/ComponentContainer.js';

import switchTab                                 from 'actions/switchTab';
import toggleCollapse                            from 'actions/toggleCollapse';

import Header                                    from 'components/Header.js';
import Footer                                    from 'components/Footer.js';
import Navigation                                from 'components/Navigation';
import { Page, PageContent, PageContentHeader }  from 'nessie';
import {
    getComponentReadme,
    getComponentSpecs
} from 'helpers/componentHelpers';

const capitalizeFirstLetter = ( str ) =>
str.charAt( 0 ).toUpperCase() + str.slice( 1 );

class SingleComponentPage extends Component
{
    render()
    {
        const { components = {}, params } = this.props;

        const componentName = capitalizeFirstLetter( params.componentName );
        const component     = components[ componentName ];

        return (
            <Page>
                <Header components = { components } />
                <Navigation currentPage = { componentName } components = { components } />
                <PageContent>
                    <PageContentHeader title = { componentName } />
                    { component &&
                        <ComponentContainer
                            name           = { componentName }
                            props          = { component.props }
                            readme         = {
                                getComponentReadme( componentName ) }
                            specs          = {
                                getComponentSpecs( componentName ) }
                            activeTabIndex = { component.activeTabIndex }
                            isCollapsible  = { false }
                            actions        = { this.props.actions } />
                    }
                </PageContent>
                <Footer />
            </Page>
        );
    }
}

const mapStateToProps = ( state ) =>
{
    const props =
        {
            actions    : state.actions,
            components : state.components
        };

    return props;
};

const mapDispatchToProps = ( dispatch ) =>
{
    const actions   = { toggleCollapse, switchTab };
    const actionMap = { actions: bindActionCreators( actions, dispatch ) };

    return actionMap;
};

export default connect( mapStateToProps, mapDispatchToProps )( SingleComponentPage );
