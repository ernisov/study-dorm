import {
  LOAD_TENANT_DETAILS_FAIL,
  LOAD_TENANT_DETAILS_SUCCESS,
  CLEAR_STATE
} from '../types';

const INITIAL_STATE = {
  dormitory: undefined,
  floor: undefined,
  number: undefined,
  firstName: undefined,
  lastName: undefined,
  role: undefined,
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TENANT_DETAILS_SUCCESS:
      let { room, tenant } = action.payload;
      return {
        ...state,
        ...room,
        ...tenant,
        loading: false
      };

    case LOAD_TENANT_DETAILS_FAIL:
      return { ...state, loading: false };

    case CLEAR_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
