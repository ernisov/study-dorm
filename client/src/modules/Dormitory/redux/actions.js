import {
  SET_LOADING,
  LOAD_ROOMS_SUCCESS
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
