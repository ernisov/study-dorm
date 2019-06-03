import {
  DORMITORY_CHANGED,
  FLOOR_CHANGED,
  ROOMS_LOADING,
  ROOMS_LOADING_FAIL,
  ROOMS_LOADING_SUCCESS
} from './types';

const INITIAL_STATE = {
  rooms: [],
  loading: false,
  dormitory: 1,
  floor: 1
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

    default:
      return state;
  }
};
