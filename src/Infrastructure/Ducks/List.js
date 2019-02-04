import moment from 'moment';

import ListService from '../Services/ListService';

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
    const listService = new ListService();
    data = await listService.get();
    dispatch(loadListSucceed(data));
  } catch (err) {
    loadListFailed(err);
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_LIST_STARTED:
      return {
        ...state,
        lastUpdateDateTime: moment().toISOString(),
        loading: true,
      };
    case LOAD_LIST_SUCCEED:
      return {
        ...state,
        lastUpdateDateTime: moment().toISOString(),
        loading: false,
        success: true,
        error: null,
        data: [...action.data],
      };
    case LOAD_LIST_FAILED:
      return {
        ...state,
        lastUpdateDateTime: moment().toISOString(),
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
