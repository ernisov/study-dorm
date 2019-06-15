import { makeRequest } from './requests';

export const loadTenantRequests = (username, page) => {
  return makeRequest({
    url: `/requests/${username}`,
    method: 'get',
    params: { page }
  });
};

export const loadTenantSettlements = (page, username) => {
  return makeRequest({
    url: '/settlements/',
    method: 'get',
    params: {
      page,
      username
    }
  });
};
