import { tokensStub } from '../test/stubs/tokens.stub';
import { logoutResponseStub } from '../test/stubs/logoutResponse.stub';

export const UserService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue(tokensStub),
  login: jest.fn().mockResolvedValue(tokensStub),
  logout: jest.fn().mockResolvedValue(logoutResponseStub),
  refresh: jest.fn().mockResolvedValue(tokensStub),
});
