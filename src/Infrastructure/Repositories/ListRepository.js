import { API_URL } from 'Common/Helpers/ApiHelper';

class ListRepository {
  constructor({ routePrefix = API_URL, routeVersion = 'v1' } = {}) {
    this.url = `${routePrefix}/${routeVersion}/list`;
  }

  post({ id, text }) {
    console.log('TRACE ListRepository: POST', { url: this.url, id, text });
    const response = {
      data: {
        id,
        text,
      },
    };

    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({ response });
      }, Math.random() * 2000 + 1000);
    });
  }

  get() {
    console.log('TRACE ListRepository: GET', { url: this.url });

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const data = [
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
        ];

        resolve({ data });
      }, Math.random() * 2000 + 1000);
    });
  }
}

export default ListRepository;
