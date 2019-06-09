import moment from 'moment';
import * as applications from '../../../api/applications';
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

export const onBirthDateChange = (date) => {
  return { type: CHANGE_BIRTH_DATE, payload: date };
};

export const onIssuedDateChange = (date) => {
  return { type: CHANGE_ISSUED_DATE, payload: date };
};

export const onPassportNumberChange = (e) => {
  return { type: CHANGE_PASSPORT_NUMBER, payload: e.target.value };
};

export const onIssuedByChange = (e) => {
  return { type: CHANGE_ISSUED_BY, payload: e.target.value };
};

export const onAgreementChange = (e) => {
  return { type: CHANGE_AGREED, payload: e.target.checked };
};

export const onSubmit = (e) => {
  e && e.preventDefault();
  return (dispatch, getState) => {
    const {
      passportNumber,
      issuedBy,
      birthDate,
      issuedDate
    } = getState().applicationForm;

    if (!passportNumber) {
      return dispatch({
        type: SET_PASSPORT_NUMBER_INVALID,
        payload: 'field is required!'
      });
    }

    if (passportNumber.length !== 7) {
      return dispatch({
        type: SET_PASSPORT_NUMBER_INVALID,
        payload: 'passport number must be 7 characters long!'
      });
    }

    if (!issuedBy) {
      return dispatch({
        type: SET_ISSUED_BY_INVALID,
        payload: 'field is required!'
      });
    }

    if (!issuedBy.includes('-') || issuedBy.length !== 5) {
      return dispatch({
        type: SET_ISSUED_BY_INVALID,
        payload: `Format is probably wrong.
        Please, make sure it contains dashes and is 5 characters long.`
      });
    }

    const application = {
      birthDate: birthDate.toDate(),
      issuedDate: issuedDate.toDate(),
      passportNumber,
      issuedBy
    };

    applications.apply(application)
      .then((response) => {
        dispatch({ type: SET_APPLICATION_SENT });
      })
      .catch((error) => {
        let { status } = error.response;
        if (status === 304) {
          return dispatch({ type: SET_ERROR, payload: 'You have already applied' });
        }

        dispatch({
          type: SET_ERROR,
          payload: 'Something must have gone wron. Please, try again '
        });
      });
  };
};
