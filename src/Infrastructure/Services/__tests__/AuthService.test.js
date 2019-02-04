import {
  AuthRepositoryMock as mockedRepository,
  result as expectedResult,
  error,
} from 'Tests/__mocks__/AuthRepositoryMock';

import AuthService from '../AuthService';
import AuthRepository from '../../Repositories/AuthRepository';

describe('FunctionsService', () => {
  it('should have a default instance when it is not passed one on constructor', () => {
    const authService = new AuthService();

    const { authRepository } = authService;

    expect(authRepository instanceof AuthRepository).toBeTruthy();
  });

  it('should have a defined prop repository when it is passed on constructor', () => {
    const authService = new AuthService(mockedRepository.success);

    const { authRepository } = authService;

    expect(authRepository).toBeTruthy();
    expect(authRepository instanceof AuthService).toBeFalsy();
  });

  describe('methods behavior', () => {
    describe('success on request', () => {
      const authService = new AuthService(mockedRepository.success);
      const form = { email: 'test@test.com', password: '123' };

      it('should recieve data from promise resolve of repository', async () => {
        const result = await authService.login(form);
        expect(result).toBe(expectedResult);
      });
    });

    describe('fail on request', () => {
      const authService = new AuthService(mockedRepository.failed);
      const form = { email: 'test@test.com', password: '123' };

      it('should recieve error from repository', () => {
        const promise = authService.login(form);
        promise.catch(e => expect(e).toBe(error));
      });
    });
  });
});
