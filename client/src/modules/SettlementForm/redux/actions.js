import { request } from '../../../api/requests';
import {
  DORMITORY_CHANGED,
  FLOOR_CHANGED,
  ROOMS_LOADING,
  ROOMS_LOADING_FAIL,
  ROOMS_LOADING_SUCCESS
} from './types';

export const changeDormitory = (dormitory) => {
  return { type: DORMITORY_CHANGED, payload: { dormitory } };
};

export const changeFloor = (floor) => {
  return { type: FLOOR_CHANGED, payload: { floor } };
};

export const loadRooms = (dormitory, floor) => {
  return dispatch => {
    dispatch({ type: ROOMS_LOADING });
    request({
      method: 'get',
      url: '/rooms/available',
      params: { dormitory, floor }
    }).then((response) => {
      dispatch({ type: ROOMS_LOADING_SUCCESS, payload: response.data });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: ROOMS_LOADING_FAIL });
    });
  };
};
