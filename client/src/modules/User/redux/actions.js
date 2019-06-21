import axios from 'axios';
import * as storage from '../../../utils/storage';
import { UNSET_USER } from './types';
import { CHANGE_LANGUAGE } from '../../AppLoading/redux/types';
import i18next from '../../../i18n/i18n';

const tokenKeys = ['accessToken', 'accessTokenExp', 'refreshToken', 'refreshTokenExp'];

export const logoutUser = () => {
  return dispatch => {
    let refreshToken = localStorage.getItem('refreshToken');
    axios({
      method: 'post',
      url: '/v1/auth/logout',
      headers: {
        'Content-type': 'application/json',
        'x-auth-refresh-token': refreshToken
      }
    })
    .then((res) => {
      if (res.status === 200) {
        storage.removeItems([...tokenKeys, 'language']);
        i18next
          .changeLanguage('ru')
          .then(() => dispatch({ type: CHANGE_LANGUAGE, payload: 'ru' }));
        dispatch({ type: UNSET_USER });
      }
    }).catch((err) => {
      let { status } = err.response;
      if (status === 404 && err.response.data.message === 'NoUserFound') {
        storage.removeItems([...tokenKeys, 'language']);
        i18next
          .changeLanguage('ru')
          .then(() => dispatch({ type: CHANGE_LANGUAGE, payload: 'ru' }));
        dispatch({ type: UNSET_USER });
      }
    });
  };
};
