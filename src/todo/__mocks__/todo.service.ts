import { deletedResponseStub, todoStub } from '../test/stubs';

export const TodoService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(todoStub),
  findById: jest.fn().mockResolvedValue(todoStub),
  findAll: jest.fn().mockResolvedValue([todoStub]),
  update: jest.fn().mockResolvedValue(todoStub),
  delete: jest.fn().mockResolvedValue(deletedResponseStub),
});
