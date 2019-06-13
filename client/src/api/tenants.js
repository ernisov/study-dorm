import { makeRequest } from './requests';

export const loadTenantRequests = (username, page) => {
  return makeRequest({
    url: `/requests/${username}`,
    method: 'get',
    params: { page }
  });
};
