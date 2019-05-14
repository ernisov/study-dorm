import axios from 'axios';

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    return axios.post('/auth/login', { username, password })
      .then((res) => {
        console.log(res);
      });
  });
};
