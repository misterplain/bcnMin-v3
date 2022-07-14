import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  //make sure that when we load a user the loading is done, once we receive a response we'll set this to false
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //user loaded and auth error
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };

    case UPDATE_USER:
      let cloneState = { ...state };
      if (action.payload?.isAddToFavorite) {
        cloneState.user.favorites = [
          ...cloneState.user.favorites,
          action.payload.blogId,
        ];
      } else {
        let index = cloneState.user.favorites.findIndex(
          action.payload.blogId

        );
        cloneState.user.favorites = cloneState.user.favorites.splice(index, 1);
      }
      return cloneState;

    default:
      return state;
  }
}
