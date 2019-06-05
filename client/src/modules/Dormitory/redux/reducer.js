import {
  SET_LOADING,
  LOAD_ROOMS_SUCCESS,
  CLEAR_STATE
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

    case CLEAR_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
