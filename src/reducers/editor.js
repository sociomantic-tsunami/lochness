const LOCAL_JSXSTRING  = 'lochness-jsxString';
const defaultJsxString =
`<H1>Page Title</H1>
<Form>
    <Row align="right" verticalAlign="middle">
        <Column>
            <Switch isChecked onLabel="Active" offLabel="Deactivated" />
        </Column>
        <Column>
            <Tooltip message="Delete">
                <IconButton iconType="delete" iconTheme="control" iconSize="M">Delete</IconButton>
            </Tooltip>
        </Column>
    </Row>
    <Module title="Module">Module content...</Module>
    <Module isCollapsible isCollapsed title="Collapsed Module">Collapsed module content...</Module>
</Form>`;

export default function editor( state = { jsxString: localStorage.getItem( LOCAL_JSXSTRING ) || defaultJsxString }, action )
{
    switch ( action.type )
    {

    case 'UPDATE_CURSOR':
        {
            const newCursor = action.payload.cursor;

            if ( newCursor )
            {
                return { ...state,  cursor: newCursor };
            }

            return state;
        }

    case 'UPDATE_JSX':
        {
            const newJsx = action.jsxString;

            if ( newJsx )
            {
                localStorage.setItem( LOCAL_JSXSTRING, newJsx );

                return { ...state,  jsxString: newJsx };
            }

            return state;
        }

    case 'RESET_JSX':
        {
            return { ...state,  jsxString: defaultJsxString };
        }

    case 'SPLICE_JSX':
        {
            const { jsxSnippet, insertAt } = action.payload;

            if ( jsxSnippet )
            {
                const oldJsx = state.jsxString;
                let   newJsx = '';

                if ( oldJsx )
                {
                    if ( insertAt )
                    {
                        const { line, ch } = insertAt;
                        const oldLines     = oldJsx.split( '\n' );
                        const   newLines     = oldLines;

                        newLines[ line ] = oldLines[ insertAt.line ].slice( 0, ch )
                            + jsxSnippet
                            + oldLines[ insertAt.line ].slice( ch );
                        console.log( newLines );
                        newJsx = newLines.join( '\n' );
                    }
                    else
                    {
                        newJsx = `${oldJsx}\n${jsxSnippet}`;
                    }
                }
                else
                {
                    newJsx = jsxSnippet;
                }

                return { ...state,  jsxString: newJsx };
            }

            return state;
        }

    case 'UPDATE_COMPONENT':
        {
            const newComponent = action.selectedComponent;

            if ( newComponent )
            {
                return { ...state, selectedComponent: newComponent };
            }

            return state;
        }
    default:
        return state;
    }
}
