import {
  SET_REQUESTS_LOADING,
  LOAD_REQUESTS_SUCCESS,
  LOAD_REQUESTS_FAIL
} from '../types';

const INITIAL_STATE = {
  list: [],
  page: 1,
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_REQUESTS_LOADING:
      return { ...state, loading: true };

    case LOAD_REQUESTS_SUCCESS:
      return {
        ...state,
        page: state.page + 1,
        list: [...state.list, ...action.payload.list],
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        totalDocs: action.payload.totalDocs,
        totalPages: action.payload.totalPages,
        loading: false
      };

    case LOAD_REQUESTS_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
