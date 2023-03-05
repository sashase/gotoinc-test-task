import { Test } from '@nestjs/testing';
import { AuthDto } from '../dto/auth.dto';
import { LogoutResponse } from '../types/logoutResponse.type';
import { Tokens } from '../types/token.type';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { logoutResponseStub } from './stubs/logoutResponse.stub';
import { tokensStub } from './stubs/tokens.stub';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('signUp, login', () => {
    describe('when signUp or login is called', () => {
      const dto: AuthDto = { username: 'JohnDoe', password: 'qwerty123' };
      let signUpTokens: Tokens;
      let loginTokens: Tokens;

      beforeEach(async () => {
        signUpTokens = await userController.signUp(dto);
        loginTokens = await userController.login(dto);
      });

      test('then it should call userService', () => {
        expect(userService.signUp).toBeCalledWith(dto);
        expect(userService.login).toBeCalledWith(dto);
      });

      test('then it should return tokens', () => {
        expect(signUpTokens).toEqual(tokensStub);
        expect(loginTokens).toEqual(tokensStub);
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      const id = 1;
      let response: LogoutResponse;

      beforeEach(async () => {
        response = await userController.logout(id);
      });

      test('then it should call userService', () => {
        expect(userService.logout).toBeCalledWith(id);
      });

      test('then it should return logout response', () => {
        expect(response).toEqual(logoutResponseStub);
      });
    });
  });

  describe('refresh', () => {
    describe('when refresh is called', () => {
      const userId = 1;
      const rt = tokensStub().refresh_token;
      let tokens: Tokens;

      beforeEach(async () => {
        tokens = await userController.refresh(userId, rt);
      });

      test('then it should call userService', () => {
        expect(userService.refresh).toBeCalledWith(userId, rt);
      });

      test('then it should return tokens', () => {
        expect(tokens).toEqual(tokensStub);
      });
    });
  });
});
