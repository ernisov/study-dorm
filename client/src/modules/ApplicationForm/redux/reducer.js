import moment from 'moment';
import {
  CHANGE_BIRTH_DATE,
  CHANGE_ISSUED_DATE,
  CHANGE_PASSPORT_NUMBER,
  CHANGE_ISSUED_BY,
  CHANGE_AGREED,
  SET_PASSPORT_NUMBER_INVALID,
  SET_ISSUED_BY_INVALID,
  SET_ERROR,
  SET_APPLICATION_SENT
} from './types';

const INITIAL_STATE = {
  birthDate: moment('2015-01-01'),
  issuedDate: moment('2015-01-01'),
  passportNumber: '',
  issuedBy: '',
  passportNumberInvalid: false,
  issuedByInvalid: false,
  agreed: false,
  error: '',
  sent: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_BIRTH_DATE:
      return { ...state, birthDate: action.payload, sent: false };

    case CHANGE_ISSUED_DATE:
      return { ...state, issuedDate: action.payload, sent: false };

    case CHANGE_PASSPORT_NUMBER:
      return {
        ...state,
        passportNumber: action.payload,
        passportNumberInvalid: false,
        sent: false
      };

    case CHANGE_ISSUED_BY:
      return {
        ...state,
        issuedBy: action.payload,
        issuedByInvalid: false,
        sent: false
      };

    case CHANGE_AGREED:
      return { ...state, agreed: action.payload, sent: false };

    case SET_PASSPORT_NUMBER_INVALID:
      return { ...state, passportNumberInvalid: true, error: action.payload };

    case SET_ISSUED_BY_INVALID:
      return { ...state, issuedByInvalid: true, error: action.payload };

    case SET_APPLICATION_SENT:
      return { ...INITIAL_STATE, sent: true };

    case SET_ERROR:
      return { ...INITIAL_STATE, error: action.payload, sent: true };

    default:
      return state;
  }
};
