import { deletedResponseStub, groupStub } from '../test/stubs';

export const GroupService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(groupStub),
  findById: jest.fn().mockResolvedValue(groupStub),
  findAll: jest.fn().mockResolvedValue([groupStub]),
  update: jest.fn().mockResolvedValue(groupStub),
  delete: jest.fn().mockResolvedValue(deletedResponseStub),
});
