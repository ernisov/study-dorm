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

    dispatch({ type: SET_REQUESTS_LOADING });

    tenants.loadTenantRequests(username, page)
      .then((response) => {
        dispatch({ type: LOAD_REQUESTS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({ type: LOAD_REQUESTS_FAIL });
      });
  };
};
