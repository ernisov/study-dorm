import * as settlements from '../../../api/settlements';
import {
  SET_SETTLEMENTS_LOADING,
  LOAD_SETTLEMENTS_SUCCESS,
  LOAD_SETTLEMENTS_FAIL,
  CHANGE_ACTION,
  CLEAR_SETTLEMENTS_STATE
} from './types';

export const loadSettlements = () => {
  return (dispatch, getState) => {
    let { page, action } = getState().settlements;
    if (action === 'all') action = '';

    dispatch({ type: SET_SETTLEMENTS_LOADING });

    settlements.fetch(page, action)
      .then((response) => {
        dispatch({ type: LOAD_SETTLEMENTS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: LOAD_SETTLEMENTS_FAIL });
      });
  };
};

export const onActionChange = (e) => {
  return { type: CHANGE_ACTION, payload: e.target.value };
};

export const clearSettlements = () => {
  return { type: CLEAR_SETTLEMENTS_STATE };
};
