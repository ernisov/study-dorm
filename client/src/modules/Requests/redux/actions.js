import { request } from '../../../api/requests';
import {
  SET_LOADING,
  LOAD_REQUESTS_SUCCESS,
  LOAD_REQUESTS_FAIL,
  STATUS_CHANGE
} from './types';

export const onStatusChange = (e) => {
  return { type: STATUS_CHANGE, payload: e.target.value };
};

export const loadRequests = (page, status) => {
  return dispatch => {
    let config = { page, limit: 10 };
    if (status !== 'all') config.status = status;

    dispatch({ type: SET_LOADING });

    request({
      method: 'get',
      url: '/requests',
      params: config
    }).then((response) => {
      dispatch({ type: LOAD_REQUESTS_SUCCESS, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: LOAD_REQUESTS_FAIL });
    });
  };
};

export const commit = (req, user) => {
  return dispatch => {
    
  };
}
