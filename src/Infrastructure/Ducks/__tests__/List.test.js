import moment from 'moment';
import MockDate from 'mockdate';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { result as data } from 'Tests/__mocks__/ListRepositoryMock';

import { reducers as reducersList } from '../reducer';

import reducer, {
  DUCK_NAME,
  INITIAL_STATE,
  LOAD_LIST_STARTED,
  LOAD_LIST_SUCCEED,
  LOAD_LIST_FAILED,
  loadList,
  loadListStarted,
  loadListSucceed,
  loadListFailed,
} from '../List';

// return same thing on data. babel won't allow to use jest.mock after var declarations
jest.mock('../../services/ListService.js', () => jest.fn().mockImplementation(() => ({
  get: () => ([
    {
      id: 1,
      text: 'TESTE 1',
    },
    {
      id: 2,
      text: 'TESTE 2',
    },
    {
      id: 3,
      text: 'TESTE 3',
    },
    {
      id: 4,
      text: 'TESTE 4',
    },
  ]),
  add: () => ({
    id: 1,
    text: 'TESTE 1',
  }),
})));

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const MOMENT_NOW = moment().toISOString();
MockDate.set(MOMENT_NOW);

const error = new Error();
const ACTION_LIST_STARTED = { type: LOAD_LIST_STARTED };
const ACTION_LIST_SUCCEED = { type: LOAD_LIST_SUCCEED, data };
const ACTION_LIST_FAILED = { type: LOAD_LIST_FAILED, error };

describe('duck list', () => {
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
      it('should return ACTION_LIST_STARTED on call loadListStarted', () => {
        expect(loadListStarted()).toEqual(ACTION_LIST_STARTED);
      });
      it('should return ACTION_LIST_SUCCEED on call loadListSucceed', () => {
        expect(loadListSucceed(data)).toEqual(ACTION_LIST_SUCCEED);
      });
      it('should return ACTION_LIST_FAILED on call loadListFailed', () => {
        expect(loadListFailed(error)).toEqual(ACTION_LIST_FAILED);
      });
    });

    describe('dispatches', () => {
      it('should dispatch ACTION_LIST_STARTED on call loadlist() and there is no data on store', async () => {
        await store.dispatch(loadList());

        const actions = store.getActions();

        expect(actions).toContainEqual(ACTION_LIST_STARTED);
      });

      it('should dispatch ACTION_LIST_SUCCEED when service returns successfuly a response', async () => {
        await store.dispatch(loadList());

        const expectedActions = [ACTION_LIST_STARTED, loadListSucceed(data)];
        const actions = store.getActions();

        expect(actions).toEqual(expectedActions);
      });

      it('should dispatch ACTION_LIST_FAILED when service returns error', () => {
        const promiseReturned = store.dispatch(loadList());

        promiseReturned.catch((catchedError) => {
          const expectedActions = [ACTION_LIST_STARTED, loadListFailed(catchedError)];
          const actions = store.getActions();

          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe('reducer', () => {
      it('handles ACTION_LIST_STARTED correctly', () => {
        const { list: state } = store.getState();

        const expectedResult = {
          ...state,
          lastUpdateDateTime: MOMENT_NOW,
          loading: true,
        };
        const result = reducer(INITIAL_STATE, loadListStarted());

        expect(result).toEqual(expectedResult);
      });

      it('handles ACTION_SUCCEED correctly', () => {
        const { list: state } = store.getState();

        const expectedResult = {
          ...state,
          lastUpdateDateTime: moment().toISOString(),
          loading: false,
          success: true,
          error: null,
          data,
        };
        const result = reducer(INITIAL_STATE, loadListSucceed(data));

        expect(result).toEqual(expectedResult);
      });

      it('handles ACTION_LIST_FAILED correctly', () => {
        const { list: state } = store.getState();

        const expectedResult = {
          ...state,
          lastUpdateDateTime: moment().toISOString(),
          loading: false,
          success: false,
          error,
        };
        const result = reducer(INITIAL_STATE, loadListFailed(error));

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
