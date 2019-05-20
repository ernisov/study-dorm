import {
  LOAD_ANNOUNCEMENTS,
  LOAD_ANNOUNCEMENTS_FAIL,
  SET_LOADING,
  DELETE_ANNOUNCEMENT_SUCCESS,
  DELETE_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_UPDATED,
  CREATE_ANNOUNCEMENT
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

export const createAnnouncement = async item => {

  const res = await request({
    method: 'post',
    url: '/announcements/',
    send: item
  });

  return dispatch => {
    dispatch({
      type: CREATE_ANNOUNCEMENT,
      payload: res
    })
  };
};

export const deleteAnnouncement = (id) => {
  return dispatch => {
    console.log('del announcement')
    request({
      method: 'delete',
      url: `/announcements/${id}`
    }).then((res) => {
      console.log('success del')
      dispatch({ type: DELETE_ANNOUNCEMENT_SUCCESS, payload: res.data });
    }).catch(err => {
      console.log(err);
      dispatch({ type: DELETE_ANNOUNCEMENT_FAIL });
    });
  };
};

export const updateAnnouncement = (old, newAnnouncement) => {
  return { type: ANNOUNCEMENT_UPDATED, payload: { old, newAnnouncement }};
};
