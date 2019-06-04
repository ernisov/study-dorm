const INITIAL_STATE = {
  dormitory: undefined,
  floor: undefined,
  room: undefined,
  firstName: undefined,
  lastName: undefined,
  role: undefined,
  requests: [],
  loading: true,
  requestsLoading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
