class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async authenticate({ email, password }) {
    try {
      const { response: { data } } = await this.authRepository.post({ email, password })
      return Promise.resolve(data)
    } catch (error) {
      // TODO: Inserir um log de error.
      return Promise.reject(error)
    }

  }

};

export default AuthService;