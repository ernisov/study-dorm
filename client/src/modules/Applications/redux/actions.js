import { request } from '../../../api/requests';
import {
  SET_LOADING,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAIL
} from './types';

export const loadApplications = (page, limit) => {
  return dispatch => {
    dispatch({ type: SET_LOADING });
    request({
      method: 'get',
      url: '/applications',
      params: {
        page,
        limit
      }
    }).then((response) => {

    }).catch((err) => {
      console.log(err);
      dispatch({ type: LOAD_APPLICATIONS_FAIL });
    });
  };
};
