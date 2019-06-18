import {
  SET_APP_READY,
  CHANGE_LANGUAGE
} from './types';

const INITIAL_STATE = {
  appReady: false,
  language: 'en'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_READY:
      return { ...state, appReady: action.payload };

    case CHANGE_LANGUAGE:
      return { ...state, appReady: true, language: action.payload };

    default:
      return state;
  }
};
