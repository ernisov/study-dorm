import {
  SET_SETTLEMENTS_LOADING,
  LOAD_SETTLEMENTS_SUCCESS,
  LOAD_SETTLEMENTS_FAIL,
  CLEAR_STATE
} from '../types';

const INITIAL_STATE = {
  list: [],
  page: 1,
  loading: false,
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SETTLEMENTS_LOADING:
      return { ...state, loading: true };

    case LOAD_SETTLEMENTS_FAIL:
      return { ...state, loading: false };

    case LOAD_SETTLEMENTS_SUCCESS:
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        page: state.page + 1,
        loading: false,
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        totalDocs: action.payload.totalDocs,
        totalPages: action.payload.totalPages
      };

    case CLEAR_STATE:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
