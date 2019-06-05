import { request } from '../../../api/requests';
import {
  TITLE_CHANGED,
  DESCRIPTION_CHANGED,
  CATEGORY_CHANGED,
  SUBMIT,
  TITLE_INVALID,
  DESCRIPTION_INVALID,
  REQUEST_CREATED,
  REQUEST_FAILED,
  CLEAR_STATE
} from './types';

export const onTitleChange = (e) => {
  return { type: TITLE_CHANGED, payload: e.target.value };
};

export const onDescriptionChange = (e) => {
  return { type: DESCRIPTION_CHANGED, payload: e.target.value };
};

export const onCategoryChange = (category) => {
  return { type: CATEGORY_CHANGED, payload: category };
};

export const onSubmit = (e) => {
  e.preventDefault();
  return (dispatch, getState) => {
    let { title, description, category } = getState().requestForm;
    if (!title) return dispatch({ type: TITLE_INVALID });
    if (!description) return dispatch({ type: DESCRIPTION_INVALID });

    request({
      method: 'post',
      url: '/requests',
      data: {
        title: title,
        description: description,
        category: category
      }
    })
    .then((response) => {
      dispatch({ type: REQUEST_CREATED });
    })
    .catch((error) => {
      dispatch({ type: REQUEST_FAILED, payload: error.response.data.message });
    });
  };
};

export const clearState = () => {
  return { type: CLEAR_STATE };
};
