/* global Babel */
import * as React                from 'react';
import { Component }             from 'react';
import * as DisplayComponents    from 'displayComponents';
import { bindActionCreators }    from 'redux';
import { connect }               from 'react-redux';
import SplitPane                 from 'react-split-pane';
import Pane                      from 'react-split-pane/lib/Pane';
import Header                    from 'components/Header';
import Navigation                from 'components/Navigation';
import LivePreview               from 'components/LivePreview';
import updateCursor              from 'actions/updateCursor';
import updateJsx                 from 'actions/updateJsx';
import updateComponent           from 'actions/updateComponent';
import spliceJsx                 from 'actions/spliceJsx';
import resetJsx                  from 'actions/resetJsx';
import { nodeToJsx, unwrapNode } from 'helpers/reactNodeHelpers';
import { cleanseJsx, wrapJsx }   from 'helpers/jsxHelpers';
import { html as beautifyHtml }  from 'js-beautify';
import {
    Button,
    CodeEditor,
    Column,
    FlounderDropdown,
    IconButton,
    Module,
    Page,
    Row,
    ScrollBox,
} from 'nessie-ui';


const babelOptions = { 'presets': [ 'react' ] };


class Editor extends Component
{
    render()
    {
        const { actions, components = {}, editor = {} } = this.props;

        const beautify = () =>
        {
            actions.updateJsx( beautifyHtml( editor.jsxString,
                { indent_size: 4, unformatted: [] } ) );
        };

        const insertJsx = () =>
        {
            const componentJsx = nodeToJsx(
                {
                    ...components[ editor.selectedComponent ],
                    type : { name: editor.selectedComponent }
                }
            );
            actions.spliceJsx( componentJsx, editor.cursor );
        };

        const selectComponent = ( e, [ val ] ) =>
        {
            actions.updateComponent( val );
        };

        const wrappedJsx = wrapJsx( cleanseJsx( editor.jsxString ) );

        let errorStr  = '✓ JSX valid';
        let wrappedJs = '';

        try
        {
            wrappedJs = Babel.transform( wrappedJsx, babelOptions ).code;
        }
        catch ( err )
        {
            errorStr = err.message;
        }

        let wrappedNode = {};

        try
        {
            wrappedNode = eval( wrappedJs );
        }
        catch ( err )
        {
            console.error( 'eval error:', err.message );
        }

        const previewNode = unwrapNode( wrappedNode );

        const addComponentWidget = (
            <Row gutters = "S" verticalAlign = "middle">
                <Column>
                    <FlounderDropdown
                        placeholder = "Component to add"
                        data        = { components && Object.keys( components ) }
                        onChange    = { selectComponent }
                        value       = { editor.selectedComponent }
                        search />
                </Column>
                <Column size = "content">
                    <Button
                        onClick      = { insertJsx }
                        isReadOnly   = { !editor.selectedComponent }
                        iconType     = "add">
                        Add
                    </Button>
                </Column>
            </Row>
        );

        const toolbarButtons = (
            <Row verticalAlign = "middle">
                <Column>
                    <IconButton
                        onClick  = { beautify }
                        iconType = "validation"
                        iconSize = "M">
                        Tidy JSX
                    </IconButton>
                </Column>
                <Column>
                    <IconButton
                        onClick  = { actions.resetJsx }
                        iconType = "delete"
                        iconSize = "M">
                        Reset JSX
                    </IconButton>
                </Column>
            </Row>
        );

        return (
            <Page>
                <Header components = { components } />

                <Navigation
                    components  = { components }
                    currentPage = "editor" />

                <SplitPane
                    split = "vertical"
                    className = "splitPane" >

                    <Pane
                        minSize = "25%"
                        defaultSize = "50%"
                        className = "pane" >
                        <Module>
                            <Row verticalAlign = "middle">
                                <Column>{ addComponentWidget }</Column>
                                <Column size = "content">
                                    { toolbarButtons }
                                </Column>
                            </Row>
                            <CodeEditor
                                value            = { editor.jsxString }
                                onChange         = { actions.updateJsx }
                                options          = { {
                                    mode       : 'jsx',
                                    indentUnit : 4,
                                } }
                                onCursorActivity = { actions.updateCursor } />
                            <CodeEditor
                                value      = { errorStr }
                                options    = { { lineNumbers: false } }
                                isReadOnly />
                        </Module>
                    </Pane>
                    <Pane
                        minSize = "25%"
                        defaultSize = "50%"
                        className = "pane" >
                        <LivePreview previewNode = { previewNode } />
                    </Pane>
                </SplitPane>
            </Page>
        );
    }
}


const mapStateToProps = state =>
{
    const props = {
        actions    : state.actions,
        components : state.components.components,
        editor     : state.editor
    };

    return props;
};

const mapDispatchToProps = dispatch =>
{
    const actions = {
        updateComponent,
        updateCursor,
        updateJsx,
        resetJsx,
        spliceJsx,
    };

    const actionMap = { actions: bindActionCreators( actions, dispatch ) };
    return actionMap;
};

export default connect( mapStateToProps, mapDispatchToProps )( Editor );
