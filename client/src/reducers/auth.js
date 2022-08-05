import * as actions from '../actions/types';

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
    case actions.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case actions.REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case actions.REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case actions.LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case actions.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };

    case actions.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };

    case actions.UPDATE_USER:
      let cloneState = { ...state };
      if (action.payload?.isAddToFavorite) {
        cloneState.user.favorites = [
          ...cloneState.user.favorites,
          action.payload.blogId,
        ];
      } else {
        cloneState.user.favorites = cloneState.user.favorites?.filter(
          (value, index) => value !== action.payload.blogId
        );
      }
      return cloneState;

    default:
      return state;
  }
}
