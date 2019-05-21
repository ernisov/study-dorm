import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import DormitoryReducer from './modules/Dormitory/redux/reducer';
import UserReducer from './modules/User/redux/reducer';
import AdminUsersReducer from './modules/Admin/redux/reducer';
import AnnouncementsReducer from './modules/Announcements/redux/reducer';
import ApplicationsReducer from './modules/Applications/redux/reducer';

const initialState = {};
const middleware = [ReduxThunk];

const reducers = combineReducers({
  dormitory: DormitoryReducer,
  user: UserReducer,
  adminUsers: AdminUsersReducer,
  announcements:AnnouncementsReducer,
  applications: ApplicationsReducer
});

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
