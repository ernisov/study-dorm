import * as tenants from '../../../../api/tenants';
import {
  SET_REQUESTS_LOADING,
  LOAD_REQUESTS_SUCCESS,
  LOAD_REQUESTS_FAIL
} from '../types';

export const loadRequests = (username) => {
  return (dispatch, getState) => {
    let state = getState();
    let { page } = state.tenantRequests;

    tenants.loadTenantRequests(username, page)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
