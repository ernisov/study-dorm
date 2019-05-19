import {
  LOAD_ANNOUNCEMENTS,
  LOAD_ANNOUNCEMENTS_FAIL,
  SET_LOADING,
  DELETE_ANNOUNCEMENT_SUCCESS,
  DELETE_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_UPDATED
} from './types';
import { request } from '../../../api/requests';

export const loadAnnouncements = (page) => {
  return dispatch => {
    dispatch({ type: SET_LOADING });
    request({
      method: 'get',
      url: '/announcements/',
      params: {
        limit: 10,
        page: page
      }
    }).then((response) => {
      dispatch({ type: LOAD_ANNOUNCEMENTS, payload: response.data });
    }).catch(err => {
      console.log(err);
      dispatch({ type: LOAD_ANNOUNCEMENTS_FAIL });
    });
  };
};

export const deleteAnnouncement = (id) => {
  return dispatch => {
    request({
      method: 'delete',
      url: `/announcements/${id}`
    }).then((res) => {
      dispatch({ type: DELETE_ANNOUNCEMENT_SUCCESS, payload: res.data });
    }).catch(err => {
      console.log(err);
      dispatch({ type: DELETE_ANNOUNCEMENT_FAIL });
    });
  };
};

export const updateAnnouncement = (old, newAnnouncement) => {
  return { type: ANNOUNCEMENT_UPDATED, payload: { old, newUser }};
};
