import { login } from '../../../api/auth';
import * as storage from '../../../utils/storage';
import _ from 'lodash';
import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  SET_USERNAME_INVALID,
  SET_PASSWORD_INVALID,
  SET_USER
} from './types';

export const onUsernameChange = (e) => {
  return { type: CHANGE_USERNAME, payload: e.target.value };
};

export const onPasswordChange = (e) => {
  return { type: CHANGE_PASSWORD, payload: e.target.value };
};

export const onSubmit = (e) => {
  e.preventDefault();
  return (dispatch, getState) => {
    const { username, password } = getState().loginForm;
    if (!username) {
      return dispatch({ type: SET_USERNAME_INVALID, payload: 'username is required' });
    }
    if (!password || password.length < 5) {
      return dispatch({ type: SET_PASSWORD_INVALID, payload: 'password must be minimum 5 characters long' });
    }

    login(username, password)
      .then((response) => {
        let tokens = _.pick(response.data, [
          'accessToken',
          'accessTokenExp',
          'refreshToken',
          'refreshTokenExp'
        ]);

        let user = _.pick(response.data, [
          'username',
          'firstName',
          'lastName',
          'role'
        ]);

        storage.setItems(tokens);
        dispatch({ type: SET_USER, payload: user });
      })
      .catch((error) => {
        let errorIn = error.response.data.in;
        let { message } = error.response.data;
        if (errorIn === 'username') {
          dispatch({ type: SET_USERNAME_INVALID, payload: message });
        } else {
          dispatch({ type: SET_PASSWORD_INVALID, payload: message });
        }
      });
  };
};
