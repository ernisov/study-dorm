import {
  SET_LOADING,
  LOAD_ROOMS_SUCCESS,
  CLEAR_STATE,
  TENANT_UNSETTLE_SUCCESS,
  TENANT_UNSETTLE_FAIL
} from './types';
import { request } from '../../../api/requests';


export const loadRooms = (dormitory, floor) => {
  return dispatch => {
    dispatch({ type: SET_LOADING });
    request({
      method: 'get',
      url: '/rooms/',
      params: {
        dormitory,
        floor
      }
    }).then((response) => {
      let { data, paths } = response.data;
      let rooms = [];

      for(let room of paths.rooms) {
        let roomData = data.find(r => r.id === room.id);
        rooms.push({ ...room, data: roomData });
      }

      dispatch({
        type: LOAD_ROOMS_SUCCESS,
        payload: {
          rooms: rooms,
          dorm: paths.dorm
        }
      });
    }).catch((err) => {

    });
  };
};

export const clearState = () => {
  return { type: CLEAR_STATE };
};

export const unsettleTenant = (tenant) => {
  return dispatch => {
    request({
      method: 'post',
      url: '/settlements',
      data: {
        tenant: tenant.username,
        action: 'unsettle',
        from: tenant.room
      }
    })
    .then((response) => {
      dispatch({ type: TENANT_UNSETTLE_SUCCESS, payload: tenant });
    })
    .catch((error) => {
      dispatch({ type: TENANT_UNSETTLE_FAIL });
    });
  };
}

export const onDormitoryChange = (value) => {
  return (dispatch) => {
    dispatch({ type: CLEAR_STATE });
    request({
      method: 'get',
      url: '/rooms/',
      params: {
        dormitory: value,
        floor: 1
      }
    }).then((response) => {
      let { data, paths } = response.data;
      let rooms = [];

      for(let room of paths.rooms) {
        let roomData = data.find(r => r.id === room.id);
        rooms.push({ ...room, data: roomData });
      }

      dispatch({
        type: LOAD_ROOMS_SUCCESS,
        payload: {
          rooms: rooms,
          dorm: paths.dorm
        }
      });
    }).catch((err) => {

    });
  };
};
