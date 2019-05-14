import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOADING_FALSE,
  LOADING_TRUE,
  ACCESS_TOKEN_VALID,
  LOGIN_FAIL
} from './types';

const INITIAL_STATE = {
  username: null,
  role: '',
  accessToken: '',
  isAuthenticated: false,
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        isAuthenticated: true
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };

    case ACCESS_TOKEN_VALID:
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        isAuthenticated: true
      };

    case LOGIN_FAIL:
      return {
        ...INITIAL_STATE,
        loading: false
      };

    case LOADING_FALSE:
      return { ...state, loading: false };

    case LOADING_TRUE:
      return { ...state, loading: true };

    default:
      return state;
  }
};
