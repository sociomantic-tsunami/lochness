import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import displayComponents    from './displayComponents';
import editor               from './editor';


export default combineReducers( Object.assign( {}, {
    routing : routerReducer,
    components: displayComponents,
    editor
} ) );
