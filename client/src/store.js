import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import DormitoryReducer from './modules/Dormitory/redux/reducer';
import UserReducer from './modules/User/redux/reducer';
import AdminUsersReducer from './modules/Admin/redux/reducer';
import AnnouncementsReducer from './modules/Announcements/redux/reducer';
import ApplicationsReducer from './modules/Applications/redux/reducer';
import TenantsReducer from './modules/Tenants/redux/reducer';
import SettlementFormReducer from './modules/SettlementForm/redux/reducer';
import TenantDetailsReducer from './modules/TenantDetails/redux/reducer';

const initialState = {};
const middleware = [ReduxThunk];

const reducers = combineReducers({
  dormitory: DormitoryReducer,
  user: UserReducer,
  adminUsers: AdminUsersReducer,
  announcements:AnnouncementsReducer,
  applications: ApplicationsReducer,
  tenants: TenantsReducer,
  settlementForm: SettlementFormReducer,
  tenantDetails: TenantDetailsReducer
});

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
