module.exports = ( jsxSnippet, insertAt ) =>
( {
    type    : 'SPLICE_JSX',
    payload : { jsxSnippet,
            			    insertAt }
} );
