import { request } from '../../../api/requests';
import {
  SET_LOADING,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAIL,
  STATUS_CHANGE
} from './types';

export const loadApplications = (page, status) => {
  return dispatch => {
    dispatch({ type: SET_LOADING });
    request({
      method: 'get',
      url: '/applications',
      params: {
        page,
        status
      }
    }).then((response) => {
      dispatch({ type: LOAD_APPLICATIONS_SUCCESS, payload: response.data });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: LOAD_APPLICATIONS_FAIL });
    });
  };
};

export const changeStatus = (status) => {
  return { type: STATUS_CHANGE, payload: status };
};

export const approve = (id) => {
  return dispatch => {
    console.log('approve');
  };
};

export const reject = (id) => {
  return dispatch => {
    console.log('reject');
  };
};
