import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_LOADING,
    CLEAR_LOADING,
  } from '../actions/actions';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    username: null,
    error: null,
    email: null,
    id: null
  };
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case CLEAR_LOADING:
        return {
          ...state,
          loading: false,
        };
      case USER_LOADED:
        localStorage.setItem('token', action.payload.token)
        return {
          ...state,
          loading: false,
          ...action.payload,
        };
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          username: action.payload.username,
          email: action.payload.email,
          token: action.payload.token,
          isAuthenticated: action.payload.isAuthenticated,
          id: action.payload.id,
          loading: false,
        };
      case AUTH_ERROR:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          username: null
        }
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          username: null,
          error: action.payload,
        };
      case LOGIN_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          username: null,
          error: action.payload,
        };
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          username: null,
          email: null,
          id: null,
          error: null
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export default authReducer