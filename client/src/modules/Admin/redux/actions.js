import {
  CREATE_USER
} from './types';
import { request } from '../../../api/requests';

export const createUser = (user) => {
  return dispatch => {
    request({
      method: 'post',
      url: '/users/',
      data: user
    }).then((response) => {
      let { username, role } = response.data;
      console.log(username, role);
    }).catch(err => console.log(err));
  };
};
