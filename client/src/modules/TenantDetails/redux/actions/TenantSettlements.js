import * as tenants from '../../../../api/tenants';
import {
  LOAD_SETTLEMENTS_SUCCESS,
  LOAD_SETTLEMENTS_FAIL,
  SET_SETTLEMENTS_LOADING
} from '../types';

export const loadSettlements = (username) => {
  return (dispatch, getState) => {
    let { page } = getState().tenantSettlements;

    dispatch({ type: SET_SETTLEMENTS_LOADING });

    tenants.loadTenantSettlements(page, username)
      .then((response) => {
        dispatch({ type: LOAD_SETTLEMENTS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: LOAD_SETTLEMENTS_FAIL });
      });
  };
};
