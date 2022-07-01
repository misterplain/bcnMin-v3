import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_FAVORITES,
  GET_FAVORITES_FAIL,
  ADD_FAVORITE,
  ADD_FAVORITE_FAIL,
  REMOVE_FAVORITE,
  REMOVE_FAVORITE_FAIL,
} from "../actions/types";

//get favorites
export const getFavorites = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/v1/api/favorites");
    dispatch({
      type: GET_FAVORITES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FAVORITES_FAIL,
      payload: err.response.data.msg,
    });
  }
};
//add post to user favorites
export const addFavorite = (id) => async (dispatch) => {
  try {
   
    const res = await axios.post(
      `http://localhost:8000/v1/api/favorites/${id}`,
      {  body: id }
    );
    dispatch({
      type: ADD_FAVORITE,
      payload: res.data,
    });
    dispatch(setAlert("Favorite Added", "success"));
  } catch (err) {
    dispatch({
      type: ADD_FAVORITE_FAIL,
      payload: err.response.data.msg,
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};

//remove favorites
export const removeFavorite = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/v1/api/favorites/${id}`
    );
    dispatch({
      type: REMOVE_FAVORITE,
      payload: res.data,
    });
    dispatch(setAlert("Favorite removed", "success"));
  } catch (err) {
    dispatch({
      type: REMOVE_FAVORITE_FAIL,
      payload: err.response.data.msg,
    });
    dispatch(setAlert("Favorite not removed", "danger"));
  }
};
