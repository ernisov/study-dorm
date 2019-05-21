import {
  SET_LOADING,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAIL,
  STATUS_CHANGE
} from './types';

const INITIAL_STATE = {
  page: 1,
  list: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false,
  status: 'unconsidered'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case LOAD_APPLICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        page: state.page + 1,
        list: [...state.list, ...action.payload.list],
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        totalDocs: action.payload.totalDocs,
        totalPages: action.payload.totalPages
      };

    case STATUS_CHANGE:
      return {
        ...INITIAL_STATE,
        list: [],
        status: action.payload,
      };

    case LOAD_APPLICATIONS_FAIL:
    default:
      return state;
  }
};
