import {
    GET_FAVORITES,
    GET_FAVORITES_FAIL,
    ADD_FAVORITE,
    ADD_FAVORITE_FAIL,
    REMOVE_FAVORITE,
    REMOVE_FAVORITE_FAIL,
  } from "../actions/types";
  
  const initialState = {
    favorites: [],
    loading: true,
    error: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_FAVORITES:
        return {
          ...state,
          favorites: payload,
          loading: false,
        };
      case GET_FAVORITES_FAIL:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case ADD_FAVORITE:
        return {
          ...state,
          favorites: [...state.favorites, payload],
          loading: false,
        };
      case ADD_FAVORITE_FAIL:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case REMOVE_FAVORITE:
        return {
          ...state,
          favorites: state.favorites.filter(
            (favorite) => favorite.id !== payload
          ),
          loading: false,
        };
      case REMOVE_FAVORITE_FAIL:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  