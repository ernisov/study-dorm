import * as storage from '../../../utils/storage';
import * as auth from '../../../api/auth';
import { SET_APP_READY, CHANGE_LANGUAGE } from './types';
import { SET_USER } from '../../User/redux/types';
import i18next from '../../../i18n/i18n';

export const setup = () => {
  return (dispatch, getState) => {
    const setLang = () => {
      let language = storage.getItems('language');
      if (!language) {
        storage.setItems({ language: 'ru' });
        language = 'ru';
      }

      i18next
        .changeLanguage(language)
        .then(() => dispatch({ type: CHANGE_LANGUAGE, payload: language }))
        .catch((error) => console.log(error));
    };

    auth.fetchUser()
      .then((response) => {
        dispatch({ type: SET_USER, payload: response.data });
        setLang();
      })
      .catch((error) => {
        console.log(error.response);
        setLang();
      });
  };
};

export const changeLanguage = (language) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_APP_READY, payload: false });
    i18next.changeLanguage(language)
      .then(() => {
        storage.setItems({ language });
        dispatch({ type: CHANGE_LANGUAGE, payload: language });
      })
      .catch((error) => console.log(error));
  };
};
