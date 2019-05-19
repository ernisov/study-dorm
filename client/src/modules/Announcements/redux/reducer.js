import {
  LOAD_ANNOUNCEMENTS,
  LOAD_ANNOUNCEMENTS_FAIL,
  SET_LOADING
} from './types';

const INITIAL_STATE = {
  page: 1,
  announcements: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case LOAD_ANNOUNCEMENTS:
      return {
        ...state,
        ...action.payload,
        announcements: [...state.announcements, ...action.payload.announcements],
        loading: false,
        page: state.page + 1
      }

    case LOAD_ANNOUNCEMENTS_FAIL:

    default:
      return state;
  }
};
