import { combineReducers }  from 'redux';
import auth from './auth';
import comments from './comments';

export default combineReducers({
 auth, comments
})