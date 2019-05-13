import axios from 'axios';
import {
  USERS_LOADED,
  USERS_LOADING
} from './types';

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: USERS_LOADING });
    axios.get('/auth/users')
      .then(res => {
        dispatch({ type: USERS_LOADED, payload: res.data });
      }).catch(err => console.log(err));
  };
}
