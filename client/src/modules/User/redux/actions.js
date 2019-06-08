import axios from 'axios';
import * as storage from '../../../utils/storage';
import { UNSET_USER } from './types';

const tokenKeys = ['accessToken', 'accessTokenExp', 'refreshToken', 'refreshTokenExp'];

export const logoutUser = () => {
  return dispatch => {
    let refreshToken = localStorage.getItem('refreshToken');
    axios({
      method: 'post',
      url: '/auth/logout',
      headers: {
        'Content-type': 'application/json',
        'x-auth-refresh-token': refreshToken
      }
    })
    .then((res) => {
      if (res.status === 200) {
        storage.removeItems(tokenKeys);
        dispatch({ type: UNSET_USER });
      }
    }).catch((err) => {
      let { status } = err.response;
      if (status === 404 && err.response.data.message === 'NoUserFound') {
        storage.removeItems(tokenKeys);
        dispatch({ type: UNSET_USER });
      }
    });
  };
};
