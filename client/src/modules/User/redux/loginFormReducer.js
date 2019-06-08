import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  SET_USERNAME_INVALID,
  SET_PASSWORD_INVALID
} from './types';

const INITIAL_STATE = {
  username: '',
  password: '',
  usernameInvalid: false,
  passwordInvalid: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        username: action.payload,
        usernameInvalid: false,
        error: ''
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
        passwordInvalid: false,
        error: ''
      };

    case SET_USERNAME_INVALID:
      return { ...state, usernameInvalid: true, error: action.payload };

    case SET_PASSWORD_INVALID:
      return { ...state, passwordInvalid: true, error: action.payload };

    default:
      return state;
  }
};
