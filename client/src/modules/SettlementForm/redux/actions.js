import { request } from '../../../api/requests';
import {
  DORMITORY_CHANGED,
  FLOOR_CHANGED,
  ROOMS_LOADING,
  ROOMS_LOADING_FAIL,
  ROOMS_LOADING_SUCCESS,
  ROOM_SELECTED,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  CLEAR_STATE
} from './types';

export const changeDormitory = (dormitory) => {
  return { type: DORMITORY_CHANGED, payload: { dormitory } };
};

export const changeFloor = (floor) => {
  return { type: FLOOR_CHANGED, payload: { floor } };
};

export const loadRooms = (dormitory, floor, currentRoom) => {
  return dispatch => {
    dispatch({ type: ROOMS_LOADING });
    request({
      method: 'get',
      url: '/rooms/available',
      params: { dormitory, floor, currentRoom }
    }).then((response) => {
      dispatch({ type: ROOMS_LOADING_SUCCESS, payload: response.data });
    }).catch((err) => {
      dispatch({ type: ROOMS_LOADING_FAIL });
    });
  };
};

export const onRoomSelect = (id) => {
  return { type: ROOM_SELECTED, payload: id };
};

export const submit = (tenant, action, room, callback) => {
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
      dispatch({ type: REQUEST_SUCCESS });
      callback();
    }).catch((error) => {
      dispatch({ type: REQUEST_FAIL });
    });
  };
};

export const clearState = () => {
  return { type: CLEAR_STATE };
};
