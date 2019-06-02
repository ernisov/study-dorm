import { request } from '../../../api/requests';
import {
  LIST_STATUS_CHANGE,
  LOAD_TENANTS_SUCCESS,
  LOAD_TENANTS_FAIL
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
