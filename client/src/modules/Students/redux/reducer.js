import {
  USERS_LOADED,
  USERS_LOADING
} from './types';

const INITIAL_STATE = {
  students: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_LOADING:
      return { ...state, loading: true };

    case USERS_LOADED:
      return { ...state, students: action.payload.users, loading: false };

    default:
      return state;
  }
};
