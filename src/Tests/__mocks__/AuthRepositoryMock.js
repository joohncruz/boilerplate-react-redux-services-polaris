/* eslint-disable no-unused-vars */
export const result = {
  id: 1,
  success: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  tokenType: 'bearer',
  expiresIn: 1800,
};

export const error = 'error on request';

const success = {
  post: () => Promise.resolve({ data: result }),
};

const failed = {
  post: () => Promise.reject(error),
};

export const AuthRepositoryMock = {
  success,
  failed,
};
