import {
  DORMITORY_CHANGED,
  FLOOR_CHANGED,
  ROOMS_LOADING,
  ROOMS_LOADING_FAIL,
  ROOMS_LOADING_SUCCESS,
  ROOM_SELECTED,
  REQUEST_FAIL,
  REQUEST_SUCCESS,
  CLEAR_STATE
} from './types';

const INITIAL_STATE = {
  rooms: [],
  loading: false,
  dormitory: 1,
  floor: 1,
  activeRoom: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DORMITORY_CHANGED:
      return {
        ...state,
        dormitory: action.payload.dormitory
      };

    case FLOOR_CHANGED:
      return {
        ...state,
        floor: action.payload.floor
      };

    case ROOMS_LOADING:
      return {
        ...state,
        loading: true
      };

    case ROOMS_LOADING_FAIL:
      return {
        ...state,
        loading: false
      };

    case ROOMS_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload
      };

    case ROOM_SELECTED:
      return {
        ...state,
        activeRoom: action.payload
      };

    case CLEAR_STATE:
    case REQUEST_SUCCESS:
      return INITIAL_STATE;

    case REQUEST_FAIL:
    default:
      return state;
  }
};
