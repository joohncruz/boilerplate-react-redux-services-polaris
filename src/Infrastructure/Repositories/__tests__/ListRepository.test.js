import { API_URL } from 'Common/Helpers/ApiHelper';

import ListRepository from '../ListRepository';

describe('ListRepository', () => {
  describe('ListRepository instance', () => {
    // repository url falllows this pattern
    // `${routePrefix}/${routeVersion}/list`;
    const newRoutePrefix = 'routePrefix';
    const newRouteVersion = 'v99';

    it('should instantiate with default url if no params is passed', () => {
      const noAll = new ListRepository();
      const { url: noAllUrl } = noAll;
      const expectedNoAllUrl = `${API_URL}/v1/list`;
      expect(noAllUrl).toBe(expectedNoAllUrl);
    });

    it('should instantiate with default route prefix if only it is not passed', () => {
      const noRoutePrefix = new ListRepository({ routeVersion: newRouteVersion });
      const { url: noRoutePrefixUrl } = noRoutePrefix;
      const expectedNoRoutePrefix = `${API_URL}/${newRouteVersion}/list`;
      expect(noRoutePrefixUrl).toBe(expectedNoRoutePrefix);
    });

    it('should instantiate with default route version if only it is not passed', () => {
      const noRouteVersion = new ListRepository({ routePrefix: newRoutePrefix });
      const { url: noRouteVersionUrl } = noRouteVersion;
      const expectedNoRouteVersionUrl = `${newRoutePrefix}/v1/list`;
      expect(noRouteVersionUrl).toBe(expectedNoRouteVersionUrl);
    });
  });

  describe('methods behavior', () => {
    const listRepository = new ListRepository();
    it('should have post method', () => {
      const { post } = listRepository;
      expect(post).toBeTruthy();
    });

    it('should have get method', () => {
      const { get } = listRepository;
      expect(get).toBeTruthy();
    });

    it('post must return a promise', () => {
      const returned = listRepository.post({ id: '1', text: 'Item 1' });
      expect(returned instanceof Promise).toBeTruthy();
    });

    it('get must return a promise', () => {
      const returned = listRepository.get();
      expect(returned instanceof Promise).toBeTruthy();
    });
  });
});
