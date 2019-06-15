import { makeRequest } from './requests';

export const fetch = (page, action, username) => {
  return makeRequest({
    url: '/settlements/',
    method: 'get',
    params: {
      page,
      action,
      username
    }
  });
};
