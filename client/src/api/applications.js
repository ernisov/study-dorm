import { makeRequest } from './requests';

export const apply = (application) => {
  return makeRequest({
    url: '/applications',
    method: 'post',
    data: application
  });
};
