import {
  CREATE_USER,
  LOAD_USERS,
  LOAD_USERS_FAIL,
  SET_LOADING
} from './types';

const INITIAL_STATE = {
  page: 1,
  users: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case LOAD_USERS:
      return {
        ...state,
        ...action.payload,
        users: [...state.users, ...action.payload.users],
        loading: false,
        page: state.page + 1
      };

    case LOAD_USERS_FAIL:
      return {...state};

    default:
      return state;
  }
};
