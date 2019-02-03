class ListService {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async add({ id, text }) {
    try {
      const {
        response: { data },
      } = await this.listRepository.add({ id, text });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get() {
    try {
      const {
        response: { data },
      } = await this.listRepository.get();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ListService;
