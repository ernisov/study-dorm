import { makeRequest } from './requests';

export const details = () => {
  return makeRequest({
    url: '/dormitory/',
    method: 'get'
  });
};
