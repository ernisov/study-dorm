import {
  LIST_STATUS_CHANGE,
  LOAD_TENANTS_SUCCESS
} from './types';

export const changeStatus = (status) => {
  return { type: LIST_STATUS_CHANGE, payload: status };
};

export const loadTenants = (page, settlementStatus) => {
  return dispatch => {
    console.log(`load tenants w. page: ${page} settlementStatus: ${settlementStatus}`);
  };
};
