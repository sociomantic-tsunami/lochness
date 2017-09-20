module.exports = ( cursor ) =>
( {
    type    : 'UPDATE_CURSOR',
    payload : { cursor }
} );
