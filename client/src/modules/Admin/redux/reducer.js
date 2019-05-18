import {
  CREATE_USER
} from './types';

const INITIAL_STATE = {
  page: 1,
  users: [],
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false,
  initialLoading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {


    default:
      return state;
  }
};
