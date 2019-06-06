import { request } from '../../../api/requests';
import {
  SET_LOADING,
  LOAD_REQUESTS_SUCCESS,
  LOAD_REQUESTS_FAIL,
  STATUS_CHANGE,
  REQUEST_COMMIT_FAIL,
  REQUEST_COMMIT_SUCCESS
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

export const commit = (req) => {
  return (dispatch, getState) => {
    let { username } = getState().user;
    request({
      method: 'post',
      url: `/requests/${req._id}`
    }).then((response) => {
      console.log(response.data);
      dispatch({ type: REQUEST_COMMIT_SUCCESS });
    }).catch((error) => {
      dispatch({ type: REQUEST_COMMIT_FAIL });
    });
  };
}
