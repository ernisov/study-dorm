import {
  CREATE_USER
} from './types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state };

    default:
      return state;
  }
};
