import {
  SET_LOADING,
  LOAD_TENANTS_FAIL,
  LOAD_TENANTS_SUCCESS,
  SELECT,
  ADD_TENANT_FAIL,
  ADD_TENANT_SUCCESS
} from './types';

const INITIAL_STATE = {
  page: 1,
  list: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false,
  active: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case LOAD_TENANTS_FAIL:
      return { ...state, loading: false };

    case LOAD_TENANTS_SUCCESS:
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

    case SELECT:
      return { ...state, active: action.payload };
    case ADD_TENANT_FAIL:
    case ADD_TENANT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
