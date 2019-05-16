import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOADING_FALSE,
  LOADING_TRUE,
  ACCESS_TOKEN_VALID
} from './types';

export const loginUser = (username, password) => {
  return dispatch => {
    dispatch({ type: LOADING_TRUE });
    axios.post('/auth/login', { username, password })
      .then((res) => {
        dispatch({ type: LOADING_FALSE });
        if (res.status === 200) {
          let {
            accessToken,
            refreshToken,
            accessTokenExp,
            refreshTokenExp,
            username,
            role
          } = res.data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('accessTokenExp', accessTokenExp);
          localStorage.setItem('refreshTokenExp', refreshTokenExp);

          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              username,
              accessToken,
              role
            }
          });
        }
      }).catch(err => console.log(err));
  };
};

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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExp');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExp');

        dispatch({ type: LOGOUT_SUCCESS });
      }
    }).catch((err) => {
      let { status } = err.response;
      if (status === 404 && err.response.data.message === 'NoUserFound') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExp');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExp');

        dispatch({ type: LOGOUT_FAIL });
      }
    });
  };
};

export const loadUser = (accessToken, refreshToken) => {
  return (dispatch) => {
    axios.get('/auth/', { headers: {
      'Content-type': 'application/json',
      'x-auth-token': accessToken
    }}).then((res) => {
      dispatch({ type: LOADING_FALSE });
      if (res.status === 200) {
        let { username, role } = res.data;
        return dispatch({
          type: ACCESS_TOKEN_VALID,
          payload: { username, role, accessToken }
        });
      }
    }).catch(err => {
      if (err.response.status === 401) {
        axios.get('/auth/refresh-token', {
          headers: {
            'Content-type': 'application/json',
            'x-auth-refresh-token': refreshToken
          }
        }).then((res) => {
          dispatch({ type: LOADING_FALSE });
          if (res.status === 200) {
            let {
              accessToken,
              refreshToken,
              accessTokenExp,
              refreshTokenExp,
              username,
              role
            } = res.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessTokenExp', accessTokenExp);
            localStorage.setItem('refreshTokenExp', refreshTokenExp);

            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                username,
                accessToken,
                role
              }
            });
          }
        }).catch(err => {
          let { status } = err.response;
          if (status === 404 || status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenExp');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('refreshTokenExp');
            dispatch({ type: LOGIN_FAIL });
          }
        });
      }
    });
  };
};

export const loadingFalse = () => {
  return { type: LOADING_FALSE };
};
