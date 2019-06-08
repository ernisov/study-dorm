import {
  UNSET_USER,
  SET_USER
} from './types';

const INITIAL_STATE = {
  username: null,
  firstName: '',
  lastName: '',
  role: '',
  isAuthenticated: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UNSET_USER:
      return { ...INITIAL_STATE };

    case SET_USER:
      return { ...state, ...action.payload, isAuthenticated: true };

    default:
      return state;
  }
};
