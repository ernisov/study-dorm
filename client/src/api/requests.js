import axios from 'axios';
import moment from 'moment';
import store from '../store';
import { LOGIN_FAIL } from '../modules/User/redux/types';

export const request = (config) => {
  return new Promise((resolve, reject) => {
    let accessTokenExp = moment(+localStorage.getItem('accessTokenExp'));
    let refreshTokenExp = moment(+localStorage.getItem('refreshTokenExp'));
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    let now = moment();

    if (accessTokenExp.isAfter(now)) {
      return resolve(accessToken);
    }

    if (refreshTokenExp.isAfter(now)) {
      return axios.get('/auth/refresh-token',
        {
          headers: {
            'Content-type': 'application/json',
            'x-auth-refresh-token': refreshToken
          }
        }).then(({ data }) => {
            let payload = {
              accessToken: data.accessToken,
              accessTokenExp: data.accessTokenExp,
              refreshToken: data.refreshToken,
              refreshTokenExp: data.refreshTokenExp
            };

            for (let key in payload) {
              localStorage.setItem(key, payload[key]);
            }

            return resolve(payload.accessToken);
        }).catch((err) => store.dispatch({ type: LOGIN_FAIL }));
    }

    store.dispatch({ type: LOGIN_FAIL });
  }).then((accessToken) => {
    return axios({
      ...config,
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': accessToken
      }
    });
  });
};
