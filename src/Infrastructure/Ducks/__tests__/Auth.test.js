import moment from 'moment';
import MockDate from 'mockdate';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { result as data } from 'Tests/__mocks__/AuthRepositoryMock';

import { reducers as reducersList } from '../reducer';

import reducer, {
  DUCK_NAME,
  INITIAL_STATE,
  LOAD_AUTH_FAILED,
  LOAD_AUTH_STARTED,
  LOAD_AUTH_SUCCEED,
  loadAuthFailed,
  loadAuthStarted,
  loadAuthSucceed,
  loadAuth,
} from '../Auth';

// return same thing on data. babel won't allow to use jest.mock after var declarations
jest.mock('../../services/AuthService.js', () => jest.fn().mockImplementation(() => ({
  login: () => ({
    id: 1,
    success: true,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    tokenType: 'bearer',
    expiresIn: 1800,
  }),
})));

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const MOMENT_NOW = moment().toISOString();
MockDate.set(MOMENT_NOW);

const error = new Error();
const ACTION_AUTH_STARTED = { type: LOAD_AUTH_STARTED };
const ACTION_AUTH_SUCCEED = { type: LOAD_AUTH_SUCCEED, data };
const ACTION_AUTH_FAILED = { type: LOAD_AUTH_FAILED, error };

const formLoadAuth = { email: 'test@test.com', password: '123' };

describe('duck auth', () => {
  let store = null;

  beforeEach(() => {
    store = mockStore({ [DUCK_NAME]: INITIAL_STATE });
  });

  it('reducer should be on reducers list', () => {
    expect(reducersList[DUCK_NAME]).toBeDefined();
    expect(reducersList[DUCK_NAME]).toBe(reducer);
  });

  describe('reloads ducks notifications', () => {
    describe('actions creators', () => {
      it('should return ACTION_AUTH_STARTED on call loadAuthStarted', () => {
        expect(loadAuthStarted()).toEqual(ACTION_AUTH_STARTED);
      });
      it('should return ACTION_AUTH_SUCCEED on call loadAuthSucceed', () => {
        expect(loadAuthSucceed(data)).toEqual(ACTION_AUTH_SUCCEED);
      });
      it('should return ACTION_AUTH_FAILED on call loadAuthFailed', () => {
        expect(loadAuthFailed(error)).toEqual(ACTION_AUTH_FAILED);
      });
    });

    describe('dispatches', () => {
      it('should dispatch ACTION_AUTH_STARTED on call loadauth() and there is no data on store', async () => {
        await store.dispatch(loadAuth(formLoadAuth));

        const actions = store.getActions();

        expect(actions).toContainEqual(ACTION_AUTH_STARTED);
      });

      it('should dispatch ACTION_AUTH_SUCCEED when service returns successfuly a response', async () => {
        await store.dispatch(loadAuth(formLoadAuth));

        const expectedActions = [ACTION_AUTH_STARTED, loadAuthSucceed(data)];
        const actions = store.getActions();

        expect(actions).toEqual(expectedActions);
      });

      it('should dispatch ACTION_AUTH_FAILED when service returns error', () => {
        const promiseReturned = store.dispatch(loadAuth(formLoadAuth));

        promiseReturned.catch((catchedError) => {
          const expectedActions = [ACTION_AUTH_STARTED, loadAuthFailed(catchedError)];
          const actions = store.getActions();

          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe('reducer', () => {
      it('handles ACTION_AUTH_STARTED correctly', () => {
        const { auth: state } = store.getState();

        const expectedResult = {
          ...state,
          lastUpdateDateTime: MOMENT_NOW,
          loginLoading: true,
        };
        const result = reducer(INITIAL_STATE, loadAuthStarted());

        expect(result).toEqual(expectedResult);
      });

      it('handles ACTION_SUCCED correctly', () => {
        const { auth: state } = store.getState();

        const expectedResult = {
          ...state,
          lastUpdateDateTime: moment().toISOString(),
          loginLoading: false,
          logged: true,
          success: true,
          data,
        };
        const result = reducer(INITIAL_STATE, loadAuthSucceed(data));

        expect(result).toEqual(expectedResult);
      });

      it('handles ACTION_AUTH_FAILED correctly', () => {
        const { auth: state } = store.getState();

        const expectedResult = {
          ...state,
          lastUpdateDateTime: moment().toISOString(),
          loginLoading: false,
          logged: false,
          success: false,
          loginError: error,
        };
        const result = reducer(INITIAL_STATE, loadAuthFailed(error));

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
