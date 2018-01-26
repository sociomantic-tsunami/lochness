import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';

import components           from './components';
import editor               from './editor';


export default combineReducers( Object.assign( {}, {
    routing : routerReducer,
    components,
    editor,
} ) );
