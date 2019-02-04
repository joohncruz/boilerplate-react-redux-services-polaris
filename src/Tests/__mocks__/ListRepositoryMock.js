/* eslint-disable no-unused-vars */
export const result = [
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

export const resultAdd = {
  id: 1,
  text: 'TESTE 1',
};

export const error = 'error on request';

const success = {
  add: () => Promise.resolve({ data: resultAdd }),
  get: () => Promise.resolve({ data: result }),
};

const failed = {
  add: () => Promise.reject(error),
  get: () => Promise.reject(error),
};

export const ListRepositoryMock = {
  success,
  failed,
};
