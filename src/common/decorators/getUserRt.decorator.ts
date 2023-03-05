import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserRt = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.refreshToken;
  },
);
