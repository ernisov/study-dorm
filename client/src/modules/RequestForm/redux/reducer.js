import {
  TITLE_CHANGED,
  DESCRIPTION_CHANGED,
  CATEGORY_CHANGED,
  SUBMIT,
  TITLE_INVALID,
  DESCRIPTION_INVALID,
  REQUEST_CREATED,
  REQUEST_FAILED,
  CLEAR_STATE
} from './types';

const INITIAL_STATE = {
  title: '',
  description: '',
  category: 'other',
  titleInvalid: false,
  descriptionInvalid: false,
  message: '',
  succeded: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TITLE_CHANGED:
      return {
        ...state,
        title: action.payload,
        titleInvalid: false,
        succeded: undefined
      };

    case DESCRIPTION_CHANGED:
      return {
        ...state,
        description: action.payload,
        descriptionInvalid: false,
        succeded: undefined
      };

    case CATEGORY_CHANGED:
      return {
        ...state,
        category: action.payload,
        succeded: undefined
      };

    case TITLE_INVALID:
      return { ...state, titleInvalid: true };

    case DESCRIPTION_INVALID:
      return { ...state, descriptionInvalid: true };

    case REQUEST_CREATED:
      return { ...INITIAL_STATE, succeded: true };

    case REQUEST_FAILED:
      return { ...state,succeded: false, message: action.payload };

    case CLEAR_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
