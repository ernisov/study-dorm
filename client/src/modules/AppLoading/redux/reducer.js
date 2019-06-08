import {
  SET_APP_READY
} from './types';

const INITIAL_STATE = {
  appReady: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_READY:
      return { ...state, appReady: action.payload };

    default:
      return state;
  }
};
