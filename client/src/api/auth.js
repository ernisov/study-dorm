import axios from 'axios';
import { makeRequest } from './requests';

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/auth/login', { username, password })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const fetchUser = () => {
  return makeRequest({ method: 'get', url: '/auth/' });
};

export const refreshToken = (refreshToken) => {
  return axios.get('/auth/refresh-token',
    {
      headers: {
        'Content-type': 'application/json',
        'x-auth-refresh-token': refreshToken
      }
    });
};
