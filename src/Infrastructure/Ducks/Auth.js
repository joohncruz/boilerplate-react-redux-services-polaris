import moment from 'moment';

import AuthService from '../Services/AuthService';
import AuthRepository from '../Repositories/AuthRepository';

import { Token } from '../../Common/Helpers/AuthHelper';
// import { history } from '../../Redux/helpers';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export const DUCK_NAME = 'auth';

export const INITIAL_STATE = {
  lastUpdateDateTime: null,
  data: {},
  logged: false,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
  logoutError: null,
  keepLoggedIn: false,
};

export const LOAD_AUTH_STARTED = `${DUCK_NAME}/LOAD_AUTH_STARTED`;
export const LOAD_AUTH_SUCCEED = `${DUCK_NAME}/LOAD_AUTH_SUCCEED`;
export const LOAD_AUTH_FAILED = `${DUCK_NAME}/LOAD_AUTH_FAILED`;

export const loadAuthStarted = () => ({ type: LOAD_AUTH_STARTED });
export const loadAuthSucceed = data => ({ type: LOAD_AUTH_SUCCEED, data });
export const loadAuthFailed = error => ({ type: LOAD_AUTH_FAILED, error });

export const loadAuth = ({ email, password, options = { reload: false }}) =>
  async (dispatch, getState) => {

    dispatch(loadAuthStarted());

    let data = {};

    try {
      data = await authService.authenticate({ email, password });
      Token.save(data);
      dispatch(loadAuthSucceed(data));
      // TODO: Criar camadas para o user
      // await dispatch(loadUser(results.data.id))
      // TODO: Pensar como fazer da melhor forma um history.push('/')
      // history.push('/');
    } catch (error) {
      loadAuthFailed(error);
    }

  }

export const LOAD_LOGOUT_STARTED = `${DUCK_NAME}/LOAD_LOGOUT_STARTED`;
export const LOAD_LOGOUT_FAILED = `${DUCK_NAME}/LOAD_LOGOUT_FAILED`;
export const LOAD_LOGOUT_SUCCEED = `${DUCK_NAME}/LOGOUT_SUCCEED`;

export const loadLogoutStarted = () => ({ type: LOAD_LOGOUT_STARTED });
export const loadLogoutSucceed = (data = {}) => ({ type: LOAD_LOGOUT_SUCCEED, data });
export const loadLogoutFailed = error => ({ type: LOAD_LOGOUT_FAILED, error });

export const loadLogout = () =>
  async (dispatch) => {
    dispatch(loadLogoutStarted());
    try {
      Token.remove();
      dispatch(loadLogoutSucceed());
      window.stop();
      return Promise.resolve({});
    } catch (error) {
      dispatch(loadLogoutFailed(error.response.data));
      return Promise.reject(error.response);
    }
  }

// Reducer
const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case LOAD_AUTH_STARTED:
      return {
        ...state,
        loginLoading: true,
      };
    case LOAD_AUTH_SUCCEED:
      return {
        ...state,
        lastUpdateDateTime: moment().toISOString(),
        logged: true,
        loginLoading: false,
        loginError: false,
        data: {
          ...action.data
        },
      };
    case LOAD_AUTH_FAILED:
      return {
        ...state,
        logged: false,
        loginLoading: false,
        loginError: action.error,
      };

    case LOAD_LOGOUT_STARTED:
      return {
        ...state,
        logoutLoading: true,
      };
    case LOAD_LOGOUT_SUCCEED:
      return {
        ...state,
        lastUpdateDateTime: moment().toISOString(),
        logged: false,
        logoutLoading: false,
        logoutError: null,
        data: {},
      };
    case LOAD_LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };

    default: return state;
  }

}

export default reducer;