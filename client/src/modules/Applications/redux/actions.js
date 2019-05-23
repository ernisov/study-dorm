import { request } from '../../../api/requests';
import {
  SET_LOADING,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAIL,
  STATUS_CHANGE,
  APPLICATION_STATUS_CHANGED
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

export const approve = (_id) => {
  return dispatch => {
    request({
      method: 'post',
      url: `/applications/${_id}`,
      data: {
        status: 'approved'
      }
    }).then((response) => {
      dispatch({ type: APPLICATION_STATUS_CHANGED, payload: response.data });
    }).catch((err) => dispatch({ APPLICATION_STATUS_CHANGE_FAILED }));
  };
};

export const reject = (_id) => {
  return dispatch => {
    console.log('reject');
  };
};
