import {
  SET_SETTLEMENTS_LOADING,
  LOAD_SETTLEMENTS_SUCCESS,
  LOAD_SETTLEMENTS_FAIL,
  CHANGE_ACTION,
  CLEAR_SETTLEMENTS_STATE
} from './types';

const INITIAL_STATE = {
  page: 1,
  list: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false,
  action: 'all'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SETTLEMENTS_LOADING:
      return { ...state, loading: true };

    case CHANGE_ACTION:
      return { ...INITIAL_STATE, action: action.payload };

    case LOAD_SETTLEMENTS_SUCCESS:
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        loading: false,
        page: state.page + 1,
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        totalDocs: action.payload.totalDocs,
        totalPages: action.payload.totalPages
      };

    case LOAD_SETTLEMENTS_FAIL:
      return {
        ...state,
        loading: false
      };

    case CLEAR_SETTLEMENTS_STATE:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
