import {
  TITLE_CHANGED,
  DESCRIPTION_CHANGED,
  CATEGORY_CHANGED,
  SUBMIT,
  TITLE_INVALID,
  DESCRIPTION_INVALID,
  REQUEST_CREATED,
  REQUEST_FAILED
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
      return { ...state, title: action.payload, titleInvalid: false };

    case DESCRIPTION_CHANGED:
      return { ...state, description: action.payload, descriptionInvalid: false };

    case CATEGORY_CHANGED:
      return { ...state, category: action.payload };

    case TITLE_INVALID:
      return { ...state, titleInvalid: true };

    case DESCRIPTION_INVALID:
      return { ...state, descriptionInvalid: true };

    case REQUEST_CREATED:
      return { ...INITIAL_STATE, succeded: true };

    case REQUEST_FAILED:
      return { ...state,succeded: false, message: action.payload };

    default:
      return state;
  }
};
