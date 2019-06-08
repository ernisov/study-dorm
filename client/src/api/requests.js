import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import store from '../store';
import * as storage from '../utils/storage';
import * as auth from './auth';
import { UNSET_USER } from '../modules/User/redux/types';

const tokenKeys = ['accessToken', 'accessTokenExp', 'refreshToken', 'refreshTokenExp'];


/*
  config:
  {
    method: GET/POST/PUT etc.
    url: full url
    data: {
      key: value
      ...
      for request body
    }
  }

  returns axios response object
*/
export const request = (config) => {
  return new Promise((resolve, reject) => {
    let tokens = storage.getItems(tokenKeys);

    tokens.accessTokenExp = moment(+tokens.accessTokenExp);
    tokens.refreshTokenExp = moment(+tokens.refreshTokenExp);
    let now = moment();

    if (tokens.accessTokenExp.isAfter(now)) {
      return resolve(tokens.accessToken);
    }

    if (tokens.refreshTokenExp.isAfter(now)) {
      return auth.refreshToken(tokens.refreshToken)
        .then(({ data }) => {
          let payload = _.pick(data, tokenKeys);
          storage.setItems(payload);
          resolve(payload.accessToken);
        })
        .catch((err) => {
          store.dispatch({ type: UNSET_USER });
          reject(err);
        });
    }

    store.dispatch({ type: UNSET_USER });
  }).then((accessToken) => {
    console.log('CONFIG', config)
    return axios({
      ...config,
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': accessToken
      }
    });
  });
};

export const makeRequest = (config) => {
  return new Promise((resolve, reject) => {
    let tokens = storage.getItems(tokenKeys);
    tokens.accessTokenExp = moment(+tokens.accessTokenExp);
    tokens.refreshTokenExp = moment(+tokens.refreshTokenExp);
    let now = moment();

    if (tokens.accessTokenExp.isAfter(now)) {
      return resolve(tokens.accessToken);
    }

    if (tokens.refreshTokenExp.isAfter(now)) {
      return auth.refreshToken(tokens.refreshToken)
        .then(({ data }) => {
          let payload = _.pick(data, tokenKeys);
          storage.setItems(payload);
          resolve(payload.accessToken);
        })
        .catch((err) => reject(err));
    }
    reject();
  }).then((accessToken) => {
    console.log('REQUEST: ', config);
    return axios({
      ...config,
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': accessToken
      }
    });
  });
};
