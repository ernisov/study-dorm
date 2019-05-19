import {
  LOAD_ANNOUNCEMENTS,
  LOAD_ANNOUNCEMENTS_FAIL,
  SET_LOADING
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
