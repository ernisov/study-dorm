import { request } from '../../../api/requests';
import {
  LIST_STATUS_CHANGE,
  LOAD_TENANTS_SUCCESS,
  LOAD_TENANTS_FAIL,
  TENANT_UNSETTLE_FAIL,
  TENANT_UNSETTLE_SUCCESS,
  TENANTS_CLEAR
} from './types';

export const changeStatus = (status) => {
  console.log('status:', status);
  return { type: LIST_STATUS_CHANGE, payload: status };
};

export const loadTenants = (page, settlementStatus) => {
  return dispatch => {
    request({
      method: 'get',
      params: { page, settlementStatus, limit: 10 },
      url: '/tenants'
    }).then((response) => {
      console.log(response.data);
      dispatch({
        type: LOAD_TENANTS_SUCCESS,
        payload: response.data
      });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: LOAD_TENANTS_FAIL })
    })
  };
};

export const unsettle = (tenant, status) => {
  return dispatch => {
    request({
      method: 'post',
      url: '/settlements',
      data: {
        tenant: tenant.username,
        action: 'unsettle',
        from: tenant.room,
      }
    })
    .then((response) => {
      tenant.room = undefined;
      tenant.settlementStatus = 'unsettled';
      dispatch({ type: TENANT_UNSETTLE_SUCCESS, payload: { tenant, status } });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: TENANT_UNSETTLE_FAIL });
    });
  };
};

export const clearList = () => {
  return { type: TENANTS_CLEAR };
};
