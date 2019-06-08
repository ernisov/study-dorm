import * as storage from '../../../utils/storage';
import * as auth from '../../../api/auth';
import { SET_APP_READY } from './types';
import { SET_USER } from '../../User/redux/types';


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
