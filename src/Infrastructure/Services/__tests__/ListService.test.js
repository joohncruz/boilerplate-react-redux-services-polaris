import {
  ListRepositoryMock as mockedRepository,
  result as expectedResult,
  resultAdd as expectedResultAdd,
  error,
} from 'Tests/__mocks__/ListRepositoryMock';

import ListService from '../ListService';
import ListRepository from '../../Repositories/ListRepository';

describe('FunctionsService', () => {
  it('should have a default instance when it is not passed one on constructor', () => {
    const listService = new ListService();

    const { listRepository } = listService;

    expect(listRepository instanceof ListRepository).toBeTruthy();
  });

  it('should have a defined prop repository when it is passed on constructor', () => {
    const listService = new ListService(mockedRepository.success);

    const { listRepository } = listService;

    expect(listRepository).toBeTruthy();
    expect(listRepository instanceof ListService).toBeFalsy();
  });

  describe('methods behavior', () => {
    describe('success on request get method', () => {
      const listService = new ListService(mockedRepository.success);

      it('should recieve data from promise resolve of repository', async () => {
        const result = await listService.get();
        expect(result).toBe(expectedResult);
      });
    });

    describe('success on request add method', () => {
      const listService = new ListService(mockedRepository.success);

      it('should recieve data from promise resolve of repository', async () => {
        const result = await listService.add(expectedResultAdd);
        expect(result).toBe(expectedResultAdd);
      });
    });

    describe('fail on request get method', () => {
      const listService = new ListService(mockedRepository.failed);
      it('should recieve error from repository', () => {
        const promise = listService.get();
        promise.catch(e => expect(e).toBe(error));
      });
    });

    describe('fail on request add method', () => {
      const listService = new ListService(mockedRepository.failed);
      it('should recieve error from repository', () => {
        const promise = listService.add(expectedResultAdd);
        promise.catch(e => expect(e).toBe(error));
      });
    });
  });
});
