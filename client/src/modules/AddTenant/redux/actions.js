import { request } from '../../../api/requests';
import {
  SET_LOADING,
  LOAD_TENANTS_SUCCESS,
  LOAD_TENANTS_FAIL,
  SELECT,
  ADD_TENANT_FAIL,
  ADD_TENANT_SUCCESS
} from './types';

export const loadTenants = (page) => {
  return dispatch => {
    dispatch({ type: SET_LOADING });
    request({
      method: 'get',
      url: '/tenants',
      params: {
        settlementStatus: 'not_settled',
        page: page,
        limit: 10
      }
    })
    .then((response) => {
      dispatch({ type: LOAD_TENANTS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: LOAD_TENANTS_FAIL });
    });
  };
};

export const select = (username) => {
  return { type: SELECT, payload: username };
};

export const submit = (tenant, room, callback) => {
  return dispatch => {
    request({
      method: 'post',
      url: '/settlements',
      data: {
        tenant: tenant,
        to: room,
        action: 'settle'
      }
    })
    .then((response) => {
      dispatch({ type: ADD_TENANT_SUCCESS });
      callback();
    })
    .catch((error) => {
      dispatch({ type: ADD_TENANT_FAIL });
    });
  };
};
