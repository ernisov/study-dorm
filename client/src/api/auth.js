import axios from 'axios';
import { makeRequest } from './requests';

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/v1/auth/login', { username, password })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const fetchUser = () => {
  return makeRequest({ method: 'get', url: '/auth/' });
};

export const refreshToken = (refreshToken) => {
  return axios.get('/v1/auth/refresh-token',
    {
      headers: {
        'Content-type': 'application/json',
        'x-auth-refresh-token': refreshToken
      }
    });
};
