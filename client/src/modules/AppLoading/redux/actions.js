import * as storage from '../../../utils/storage';
import * as auth from '../../../api/auth';
import { SET_APP_READY, CHANGE_LANGUAGE } from './types';
import { SET_USER } from '../../User/redux/types';
import i18next from '../../../i18n/i18n';

export const setup = () => {
  return (dispatch, getState) => {
    auth.fetchUser()
      .then((response) => {
        dispatch({ type: SET_USER, payload: response.data });
        dispatch({ type: SET_APP_READY, payload: true });
      })
      .catch((error) => dispatch({ type: SET_APP_READY, payload: true }));
  };
};

export const changeLanguage = (language) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_APP_READY, payload: false });
    i18next.changeLanguage(language)
      .then(() => dispatch({ type: CHANGE_LANGUAGE, payload: language }))
      .catch((error) => console.log(error));
  };
};
