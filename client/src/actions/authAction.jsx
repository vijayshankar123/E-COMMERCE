import axios from "axios";
import { setAlert } from "./alertAction";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ERROR,
  USER_LOADED,
  USER_LOADED_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
  LOGOUT_ADMIN
} from "./types";

//load user
export const loadUser = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_ERROR
      });
    }
  };
};

//Register a user

export const register = ({ name, email, password }) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/user", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert("Account successfully created", "success"));

      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

//Login a user

export const login = ({ email, password }) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert("Successfully signed in", "success"));
      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

//Login admin

export const loginAdmin = ({ code, password }) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ code, password });
    try {
      const res = await axios.post("/api/secretadmin", body, config);
      dispatch({
        type: LOGIN_ADMIN_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert("Successfully signed in as admin", "success"));
      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: LOGIN_ADMIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const clearError = () => {
  return async dispatch => {
    dispatch({
      type: CLEAR_ERROR
    });
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: LOGOUT
    });
  };
};
