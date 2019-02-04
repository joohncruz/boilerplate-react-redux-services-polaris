import { API_URL } from 'Common/Helpers/ApiHelper';

class AuthRepository {
  constructor({ routePrefix = API_URL, routeVersion = 'v1' } = {}) {
    this.url = `${routePrefix}/${routeVersion}/auth/authenticate`;
  }

  post({ email, password }) {
    console.log('post', { email, password, url: this.url });
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const data = {
          id: 1,
          success: true,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          tokenType: 'bearer',
          expiresIn: 1800,
        };

        resolve({ data });
      }, Math.random() * 2000 + 1000);
    });
  }
}

export default AuthRepository;
