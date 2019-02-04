import ListRepository from 'Infrastructure/Repositories/ListRepository';

class ListService {
  constructor(listRepository = new ListRepository()) {
    this.listRepository = listRepository;
  }

  async add({ id, text }) {
    try {
      const { data } = await this.listRepository.add({ id, text });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get() {
    try {
      const { data } = await this.listRepository.get();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ListService;
