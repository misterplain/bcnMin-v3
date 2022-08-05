import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createMiddleware} from 'react-redux'
import logger from "redux-logger"
import thunk from 'redux-thunk';
import rootReducer  from './reducers';

// const initialState = {}

// const middleware = [thunk];

// const store = createStore(
//     rootReducer,
//     initialState,   
//     composeWithDevTools(applyMiddleware(...middleware))
// );

const middlewareList = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewareList));

export default store