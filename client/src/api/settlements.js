import { makeRequest } from './requests';

export const fetch = (page, action) => {
  return makeRequest({
    url: '/settlements/',
    method: 'get',
    params: {
      page,
      action
    }
  });
};
