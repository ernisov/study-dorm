const INITIAL_STATE = {
  list: [],
  page: 1,
  hasNextPage: true,
  hasPrevPage: false,
  totalDocs: 0,
  totalPages: 0,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default:
      return state;
  }
};
