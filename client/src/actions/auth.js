import axios from "axios";
import * as actions from './types';
import setAuthToken from "../utils/setAuthToken";

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:8000/v1/api/auth");
    dispatch({
      type: actions.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actions.AUTH_ERROR,
    });
  }
};

export const updateUser = (payload)=>{
    return{
      type: actions.UPDATE_USER,
      payload:payload,
    }
}

//register
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, email, password });
    //removed proxy from package.json
    // "proxy": "http://localhost:8000/v1"
    try {
      const res = await axios.post(
        "http://localhost:8000/v1/api/users",
        body,
        config
      );
      dispatch({
        type: actions.REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      //console log token generated
      console.log(res.data.token);
    } catch (error) {
      //loop through errors to get specific error
      const errors = error.response.data.errors;
      if (errors) {
        console.log(errors);
      }
      dispatch({
        type: actions.REGISTER_FAIL,
      });
      console.log(error);
    }
  };

//login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/api/auth",
      body,
      config
    );
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    //loop through errors to get specific error
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
    }
    dispatch({
      type: actions.LOGIN_FAIL,
    });
    console.log(error);
  }
};

//logout / clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: actions.LOGOUT,
  });
}

