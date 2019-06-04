import {
  LIST_STATUS_CHANGE,
  LOAD_TENANTS_SUCCESS,
  LOAD_TENANTS_FAIL,
  TENANT_UNSETTLE_FAIL,
  TENANT_UNSETTLE_SUCCESS,
  TENANTS_CLEAR
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

    case TENANT_UNSETTLE_SUCCESS:
      if (action.payload.status === 'settled') {
        return {
          ...state,
          list: state.list.filter(t => t.username !== action.payload.tenant.username)
        };
      }
      return {
        ...state,
        list: state.list.map(t => {
          if (t.username === action.payload.tenant.username) {
            return action.payload.tenant;
          }
          return t;
        })
      };

    case TENANTS_CLEAR:
      return INITIAL_STATE;

    case TENANT_UNSETTLE_FAIL:
    default:
      return state;
  }
};
