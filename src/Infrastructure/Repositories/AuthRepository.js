// import axios from 'axios';

import { API_URL } from 'Helpers/ApiHelper';

class AuthRepository {
  constructor({ routePrefix = API_URL, routeVersion = 'v1' } = {}) {
    this.url = `${routePrefix}${routeVersion}/auth/authenticate`;
  }

  post({ email, password }) {
    // return axios.post(this.url, {email, password}, {
    //   // TODO: Verificar se vale a pena colocar Content-Type como default no Interceptor.
    //   headers: { 'Content-Type': 'application/json' },
    // });    
    const response = {
      data: {
        "id": 1,
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm9zw6kgUmVuYXRvIiwiaWQiOiIxIiwibmJmIjoxNTQxNzEwNTk1LCJleHAiOjE1NDE3MTIzOTUsImlzcyI6IlZMSUNvbmVjdGEuQ29yZSIsImF1ZCI6IlZMSUNvbmVjdGEuQ29yZSJ9.RVptQRuRCb8UoKUKF2oUIRWsU5TUzV9J4seJh_dLQYE",
        "tokenType": "bearer",
        "expiresIn": 1800
      }
    }

    return new Promise(
      function (resolve, reject) {
        window.setTimeout(
          function () {
            resolve({ response })
          }, Math.random() * 2000 + 1000);
      });
  }

};

export default AuthRepository;