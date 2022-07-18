import { combineReducers }  from 'redux';
import alert from './alert';
import auth from './auth';
import comments from './comments';

export default combineReducers({
alert, auth, comments
})