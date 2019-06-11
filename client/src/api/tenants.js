import { makeRequest } from './requests';

export const loadTenantRequests = (username) => {
  return makeRequest({
    url: '/'
  });
};
