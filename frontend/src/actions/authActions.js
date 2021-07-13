import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_LOADING,
    CLEAR_LOADING,
    AUTH_ERROR,
  } from './actions';

  export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  
  export const clearLoading = () => {
    return {
      type: CLEAR_LOADING,
    };
  };
  
  export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const config = {
        headers: {
          'Authorization': localStorage.token,
        },
      };
      const res = await axios.get('/api/v1/user/login', config)
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR})
      console.log(err)
    }
  };
  
  export const register = (formData) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/v1/users/register', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
  
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  
  export const login = (formData) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/user/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  
  export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };