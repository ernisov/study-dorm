import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import DormitoryReducer from './modules/Dormitory/redux/reducer';
import UserReducer from './modules/User/redux/reducer';
import AdminUsersReducer from './modules/Admin/redux/reducer';
import AnnouncementsReducer from './modules/Announcements/redux/reducer';
import ApplicationsReducer from './modules/Applications/redux/reducer';
import TenantsReducer from './modules/Tenants/redux/reducer';
import SettlementFormReducer from './modules/SettlementForm/redux/reducer';
import TenantDetailsReducer from './modules/TenantDetails/redux/reducer';
import AddTenantReducer from './modules/AddTenant/redux/reducer';
import RequestsReducer from './modules/Requests/redux/reducer';
import RequestFormReducer from './modules/RequestForm/redux/reducer';
import LoginFormReducer from './modules/User/redux/loginFormReducer';
import AppLoadingReducer from './modules/AppLoading/redux/reducer';
import ApplicationFormReducer from './modules/ApplicationForm/redux/reducer';

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
  tenantDetails: TenantDetailsReducer,
  addTenant: AddTenantReducer,
  requests: RequestsReducer,
  requestForm: RequestFormReducer,
  loginForm: LoginFormReducer,
  app: AppLoadingReducer,
  applicationForm: ApplicationFormReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
