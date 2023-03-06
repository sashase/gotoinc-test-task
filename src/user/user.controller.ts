import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiHeader,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GetUserId, GetUserRt, Public } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthDto } from './dto/auth.dto';
import {
  Auth,
  BadRequest,
  CredentialsIncorrect,
  SuccessfullyLoggedOut,
  Tokens,
  Unauthorized,
  UserAlreadyExists,
} from './schemas';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiBody({
    type: Auth,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Your access and refresh tokens',
    type: Tokens,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Empty body',
    type: BadRequest,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'User with this username already exists',
    type: UserAlreadyExists,
  })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: AuthDto) {
    return this.userService.signUp(dto);
  }

  @ApiOperation({ summary: 'User authentication' })
  @ApiBody({
    type: Auth,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Your access and refresh tokens',
    type: Tokens,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Empty Request',
    type: BadRequest,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Credentials incorrect',
    type: CredentialsIncorrect,
  })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthDto) {
    return this.userService.login(dto);
  }

  @ApiOperation({ summary: 'User logout' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Your bearer access token',
  })
  @ApiBearerAuth('Authorization')
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @ApiOkResponse({
    description: 'Successfully logged out',
    type: SuccessfullyLoggedOut,
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUserId() userId: number) {
    return this.userService.logout(userId);
  }

  @ApiOperation({ summary: 'Tokens refresh' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Your bearer refresh token',
  })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    status: 200,
    description: 'Your access and refresh tokens',
    type: Tokens,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@GetUserId() userId: number, @GetUserRt() rt: string) {
    return this.userService.refresh(userId, rt);
  }
}
