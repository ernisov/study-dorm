import {
  LIST_STATUS_CHANGE,
  LOAD_TENANTS_SUCCESS,
  LOAD_TENANTS_FAIL
} from './types';

const INITIAL_STATE = {
  page: 1,
  list: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false,
  settlementStatus: 'all'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_STATUS_CHANGE:
      return { ...INITIAL_STATE, settlementStatus: action.payload };

    case LOAD_TENANTS_SUCCESS:
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        totalDocs: action.payload.totalDocs,
        totalPages: action.payload.totalPages,
        loading: false
      };

    case LOAD_TENANTS_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
