import axios from "axios";
import {
  UPDATE_COMMENTS,
  GET_MESSAGES_LOADING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
} from "../actions/types";

export const getMessages = () => async (dispatch) => {
  dispatch({
    type: GET_MESSAGES_LOADING,
  });
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/v1/api/comments`
    );

    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: { messages: response.data.messages },
    });
    console.log('getMessages success');
  } catch (err) {
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
    console.log('getMessages failed');
  }
};

export const updateComments = (payload) => {
  return {
    type: UPDATE_COMMENTS,
    payload: payload,
  };
};
