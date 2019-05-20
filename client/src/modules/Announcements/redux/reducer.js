import {
  CREATE_ANNOUNCEMENT,
  LOAD_ANNOUNCEMENTS,
  LOAD_ANNOUNCEMENTS_FAIL,
  SET_LOADING,
  DELETE_ANNOUNCEMENT_SUCCESS,
  DELETE_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_UPDATED
} from './types';

const INITIAL_STATE = {
  page: 1,
  announcements: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false,
  success: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case CREATE_ANNOUNCEMENT:
      return {
        ...state,
        success: true
      }

    case LOAD_ANNOUNCEMENTS:
      return {
        ...state,
        ...action.payload,
        announcements: [...state.announcements, ...action.payload.list],
        loading: false,
        page: state.page + 1
      }

    case DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        announcements: state.announcements.filter(a => a.id !== action.payload.id)
      };

    case ANNOUNCEMENT_UPDATED:
      return {
        ...state,
        announcements: state.announcements.map(a => {
          if (a.id === action.payload.old.id) {
            return action.payload.newAnnouncement;
          }
          return a;
        }),
      };

    case DELETE_ANNOUNCEMENT_FAIL:
    case LOAD_ANNOUNCEMENTS_FAIL:
    default:
      return state;
  }
};
