import {
  CREATE_USER,
  LOAD_USERS,
  LOAD_USERS_FAIL,
  SET_LOADING,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  USER_UPDATED
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

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(u => u.username !== action.payload.username)
      };

    case USER_UPDATED:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.username === action.payload.old.username) {
            return action.payload.newUser;
          }
          return u;
        }),
      };

    case DELETE_USER_FAIL:
    case LOAD_USERS_FAIL:
    default:
      return state;
  }
};
