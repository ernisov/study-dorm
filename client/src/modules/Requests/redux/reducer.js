import {
  SET_LOADING,
  LOAD_REQUESTS_FAIL,
  LOAD_REQUESTS_SUCCESS,
  STATUS_CHANGE,
  REQUEST_COMMIT_SUCCESS,
  REQUEST_COMMIT_FAIL,
  CLEAR_STATE
} from './types';

const INITIAL_STATE = {
  list: [],
  page: 1,
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false,
  status: 'all'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUS_CHANGE:
      return {
        ...INITIAL_STATE,
        status: action.payload
      };

    case LOAD_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, ...action.payload.list],
        totalDocs: action.payload.totalDocs,
        totalPages: action.payload.totalPages,
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        page: state.page + 1
      };

    case LOAD_REQUESTS_FAIL:
      return { ...state, loading: false };

    case REQUEST_COMMIT_SUCCESS:
      if (state.status === 'all') {
        return {
          ...state,
          list: state.list.map(req => {
            if (req._id === action.payload._id) {
              let { status } = req;
              req.status = status === 'awaiting' ? 'in_progress' : 'done';
              return req;
            }
            return req;
          })
        };
      }
      return {
        ...state,
        list: state.list.filter(req => req._id !== action.payload._id)
      };

    case CLEAR_STATE:
      return INITIAL_STATE;

    case REQUEST_COMMIT_FAIL:
    default:
      return state;
  }
};
