import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

//reducers
import {userReducer} from './reducers/userReducers'

const reducer = combineReducers({
    user: userReducer,
});

//userInfo stored in local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {};

const middlewareList =
  process.env.NODE_ENV === "production" ? [thunk] : [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewareList))
);

export default store;
