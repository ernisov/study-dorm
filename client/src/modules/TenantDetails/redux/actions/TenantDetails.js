import { request } from '../../../../api/requests';
import {
  LOAD_TENANT_DETAILS_FAIL,
  LOAD_TENANT_DETAILS_SUCCESS,
  CLEAR_STATE
} from '../types';

export const loadTenantDetails = (username) => {
  return dispatch => {
    request({
      method: 'get',
      url: `/tenants/${username}`
    }).then((response) => {
      dispatch({ type: LOAD_TENANT_DETAILS_SUCCESS, payload: response.data });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: LOAD_TENANT_DETAILS_FAIL });
    });
  };
};

export const clearState = () => {
  return { type: CLEAR_STATE };
};
