import {
  SET_LOADING,
  LOAD_ROOMS_SUCCESS,
  CLEAR_STATE,
  TENANT_UNSETTLE_FAIL,
  TENANT_UNSETTLE_SUCCESS
} from './types';

const INITIAL_STATE = {
  rooms: [],
  dorm: [],
  data: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload.rooms,
        data: action.payload.data,
        dorm: action.payload.dorm
      };

    case TENANT_UNSETTLE_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (room.data.id === action.payload.room) {
            room.data.tenants = room.data.tenants.filter(t => t.username !== action.payload.username);
            return room;
          }
          return room;
        })
      };

    case CLEAR_STATE:
      return INITIAL_STATE;

    case TENANT_UNSETTLE_FAIL:
    default:
      return state;
  }
};
