import { API_URL } from 'Common/Helpers/ApiHelper';

import AuthRepository from '../AuthRepository';

describe('AuthRepository', () => {
  describe('AuthRepository instance', () => {
    // repository url falllows this pattern
    // `${routePrefix}/${routeVersion}/auth/authenticate`;
    const newRoutePrefix = 'routePrefix';
    const newRouteVersion = 'v99';

    it('should instantiate with default url if no params is passed', () => {
      const noAll = new AuthRepository();
      const { url: noAllUrl } = noAll;
      const expectedNoAllUrl = `${API_URL}/v1/auth/authenticate`;
      expect(noAllUrl).toBe(expectedNoAllUrl);
    });

    it('should instantiate with default route prefix if only it is not passed', () => {
      const noRoutePrefix = new AuthRepository({ routeVersion: newRouteVersion });
      const { url: noRoutePrefixUrl } = noRoutePrefix;
      const expectedNoRoutePrefix = `${API_URL}/${newRouteVersion}/auth/authenticate`;
      expect(noRoutePrefixUrl).toBe(expectedNoRoutePrefix);
    });

    it('should instantiate with default route version if only it is not passed', () => {
      const noRouteVersion = new AuthRepository({ routePrefix: newRoutePrefix });
      const { url: noRouteVersionUrl } = noRouteVersion;
      const expectedNoRouteVersionUrl = `${newRoutePrefix}/v1/auth/authenticate`;
      expect(noRouteVersionUrl).toBe(expectedNoRouteVersionUrl);
    });
  });

  describe('methods behavior', () => {
    const authRepository = new AuthRepository();
    it('should have post method', () => {
      const { post } = authRepository;
      expect(post).toBeTruthy();
    });

    it('post must return a promise', () => {
      const returned = authRepository.post({ email: 'test@test.com', password: '123' });
      expect(returned instanceof Promise).toBeTruthy();
    });
  });
});
