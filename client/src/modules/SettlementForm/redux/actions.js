import { request } from '../../../api/requests';
import {
  DORMITORY_CHANGED,
  FLOOR_CHANGED,
  ROOMS_LOADING,
  ROOMS_LOADING_FAIL,
  ROOMS_LOADING_SUCCESS,
  ROOM_SELECTED
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

export const onRoomSelect = (id) => {
  return { type: ROOM_SELECTED, payload: id };
};

export const submit = (tenant, action, room, callback) => {
  console.log('submit', tenant, action, room);
  return dispatch => {
    request({
      method: 'post',
      url: '/settlements',
      data: {
        tenant: tenant.username,
        action: action,
        to: room,
        from: tenant.room
      }
    }).then((response) => {
      console.log(response);
      callback();
    }).catch((error) => {
      console.log(error);
    });
  };
};
