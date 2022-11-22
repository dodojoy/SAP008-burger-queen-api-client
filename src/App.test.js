import { createUser } from './contexts/api';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createUser', () => {
  it("create a new user", async () => {
    const createdAt = "2022-11-21T23:54:12.223Z";
    const id = 1;
    const name = 'dodo';
    const email = 'dodo@dodo.com';
    const password = '123456';
    const role = 'atendente';
    const updatedAt = "2022-11-21T23:54:12.223Z";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYWFhQGFhYWEuY29tIiwiaWQiOjcsImlhdCI6MTY2OTA3NDg1MiwiZXhwIjoxNzAwNjMyNDUyfQ';
    const objeto = {
      createdAt: createdAt,
      email: email,
      id: id,
      name: name,
      restaurant: 'Burguer Queen',
      role: role,
      token: token,
      updatedAt: updatedAt,
    };
    jest.spyOn(window, 'fetch').mockResolvedValueOnce(objeto);
    const create = await createUser(name, email, password, role);
  
    expect(create).toEqual(objeto);
  })
});
