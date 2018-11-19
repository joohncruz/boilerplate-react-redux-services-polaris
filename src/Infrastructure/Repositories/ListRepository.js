// import axios from 'axios';

import { API_URL } from 'Helpers/ApiHelper';

class ListRepository {
  constructor({ routePrefix = API_URL, routeVersion = 'v1' } = {}) {
    this.url = `${routePrefix}${routeVersion}/list`;
  }

  post({ id, text }) {
    const response = {
      data: {
        id,
        text
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

  get() {
    const response = {
      data: [
        {
          "id": 1,
          "text": "TESTE 1"
        },
        {
          "id": 2,
          "text": "TESTE 2"
        },
        {
          "id": 3,
          "text": "TESTE 3"
        },
        {
          "id": 4,
          "text": "TESTE 4"
        }
      ]
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

export default ListRepository;