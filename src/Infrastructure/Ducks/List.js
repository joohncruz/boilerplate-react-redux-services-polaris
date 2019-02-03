import moment from 'moment';

import ListService from '../Services/ListService';
import ListRepository from '../Repositories/ListRepository';

const listRepository = new ListRepository();
const listService = new ListService(listRepository);

export const DUCK_NAME = 'list';

export const INITIAL_STATE = {
  lastUpdateDateTime: null,
  loading: false,
  success: false,
  error: null,
  data: [],
};

export const LOAD_LIST_STARTED = `${DUCK_NAME}/LOAD_LIST_STARTED`;
export const LOAD_LIST_SUCCEED = `${DUCK_NAME}/LOAD_LIST_SUCCEED`;
export const LOAD_LIST_FAILED = `${DUCK_NAME}/LOAD_LIST_FAILED`;

export const loadListStarted = () => ({ type: LOAD_LIST_STARTED });
export const loadListSucceed = data => ({ type: LOAD_LIST_SUCCEED, data });
export const loadListFailed = error => ({ type: LOAD_LIST_FAILED, error });

export const loadList = () => async (dispatch) => {
  dispatch(loadListStarted());

  let data = {};

  try {
    data = await listService.get();
    dispatch(loadListSucceed(data));
  } catch (error) {
    loadListFailed(error);
  }
};

export const LOAD_LIST_ADD_STARTED = `${DUCK_NAME}/LOAD_LIST_ADD_STARTED`;
export const LOAD_LIST_ADD_FAILED = `${DUCK_NAME}/LOAD_LIST_ADD_FAILED`;
export const LOAD_LIST_ADD_SUCCEED = `${DUCK_NAME}/LOGOUT_SUCCEED`;

export const loadListAddStarted = () => ({ type: LOAD_LIST_ADD_STARTED });
export const loadListAddSucceed = (data = {}) => ({
  type: LOAD_LIST_ADD_SUCCEED,
  data,
});
export const loadListAddFailed = error => ({
  type: LOAD_LIST_ADD_FAILED,
  error,
});

export const loadListAdd = ({ id, text } = {}) => async (dispatch) => {
  dispatch(loadListAddStarted());

  let data = null;

  try {
    data = await listService.get({ id, text });
    dispatch(loadListAddSucceed(data));
    return Promise.resolve(data);
  } catch (error) {
    dispatch(loadListAddFailed(error.response.data));
    return Promise.reject(error.response);
  }
};

// Reducer
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_LIST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOAD_LIST_SUCCEED:
      return {
        ...state,
        lastUpdateDateTime: moment().toISOString(),
        loading: false,
        error: null,
        data: [...action.data],
      };
    case LOAD_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case LOAD_LIST_ADD_STARTED:
      return {
        ...state,
        logoutLoading: true,
      };
    case LOAD_LIST_ADD_SUCCEED:
      return {
        ...state,
        lastUpdateDateTime: moment().toISOString(),
        logged: false,
        logoutLoading: false,
        logoutError: null,
        data: [],
      };
    case LOAD_LIST_ADD_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
