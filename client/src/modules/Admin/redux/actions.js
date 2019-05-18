import {
  CREATE_USER,
  LOAD_USERS,
  LOAD_USERS_FAIL,
  SET_LOADING,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from './types';
import { request } from '../../../api/requests';

export const loadUsers = (page) => {
  return dispatch => {
    dispatch({ type: SET_LOADING });
    request({
      method: 'get',
      url: '/users/',
      params: {
        limit: 10,
        page: page
      }
    }).then((response) => {
      dispatch({ type: LOAD_USERS, payload: response.data });
    }).catch(err => {
      console.log(err);
      dispatch({ type: LOAD_USERS_FAIL });
    });
  };
};

export const deleteUser = (username) => {
  return dispatch => {
    request({
      method: 'delete',
      url: `/users/${username}`,
    }).then((res) => {
      dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
    }).catch(err => {
      console.log(err);
      dispatch({ type: DELETE_USER_FAIL });
    });
  };
};
